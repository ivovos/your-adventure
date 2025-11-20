import { NextResponse } from 'next/server';
import { StoryBuilderState } from '@/lib/story-builder-types';
import { StoryData } from '@/types/story';
import { callClaudeJSON } from '@/lib/claude-client';
import {
  STORY_GENERATION_SYSTEM_PROMPT,
  generateStoryPrompt,
  selectVocabularyForTheme,
  validateStoryStructure,
} from '@/lib/story-prompts';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const selections = body as StoryBuilderState;

    // Validate input
    if (!selections.character || !selections.quest || !selections.world) {
      return NextResponse.json(
        { error: 'Missing required selections' },
        { status: 400 }
      );
    }

    // Check for API key
    if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_api_key_here') {
      console.error('ANTHROPIC_API_KEY not configured');
      return NextResponse.json(
        {
          error: 'Story generation not configured. Please add your Anthropic API key to .env.local',
          details: 'Get your API key from https://console.anthropic.com/'
        },
        { status: 503 }
      );
    }

    console.log('Generating story for:', {
      character: selections.character.label,
      quest: selections.quest.label,
      world: selections.world.label,
    });

    // Select vocabulary words based on story theme
    const vocabularyWords = selectVocabularyForTheme(selections);
    console.log(`Selected ${vocabularyWords.length} vocabulary words:`,
      vocabularyWords.map(w => w.word).join(', ')
    );

    // Generate the prompt
    const userPrompt = generateStoryPrompt(selections, vocabularyWords);

    // Call Claude API
    console.log('Calling Claude API...');
    const startTime = Date.now();

    const generatedStory = await callClaudeJSON<StoryData>({
      systemPrompt: STORY_GENERATION_SYSTEM_PROMPT,
      userPrompt: userPrompt,
      maxTokens: 4000,
      temperature: 1.0,
    });

    const elapsedTime = Date.now() - startTime;
    console.log(`Story generated in ${elapsedTime}ms`);

    // Validate the generated story structure
    const validation = validateStoryStructure(generatedStory);
    if (!validation.valid) {
      console.error('Generated story has validation errors:', validation.errors);
      return NextResponse.json(
        {
          error: 'Generated story has structural issues',
          details: validation.errors,
        },
        { status: 500 }
      );
    }

    console.log('Story validated successfully:', {
      title: generatedStory.title,
      nodeCount: Object.keys(generatedStory.nodes).length,
    });

    // Return the generated story
    return NextResponse.json({
      story: generatedStory,
      metadata: {
        vocabularyCount: vocabularyWords.length,
        nodeCount: Object.keys(generatedStory.nodes).length,
        generationTime: elapsedTime,
      },
    });

  } catch (error: any) {
    console.error('Error generating story:', error);

    // Handle specific error types
    if (error.status === 401) {
      return NextResponse.json(
        {
          error: 'Invalid API key',
          details: 'Please check your ANTHROPIC_API_KEY in .env.local',
        },
        { status: 401 }
      );
    }

    if (error.status === 429) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          details: 'Too many requests. Please try again in a moment.',
        },
        { status: 429 }
      );
    }

    // Generic error response
    return NextResponse.json(
      {
        error: 'Failed to generate story',
        details: error.message || 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
