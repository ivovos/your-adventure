import { StoryBuilderState } from './story-builder-types';
import { VocabularyWord, selectVocabularyForStory, THEME_TO_CONTEXTS } from './vocabulary-database';

/**
 * Advanced Prompt Engineering System for Claude-powered Story Generation
 * Generates engaging educational stories for 9-year-olds preparing for Kent 11+ exams
 */

// System prompt for Claude - sets the context and quality expectations
export const STORY_GENERATION_SYSTEM_PROMPT = `You are an expert children's storyteller and educational content creator specializing in Kent 11+ exam preparation.

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

// Few-shot example of high-quality story structure
export const FEW_SHOT_EXAMPLE = `
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

// Generate the complete prompt for Claude
export function generateStoryPrompt(
  state: StoryBuilderState,
  vocabularyWords: VocabularyWord[]
): string {
  // Organize vocabulary by type for clear presentation
  const spellingWords = vocabularyWords.filter(w => w.type === 'spelling');
  const verbalWords = vocabularyWords.filter(w => w.type === 'verbal');

  // Create formatted vocabulary list with helpful context
  const spellingList = spellingWords.map(w =>
    `- ${w.word}: ${w.definition}${w.memoryTrick ? ` (Trick: ${w.memoryTrick})` : ''}`
  ).join('\n');

  const verbalList = verbalWords.map(w =>
    `- ${w.word}: ${w.definition} (Synonyms: ${w.synonyms.slice(0, 2).join(', ')})`
  ).join('\n');

  return `Create an exciting educational adventure story based on these selections:

📚 STORY SETUP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Character: ${state.character.promptFragment}
Quest: ${state.quest.promptFragment}
World: ${state.world.promptFragment}

🎯 VOCABULARY TO INTEGRATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SPELLING WORDS (use ${spellingWords.length} of these):
${spellingList}

VERBAL REASONING WORDS (use ${verbalWords.length} of these):
${verbalList}

📖 STORY REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Structure:
- Create 4-6 story nodes (keep it simple and manageable)
- Include 2-3 decision points with choices
- Provide at least 2 different endings:
  * One "good" ending (basic success)
  * One "excellent" ending (achieved through clever choices)

Content Quality:
- Each node should be 1-2 engaging paragraphs (100-200 words)
- Use vivid, age-appropriate language that excites 9-year-olds  
- Include action, dialogue, and descriptive details
- Make the reader feel like the hero of an epic adventure
- IMPORTANT: Use only simple punctuation (periods, commas, exclamation marks)
- AVOID: apostrophes in contractions (use "do not" instead of "don't"), complex quotes

Educational Integration:
- Use ALL provided vocabulary words naturally in the story text
- Create 3-4 quiz challenges (mix of spelling and verbal reasoning)
- Quizzes should feel like game obstacles
- Each quiz must have:
  * Clear question related to the plot
  * Exactly 4 simple text options (no special characters)
  * Helpful hint
  * Educational explanation

${FEW_SHOT_EXAMPLE}

🎮 OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ CRITICAL: Your response must be a valid JSON object wrapped in markdown code blocks.
- Wrap the JSON in \`\`\`json and \`\`\`
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
- Start your response with \`\`\`json
- End your response with \`\`\`
- Use proper JSON escaping for quotes (use \\" inside strings)
- Use \\n for newlines within strings (not actual line breaks)
- Ensure all node IDs referenced in nextNodeId actually exist in the nodes object
- Make sure startNodeId points to a valid node
- Wrap the JSON in markdown code blocks (\`\`\`json ... \`\`\`)

JSON FORMATTING RULES (CRITICAL):
1. All story content must use \\\\n for line breaks. Example:
   "content": "First paragraph.\\\\n\\\\nSecond paragraph."
   
2. Escape ALL quotes inside strings. Examples:
   WRONG: "The wizard said "Hello""
   RIGHT: "The wizard said \\\\"Hello\\\\""
   BETTER: "The wizard said Hello"
   
3. Do not use apostrophes in contractions:
   WRONG: "don't", "can't", "won't"  
   RIGHT: "do not", "cannot", "will not"

4. Keep all text simple - avoid special characters like em-dashes, curly quotes, etc.

5. Every property must end with a comma EXCEPT the last one in an object.

Begin generating the story JSON now!`;
}

// Helper function to select vocabulary based on story theme
export function selectVocabularyForTheme(state: StoryBuilderState): VocabularyWord[] {
  // Determine primary theme from world selection
  const worldId = state.world.id;
  const contexts = THEME_TO_CONTEXTS[worldId] || ['adventure'];

  // Combine all relevant contexts
  const allContexts = contexts.join(' ');

  // Select 10-12 vocabulary words (4 spelling, 6-8 verbal)
  return selectVocabularyForStory(allContexts, 10, 0.4);
}

// Validate generated story structure (for error handling)
export function validateStoryStructure(story: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!story.title) errors.push('Missing title');
  if (!story.description) errors.push('Missing description');
  if (!story.startNodeId) errors.push('Missing startNodeId');
  if (!story.nodes) errors.push('Missing nodes object');

  if (story.nodes) {
    // Check if startNodeId exists
    if (!story.nodes[story.startNodeId]) {
      errors.push(`Start node "${story.startNodeId}" not found in nodes`);
    }

    // Check all nextNodeId references
    Object.entries(story.nodes).forEach(([nodeId, node]: [string, any]) => {
      if (node.choices) {
        node.choices.forEach((choice: any, idx: number) => {
          if (!story.nodes[choice.nextNodeId]) {
            errors.push(`Node "${nodeId}" choice ${idx}: references non - existent node "${choice.nextNodeId}"`);
          }
        });
      }
    });

    // Check for at least one ending
    const hasEnding = Object.values(story.nodes).some((node: any) => node.isEnding);
    if (!hasEnding) {
      errors.push('Story has no ending nodes');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
