import Anthropic from '@anthropic-ai/sdk';

// Initialize Claude API client
// This is a singleton instance used across the app
export const claude = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Model configuration
export const CLAUDE_CONFIG = {
  model: 'claude-3-5-sonnet-20241022', // Latest Sonnet model
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

  // Extract JSON from markdown code blocks if present
  const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/) ||
                    response.match(/```\s*([\s\S]*?)\s*```/);

  const jsonString = jsonMatch ? jsonMatch[1] : response;

  try {
    return JSON.parse(jsonString.trim());
  } catch (error) {
    console.error('Failed to parse JSON from Claude response:', jsonString);
    throw new Error('Claude returned invalid JSON');
  }
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
