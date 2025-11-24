import { z } from 'zod';

/**
 * Zod schema for StoryData - used with Claude Structured Outputs
 * Guarantees valid JSON generation without parse errors
 */

export const EducationalChallengeSchema = z.object({
    subject: z.enum(['verbal-reasoning', 'spelling']),
    question: z.string(),
    options: z.array(z.string()).describe('Exactly 4 options'), // Claude doesn't support .length(4) yet
    correctAnswer: z.string(),
    hint: z.string().optional(),
    explanation: z.string().optional(),
}).strict();

export const ChoiceSchema = z.object({
    id: z.string(),
    text: z.string(),
    nextNodeId: z.string(),
    educationalChallenge: EducationalChallengeSchema.optional(),
    requiresItem: z.string().optional(),
}).strict();

export const StoryNodeSchema = z.object({
    id: z.string(),
    title: z.string().optional(),
    content: z.string(),
    choices: z.array(ChoiceSchema).optional(),
    itemsGained: z.array(z.string()).optional(),
    isEnding: z.boolean().optional(),
}).strict();

export const StoryDataSchema = z.object({
    title: z.string().describe('Creative, exciting story title'),
    description: z.string().describe('1-2 sentence story summary'),
    startNodeId: z.string().describe('ID of the first node (usually "start")'),
    // Claude Structured Outputs doesn't support z.record (additionalProperties), so we use an array
    nodes: z.array(StoryNodeSchema).describe('List of all story nodes'),
}).strict();

// Export type for TypeScript inference
export type StoryDataFromSchema = z.infer<typeof StoryDataSchema>;
