import { StoryBuilderState } from './story-builder-types';

export const VOCABULARY_LIST = [
    { word: 'NECESSARY', type: 'Spelling', note: "One C, two S's" },
    { word: 'SEPARATE', type: 'Spelling', note: 'A in the middle' },
    { word: 'BELIEVE', type: 'Spelling', note: 'I before E' },
    { word: 'DEFINITELY', type: 'Spelling', note: 'DEFINITE + LY' },
    { word: 'OCCURRED', type: 'Spelling', note: 'Double R' },
    { word: 'DISAPPEAR', type: 'Spelling', note: "One S, two P's" },
    { word: 'CONCEALS', type: 'Verbal', note: 'Hides' },
    { word: 'PERMANENT', type: 'Verbal', note: 'Lasting forever' },
    { word: 'ANCIENT', type: 'Verbal', note: 'Very old' },
    { word: 'OBTAIN', type: 'Verbal', note: 'Get or acquire' },
    { word: 'SUFFICIENT', type: 'Verbal', note: 'Enough' },
    { word: 'SUSPICIOUS', type: 'Verbal', note: 'Questionable' },
    { word: 'EVIDENCE', type: 'Verbal', note: 'Proof' },
];

export const SYSTEM_PROMPT = `
You are an expert storyteller and educational content creator for 11+ exam preparation.
Your task is to create an interactive "Choose Your Own Adventure" style story.
`;

export function generateMasterPrompt(state: StoryBuilderState): string {
    const vocabString = VOCABULARY_LIST.map(
        (v) => `- ${v.word} (${v.type}: ${v.note})`
    ).join('\n');

    return `
**User Selections:**
- Character: ${state.character.promptFragment}
- Quest: ${state.quest.promptFragment}
- World: ${state.world.promptFragment}

**Vocabulary List:**
${vocabString}

**Requirements:**
1.  **Structure**: Create a branching story with at least 5-7 nodes.
    -   Start Node
    -   Branching paths (Choices)
    -   At least 2 different endings (Success/Failure or Good/Best).
2.  **Vocabulary**: Integrate at least 5 words from the VOCABULARY_LIST naturally into the story text.
3.  **Educational Challenges**: Create 3-4 multiple-choice quizzes based on the VOCABULARY_LIST.
    -   Quizzes must be relevant to the plot (e.g., to open a door, decode a message).
    -   Include "Spelling" and "Verbal Reasoning" types.
4.  **Tone**: Exciting, engaging for 10-12 year olds, but educational.

**Output Format:**
You must output a valid JSON object matching the 'StoryData' TypeScript interface.
The JSON should include:
-   'title': A creative title for the story.
-   'description': A short description.
-   'startNodeId': The ID of the first node.
-   'nodes': A map of story nodes.

Each node must have:
-   'id': Unique string ID.
-   'title': Node title.
-   'content': At least 2 paragraphs of narrative text.
-   'choices': Array of choices (text, nextNodeId, optional educationalChallenge).

**Educational Challenge Format:**
If a choice has a challenge, include:
-   'subject': 'spelling' or 'verbal-reasoning'
-   'question': The question text.
-   'options': 4 options.
-   'correctAnswer': The correct option.
-   'hint': A helpful hint.
-   'explanation': Why the answer is correct.
`;
}
