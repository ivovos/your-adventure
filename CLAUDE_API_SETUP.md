# Claude API Story Generation Setup

This document explains how to set up and use the Claude API for generating educational adventure stories.

## Features

✨ **AI-Powered Story Generation**
- Stories tailored to 9-year-olds preparing for Kent 11+ exams
- 1-2 paragraph story nodes with engaging narratives
- 6-8 branching story nodes with multiple endings
- Natural vocabulary integration

📚 **Educational Content**
- 200+ word vocabulary database
- Theme-based vocabulary selection
- Spelling and verbal reasoning challenges
- Contextual quizzes that feel like game obstacles

🎯 **Quality Assurance**
- Automatic story structure validation
- Error handling with helpful messages
- Progress indicators during generation
- Metadata tracking (node count, generation time)

## Setup Instructions

### 1. Get Your API Key

1. Visit [https://console.anthropic.com/](https://console.anthropic.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (it starts with `sk-ant-...`)

### 2. Configure Environment Variables

1. Open the `.env.local` file in the project root
2. Replace `your_api_key_here` with your actual API key:

```bash
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxx
```

3. Save the file

**Security Note:** Never commit `.env.local` to git. It's already in `.gitignore`.

### 3. Test the Integration

1. Start the development server:
```bash
npm run dev
```

2. Navigate to http://localhost:3000/create

3. Select a character, quest, and world

4. Click "Generate Story ✨"

5. Wait 10-30 seconds for Claude to generate your story

## How It Works

### Architecture

```
User Selections → Vocabulary Selection → Prompt Generation → Claude API → Story Validation → User
```

### Key Files

- **`lib/vocabulary-database.ts`**: 200+ Kent 11+ words with context metadata
- **`lib/story-prompts.ts`**: Advanced prompt engineering system
- **`lib/claude-client.ts`**: Claude API wrapper with error handling
- **`app/api/generate-story/route.ts`**: Next.js API route

### Vocabulary Selection

The system intelligently selects 10 vocabulary words based on story theme:
- **40% spelling words**: Commonly misspelled words with memory tricks
- **60% verbal reasoning**: Contextually relevant words

Example for "Cyber City" world:
- Spelling: NECESSARY, OCCURRED, DISAPPEAR
- Verbal: NAVIGATE, EXAMINE, COMPLEX, ARTIFICIAL, TRANSFORM

### Story Structure

Generated stories follow this pattern:
1. **Opening Node**: Sets the scene (150-250 words)
2. **Branching Paths**: 2-3 major decision points
3. **Challenge Nodes**: Educational quizzes as game obstacles
4. **Endings**: At least 2 different outcomes

### Cost Estimation

With Claude Sonnet 3.5:
- Input: ~1,500-2,000 tokens (prompt + vocabulary)
- Output: ~2,000-3,000 tokens (full story)
- **Cost per story**: $0.006-$0.009 (less than 1 cent!)
- Very affordable for educational content

## Troubleshooting

### Error: "Story generation not configured"

**Solution**: Add your API key to `.env.local`

### Error: "Invalid API key"

**Solution**: Check that your key is correct and starts with `sk-ant-`

### Error: "Rate limit exceeded"

**Solution**: Wait a minute before generating another story. Free tier has rate limits.

### Story has structural issues

The system validates:
- All node IDs are referenced correctly
- Start node exists
- At least one ending node exists

If validation fails, Claude will regenerate the story.

### Long generation time (>60 seconds)

This is normal for complex stories. Factors:
- API response time varies (usually 10-30s)
- Story complexity (more nodes = more time)
- Network latency

## Customization

### Adjust Vocabulary Count

In `lib/story-prompts.ts`, change the `selectVocabularyForTheme` call:

```typescript
return selectVocabularyForStory(allContexts, 12, 0.5); // 12 words, 50% spelling
```

### Modify Story Length

In `app/api/generate-story/route.ts`, adjust `maxTokens`:

```typescript
maxTokens: 6000, // Longer stories
```

### Change Temperature (Creativity)

In `app/api/generate-story/route.ts`:

```typescript
temperature: 0.8, // Less creative but more consistent
temperature: 1.2, // More creative and varied
```

## Vocabulary Database

The system includes 200+ words organized by:

**Categories:**
- Spelling challenges (doubles, ie/ei, silent letters)
- Actions & movement
- Descriptive words (size, time, appearance)
- Emotions & states
- Thinking & knowledge
- Location & position
- Abstract concepts
- Comparisons & relationships

**Metadata per word:**
- Definition (9-year-old friendly)
- Synonyms
- Difficulty level (1-3)
- Common contexts (for theme matching)
- Memory tricks (for spelling words)
- Example sentences

## Performance Metrics

Typical generation:
- **Selection Time**: <100ms
- **API Call**: 10-30 seconds
- **Validation**: <50ms
- **Total**: ~15-35 seconds

The UI shows progress updates:
1. "Selecting vocabulary words..."
2. "Crafting your unique adventure..."
3. "Adding educational challenges..."
4. "Finalizing your story..."
5. "Success! Starting your adventure..."

## Support

For issues or questions:
- Check the console logs in the browser (F12)
- Review API errors in the terminal running `npm run dev`
- Verify your API key is correctly set

## Future Enhancements

Potential improvements:
- [ ] Streaming responses for faster perceived performance
- [ ] Story editing/refinement
- [ ] Difficulty level selection
- [ ] Custom vocabulary lists
- [ ] Multi-language support
- [ ] Story sharing/export
