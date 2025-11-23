import Anthropic from '@anthropic-ai/sdk';

// Initialize Claude API client
// This is a singleton instance used across the app
export const claude = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Model configuration
export const CLAUDE_CONFIG = {
  model: process.env.CLAUDE_MODEL || 'claude-sonnet-4-5', // Default to Sonnet 4.5
  maxTokens: 4000, // Enough for a full story
  temperature: 1.0, // Creative but not too random
} as const;

// Type for Claude message response
export interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Helper function to call Claude API with error handling
export async function callClaude(params: {
  systemPrompt: string;
  userPrompt: string;
  maxTokens?: number;
  temperature?: number;
}): Promise<string> {
  const {
    systemPrompt,
    userPrompt,
    maxTokens = CLAUDE_CONFIG.maxTokens,
    temperature = CLAUDE_CONFIG.temperature,
  } = params;

  try {
    console.log(`Calling Claude API with model: ${CLAUDE_CONFIG.model}`);
    const message = await claude.messages.create({
      model: CLAUDE_CONFIG.model,
      max_tokens: maxTokens,
      temperature,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    // Extract text content from response
    const content = message.content[0];
    if (content.type === 'text') {
      return content.text;
    }

    throw new Error('Unexpected response format from Claude API');
  } catch (error) {
    console.error('Claude API Error:', error);
    throw error;
  }
}

// Helper function with structured JSON output
export async function callClaudeJSON<T>(params: {
  systemPrompt: string;
  userPrompt: string;
  maxTokens?: number;
  temperature?: number;
}): Promise<T> {
  const response = await callClaude(params);

  // Try multiple extraction strategies
  let jsonString = response;

  // Strategy 1: Extract from ```json code blocks
  let jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
  if (jsonMatch) {
    jsonString = jsonMatch[1];
  } else {
    // Strategy 2: Extract from any ``` code blocks
    jsonMatch = response.match(/```\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      jsonString = jsonMatch[1];
    } else {
      // Strategy 3: Try to find JSON object in the response
      const objectMatch = response.match(/\{[\s\S]*\}/);
      if (objectMatch) {
        jsonString = objectMatch[0];
      }
    }
  }

  // Sanitize JSON string to fix common issues
  jsonString = sanitizeJSONString(jsonString);

  try {
    const parsed = JSON.parse(jsonString.trim());
    return parsed;
  } catch (error) {
    console.error('Failed to parse JSON from Claude response');
    console.error('Response length:', response.length);
    console.error('First 500 chars:', response.substring(0, 500));
    console.error('Last 500 chars:', response.substring(Math.max(0, response.length - 500)));
    console.error('Attempted JSON string length:', jsonString.length);
    console.error('Parse error:', error);

    // Try to find the exact position of the error
    if (error instanceof SyntaxError && error.message.includes('position')) {
      const match = error.message.match(/position (\d+)/);
      if (match) {
        const pos = parseInt(match[1]);
        const start = Math.max(0, pos - 100);
        const end = Math.min(jsonString.length, pos + 100);
        console.error('Context around error position:', jsonString.substring(start, end));
        console.error('Error at character:', jsonString[pos]);
      }
    }

    throw new Error(`Claude returned invalid JSON: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Sanitize JSON string to fix common formatting issues
function sanitizeJSONString(jsonString: string): string {
  // This won't fix all issues, but helps with common problems
  // Note: This is a best-effort approach and may not work for all cases

  // We'll try a more aggressive approach: fix strings with unescaped newlines
  // This is tricky without a full parser, so we'll be conservative

  // Remove control characters (0-31) except newlines, tabs, etc.
  // This regex matches control characters that are NOT \n, \r, \t
  // eslint-disable-next-line no-control-regex
  jsonString = jsonString.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // Fix unescaped newlines in strings (risky but helpful for LLMs)
  // This is a simple heuristic: if we see a newline that isn't preceded by a comma, brace, or bracket,
  // and isn't followed by a quote+colon, it might be inside a string.
  // However, a safer bet is just to rely on the prompt.

  return jsonString;
}

// Cost tracking (optional but useful)
export function estimateTokenCost(inputTokens: number, outputTokens: number): number {
  // Sonnet 3.5 pricing as of 2024
  const INPUT_PRICE_PER_1K = 0.003;
  const OUTPUT_PRICE_PER_1K = 0.015;

  const inputCost = (inputTokens / 1000) * INPUT_PRICE_PER_1K;
  const outputCost = (outputTokens / 1000) * OUTPUT_PRICE_PER_1K;

  return inputCost + outputCost;
}
