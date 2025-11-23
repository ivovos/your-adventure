import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
let apiKey = process.env.ANTHROPIC_API_KEY;

if (!apiKey && fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const match = envContent.match(/ANTHROPIC_API_KEY=(.*)/);
    if (match) {
        apiKey = match[1].trim();
    }
}

if (!apiKey) {
    console.error('Error: ANTHROPIC_API_KEY not found in .env.local or environment');
    process.exit(1);
}

const claude = new Anthropic({
    apiKey: apiKey,
});

const MODEL = process.env.CLAUDE_MODEL || 'claude-3-5-haiku-latest';

async function testSimpleGeneration() {
    console.log(`Testing simple generation with model: ${MODEL}...`);
    try {
        const message = await claude.messages.create({
            model: MODEL,
            max_tokens: 100,
            messages: [{ role: 'user', content: 'Say hello!' }],
        });
        console.log('Success! Response:', message.content[0].text);
        return true;
    } catch (error) {
        console.error('Simple generation failed:', error);
        return false;
    }
}



const FEW_SHOT_EXAMPLE = `
EXAMPLE OF HIGH-QUALITY STORY NODE:

{
  "id": "digital-entrance",
  "title": "The Glitching Gateway",
  "content": "You step through the portal and emerge in a world that shouldn't exist—a massive digital realm where reality flickers like a broken screen. Towering blocks of code float in mid-air, constantly shifting between different textures: grass, stone, pure void. A pixelated river flows upward, defying gravity.\\n\\nA holographic guide materializes beside you, but it's clearly corrupted. 'Welcome to the... *bzzt*... Digital Realm,' it glitches. 'The Core has been CORRUPTED. That means it's damaged and filled with errors. You must NAVIGATE through three districts to restore it. Choose wisely—each path will test different skills.'",
  "choices": [
    {
      "id": "choice-tech",
      "text": "🤖 Enter the Tech District (circuits and robots)",
      "nextNodeId": "tech-district",
      "educationalChallenge": {
        "subject": "verbal-reasoning",
        "question": "The Core has been CORRUPTED. What does CORRUPTED mean?",
        "options": ["Fixed", "Damaged or filled with errors", "Improved", "Hidden"],
        "correctAnswer": "Damaged or filled with errors",
        "hint": "Think about what happens when computer files get corrupted.",
        "explanation": "CORRUPTED means damaged or containing errors. In computing, corrupted data is unreliable and broken."
      }
    }
  ]
}

Notice:
- Content is 2 paragraphs, vivid and engaging
- Vocabulary word (CORRUPTED, NAVIGATE) used naturally in context
- Quiz question ties directly to the story
- Challenge feels like part of the adventure, not a test`;

const STORY_GENERATION_SYSTEM_PROMPT = `You are an expert children's storyteller and educational content creator specializing in Kent 11+ exam preparation.

Your mission is to create engaging "Choose Your Own Adventure" stories that:
1. Captivate 9-year-old readers with exciting narratives
2. Seamlessly integrate educational vocabulary in natural contexts
3. Include challenging but fair spelling and verbal reasoning quizzes
4. Feature branching paths that reward curiosity and problem-solving

Writing Guidelines:
- Each story node should be 1-2 engaging paragraphs (150-250 words)
- Use vivid, descriptive language that paints a picture
- Include dialogue and action to keep the pace exciting
- Write at a reading level appropriate for ages 9-11
- Make vocabulary words feel natural, not forced
- Create quiz questions that are plot-relevant, not arbitrary tests

Tone: Adventurous, mysterious, sometimes humorous, always engaging. Think of blending:
- Minecraft's creativity and exploration
- Zelda's puzzle-solving and discovery
- Percy Jackson's humor and relatability

Educational Balance:
- Stories should be fun FIRST, educational second
- Vocabulary emerges from context, not the other way around
- Quizzes feel like game challenges, not school tests
- Every choice matters to the plot`;

