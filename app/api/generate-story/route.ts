import { NextResponse } from 'next/server';
import { StoryBuilderState } from '@/lib/story-builder-types';
import { StoryData, StoryNode } from '@/types/story';
import { callClaudeJSON } from '@/lib/claude-client';
import { StoryDataSchema, StoryDataFromSchema } from '@/lib/story-schema';
import { GoogleGenAI } from '@google/genai';
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

    // Call Claude API with structured outputs
    console.log('Calling Claude API with structured outputs...');
    const startTime = Date.now();

    // We use StoryDataFromSchema because the schema returns nodes as an array
    // (Claude Structured Outputs doesn't support dynamic keys/records)
    const generatedData = await callClaudeJSON<StoryDataFromSchema>({
      systemPrompt: STORY_GENERATION_SYSTEM_PROMPT,
      userPrompt: userPrompt,
      maxTokens: 4000,
      temperature: 1.0,
      schema: StoryDataSchema, // Use Zod schema for guaranteed valid JSON
    });

    // Transform the array of nodes back into a Record<string, StoryNode>
    // to match the application's expected StoryData structure
    const nodesRecord: Record<string, StoryNode> = {};
    generatedData.nodes.forEach((node) => {
      nodesRecord[node.id] = node as unknown as StoryNode;
    });

    const generatedStory: StoryData = {
      title: generatedData.title,
      description: generatedData.description,
      startNodeId: generatedData.startNodeId,
      nodes: nodesRecord,
    };

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

    // Generate Image with Gemini
    let imageUrl = null;
    let imageGenerationError = null;
    try {
      if (process.env.GOOGLE_API_KEY) {
        console.log('Generating image with Imagen 4.0...');

        const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

        const imagePrompt = `Create a 3D isometric cover image for a children's story. 
        Description: ${generatedStory.description}. 
        Style: Vibrant colors, digital art, video game asset style, clean background, high quality, 4k, detailed texture, soft lighting. 
        IMPORTANT: Do NOT include any text, letters, or the title "${generatedStory.title}" in the image. The image should be purely visual.`;

        try {
          const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: imagePrompt,
            config: {
              numberOfImages: 1,
            },
          });

          if (response.generatedImages && response.generatedImages.length > 0) {
            const generatedImage = response.generatedImages[0];
            if (generatedImage.image && generatedImage.image.imageBytes) {
              const imgBytes = generatedImage.image.imageBytes;
              // The SDK returns base64 bytes directly in imageBytes
              imageUrl = `data:image/png;base64,${imgBytes}`;
              console.log('Image generated successfully using Imagen 4.0!');
            } else {
              throw new Error('No image bytes in response');
            }
          } else {
            throw new Error('No images generated');
          }
        } catch (innerError: any) {
          console.error('Google GenAI SDK Error:', JSON.stringify(innerError, Object.getOwnPropertyNames(innerError), 2));
          throw innerError;
        }

      } else {
        console.log('GOOGLE_API_KEY not found, skipping image generation');
        imageUrl = `https://picsum.photos/seed/${encodeURIComponent(generatedStory.title)}/600/800`;
        console.log('Image generated using fallback (Picsum).');
      }
    } catch (imageError: any) {
      console.log('Google AI image generation failed, using fallback');
      console.error('Full Error Details:', imageError);
      imageGenerationError = imageError.message || 'Unknown error';

      // Fallback to Picsum
      imageUrl = `https://picsum.photos/seed/${encodeURIComponent(generatedStory.title)}/600/800`;
      console.log('Image generated using fallback (Picsum).');
    }

    // Return the generated story
    return NextResponse.json({
      story: generatedStory,
      imageUrl: imageUrl,
      metadata: {
        vocabularyCount: vocabularyWords.length,
        nodeCount: Object.keys(generatedStory.nodes).length,
        generationTime: elapsedTime,
        imageGenerationError: imageGenerationError,
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
