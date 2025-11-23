import { NextResponse } from 'next/server';
import { StoryBuilderState } from '@/lib/story-builder-types';
import { StoryData } from '@/types/story';
import { callClaudeJSON } from '@/lib/claude-client';
import { GoogleGenerativeAI } from '@google/generative-ai';
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

    // Generate Image (Nano Banana / Gemini)
    let imageUrl = null;
    try {
      if (process.env.GOOGLE_API_KEY) {
        console.log('Generating image with Gemini 3 Pro Image...');

        // Using the new Gemini 3 Pro Image model (Nano Banana Pro)
        // Note: Model ID might vary based on region/availability, using the preview tag.
        const modelId = "gemini-3.0-pro-image-preview";

        const imagePrompt = `Create a 3D isometric cover image for a story titled "${generatedStory.title}". 
        Description: ${generatedStory.description}. 
        Style: Vibrant colors, digital art, video game asset style, clean background, high quality, 4k, detailed texture, soft lighting. 
        No text in the image.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelId}:predict?key=${process.env.GOOGLE_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            instances: [
              {
                prompt: imagePrompt,
              }
            ],
            parameters: {
              sampleCount: 1,
              aspectRatio: "3:4",
            }
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Gemini Image API failed: ${response.status} ${errorText}`);
        }

        const data = await response.json();

        // Handle response (structure is typically similar to Imagen/Vertex)
        if (data.predictions && data.predictions[0] && data.predictions[0].bytesBase64Encoded) {
          const base64Image = data.predictions[0].bytesBase64Encoded;
          imageUrl = `data:image/png;base64,${base64Image}`;
          console.log('Image generated successfully using Gemini 3 Pro Image.');
        } else if (data.predictions && data.predictions[0] && data.predictions[0].mimeType && data.predictions[0].bytesBase64Encoded) {
          imageUrl = `data:${data.predictions[0].mimeType};base64,${data.predictions[0].bytesBase64Encoded}`;
          console.log('Image generated successfully using Gemini 3 Pro Image.');
        } else {
          console.warn('Unexpected Gemini Image response structure:', JSON.stringify(data).substring(0, 200));
          throw new Error('Invalid response structure from Gemini Image API');
        }

      } else {
        console.log('GOOGLE_API_KEY not found, skipping image generation');
        imageUrl = `https://picsum.photos/seed/${encodeURIComponent(generatedStory.title)}/600/800`;
        console.log('Image generated using fallback (Picsum).');
      }
    } catch (imageError: any) {
      console.error('Failed to generate image:', imageError.message);
      // Fallback
      imageUrl = `https://picsum.photos/seed/${encodeURIComponent(generatedStory.title)}/600/800`;
      console.log('Image generated using fallback (Picsum) due to error.');
    }

    // Return the generated story
    return NextResponse.json({
      story: generatedStory,
      imageUrl: imageUrl,
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
