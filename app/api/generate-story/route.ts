import { NextResponse } from 'next/server';
import { StoryBuilderState } from '@/lib/story-builder-types';
import { StoryData, StoryNode } from '@/types/story';
import { callClaudeJSON } from '@/lib/claude-client';
import { StoryDataSchema, StoryDataFromSchema } from '@/lib/story-schema';
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
    try {
      if (process.env.GOOGLE_API_KEY) {
        console.log('Generating image with Gemini 2.5 Flash Image...');

        const imagePrompt = `Create a 3D isometric cover image for a children's story titled "${generatedStory.title}". 
        Description: ${generatedStory.description}. 
        Style: Vibrant colors, digital art, video game asset style, clean background, high quality, 4k, detailed texture, soft lighting. 
        No text in the image.`;

        // Use Gemini 2.5 Flash Image model
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent`, {
          method: 'POST',
          headers: {
            'x-goog-api-key': process.env.GOOGLE_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: imagePrompt }]
            }]
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Gemini Image API failed: ${response.status} ${errorText}`);
        }

        const data = await response.json();

        // Extract base64 image from response
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
          const imagePart = data.candidates[0].content.parts.find((part: any) => part.inlineData);
          if (imagePart && imagePart.inlineData && imagePart.inlineData.data) {
            const base64Image = imagePart.inlineData.data;
            const mimeType = imagePart.inlineData.mimeType || 'image/png';
            imageUrl = `data:${mimeType};base64,${base64Image}`;
            console.log('Image generated successfully using Gemini 2.5 Flash Image!');
          } else {
            console.warn('Unexpected Gemini response structure:', JSON.stringify(data).substring(0, 200));
            throw new Error('No image data in Gemini response');
          }
        } else {
          console.warn('Unexpected Gemini response structure:', JSON.stringify(data).substring(0, 200));
          throw new Error('Invalid response structure from Gemini API');
        }

      } else {
        console.log('GOOGLE_API_KEY not found, skipping image generation');
        imageUrl = `https://picsum.photos/seed/${encodeURIComponent(generatedStory.title)}/600/800`;
        console.log('Image generated using fallback (Picsum).');
      }
    } catch (imageError: any) {
      console.log('Google AI image generation failed, using fallback');
      console.error('Details:', imageError.message);
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