const SYSTEM_PROMPT = \`\${STORY_GENERATION_SYSTEM_PROMPT}

\${FEW_SHOT_EXAMPLE}

🎮 OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ CRITICAL: Your response must be a valid JSON object wrapped in markdown code blocks.
- Wrap the JSON in \\\`\\\`\\\`json and \\\`\\\`\\\`
- Do not include any explanatory text outside the code blocks
- Just the raw JSON object inside the code blocks

Return ONLY valid JSON matching this TypeScript interface:

interface StoryData {
  title: string;           // Creative, exciting title
  description: string;     // 1-2 sentence summary
  startNodeId: string;     // ID of first node (usually "start")
  nodes: {
    [nodeId: string]: {
      id: string;
      title?: string;      // Optional node title
      content: string;     // 1-2 paragraphs of narrative
      choices?: Array<{
        id: string;
        text: string;      // What the player sees
        nextNodeId: string;
        educationalChallenge?: {
          subject: "spelling" | "verbal-reasoning";
          question: string;
          options: string[];  // Exactly 4 options
          correctAnswer: string;
          hint?: string;
          explanation?: string;
        };
      }>;
      itemsGained?: string[];  // Optional items for inventory
      isEnding?: boolean;      // True if this is an ending node
    };
  };
}

CRITICAL REQUIREMENTS:
- Start your response with \\\`\\\`\\\`json
- End your response with \\\`\\\`\\\`
- Use proper JSON escaping for quotes (use \\" inside strings)
- Use \\\\n for newlines within strings (not actual line breaks)
- Ensure all node IDs referenced in nextNodeId actually exist in the nodes object
- Make sure startNodeId points to a valid node
- Wrap the JSON in markdown code blocks (\\\`\\\`\\\`json ... \\\`\\\`\\\`)

JSON FORMATTING RULES (CRITICAL):
1. All story content must use \\\\\\\\n for line breaks. Example:
   "content": "First paragraph.\\\\\\\\n\\\\\\\\nSecond paragraph."
   
2. Escape ALL quotes inside strings. Examples:
   WRONG: "The wizard said "Hello""
   RIGHT: "The wizard said \\\\"Hello\\\\""
   BETTER: "The wizard said Hello"
   
3. Do not use apostrophes in contractions:
   WRONG: "don't", "can't", "won't"  
   RIGHT: "do not", "cannot", "will not"

4. Keep all text simple - avoid special characters like em-dashes, curly quotes, etc.

5. Every property must end with a comma EXCEPT the last one in an object.

Begin generating the story JSON now!\`;


const USER_PROMPT = `Create an exciting educational adventure story based on these selections:
Character: A brave knight
Quest: Find the lost sword
World: Medieval Kingdom

Vocabulary:
- brave: courageous
    - sword: a weapon with a long metal blade

Return ONLY valid JSON.`;

async function testComplexGeneration() {
    console.log(`\nTesting complex generation with model: ${ MODEL }...`);
    try {
        const message = await claude.messages.create({
            model: MODEL,
            max_tokens: 4000,
            system: SYSTEM_PROMPT,
            messages: [{ role: 'user', content: USER_PROMPT }],
        });

        const content = message.content[0].type === 'text' ? message.content[0].text : '';
        console.log('Raw response length:', content.length);
        console.log('First 100 chars:', content.substring(0, 100));

        // Try to parse JSON
        let jsonString = content;
        const jsonMatch = content.match(/```json\s * ([\s\S] *?) \s * ```/);
        if (jsonMatch) {
            jsonString = jsonMatch[1];
        }

        try {
            JSON.parse(jsonString);
            console.log('Success! Valid JSON generated.');
            return true;
        } catch (e) {
            console.error('Failed to parse JSON:', e.message);
            console.log('Response was not valid JSON.');
            return false;
        }
    } catch (error) {
        console.error('Complex generation failed:', error);
        return false;
    }
}

async function run() {
    console.log('Starting Haiku verification...');
    const simpleSuccess = await testSimpleGeneration();

    if (!simpleSuccess) {
        console.log('Basic connectivity failed. Checking model name...');
        // Try fallback model
        const fallbackModel = 'claude-3-haiku-20240307';
        console.log(`Retrying with fallback model: ${ fallbackModel }...`);
        try {
            const message = await claude.messages.create({
                model: fallbackModel,
                max_tokens: 100,
                messages: [{ role: 'user', content: 'Say hello!' }],
            });
            console.log('Fallback success! The issue is likely the model ID "claude-3-5-haiku-latest".');
        } catch (error) {
            console.error('Fallback also failed. Check API key and network.', error);
        }
    }

    if (simpleSuccess) {
        await testComplexGeneration();
    }
}

run();
