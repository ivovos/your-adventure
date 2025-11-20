import { NextResponse } from 'next/server';
import { StoryBuilderState } from '@/lib/story-builder-types';
import { StoryData, StoryNode } from '@/types/story';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const selections = body as StoryBuilderState;

        if (!selections.character || !selections.quest || !selections.world) {
            return NextResponse.json(
                { error: 'Missing required selections' },
                { status: 400 }
            );
        }

        // Mock Generation Logic
        // In a real app, this would call an AI model using the prompt from generateMasterPrompt

        const storyId = `story-${Date.now()}`;
        const title = `The Adventure of ${selections.character.label}`;

        const mockStory: StoryData = {
            title: title,
            description: `A thrilling quest in ${selections.world.label} to ${selections.quest.label.toLowerCase()}.`,
            startNodeId: 'start',
            nodes: {
                'start': {
                    id: 'start',
                    title: 'The Beginning',
                    content: `It was a bright morning in ${selections.world.label}. ${selections.character.label} stood ready for adventure. The mission was clear: ${selections.quest.label}. "I must be brave," thought ${selections.character.label}.`,
                    choices: [
                        {
                            id: 'c1',
                            text: 'Start the journey',
                            nextNodeId: 'node-2'
                        }
                    ]
                },
                'node-2': {
                    id: 'node-2',
                    title: 'The Challenge',
                    content: `As ${selections.character.label} moved forward, a strange inscription appeared on a wall. It seemed to be a riddle blocking the path. To proceed, one must prove their knowledge.`,
                    choices: [
                        {
                            id: 'c2',
                            text: 'Examine the inscription',
                            nextNodeId: 'node-3',
                            educationalChallenge: {
                                subject: 'spelling',
                                question: 'Which word is spelled correctly?',
                                options: ['Necessary', 'Neccessary', 'Necesary', 'Necessery'],
                                correctAnswer: 'Necessary',
                                hint: 'One C, two S\'s.',
                                explanation: 'Necessary is derived from the Latin necessarius.'
                            }
                        }
                    ]
                },
                'node-3': {
                    id: 'node-3',
                    title: 'Victory',
                    content: `Correct! The wall slid open, revealing the path to the ${selections.quest.label}. ${selections.character.label} had succeeded!`,
                    isEnding: true,
                    choices: []
                }
            }
        };

        return NextResponse.json({ story: mockStory });

    } catch (error) {
        console.error('Error generating story:', error);
        return NextResponse.json(
            { error: 'Failed to generate story' },
            { status: 500 }
        );
    }
}
