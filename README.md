# Your Adventure - The Case of the Missing Words

An educational choose-your-own-adventure app designed to help children prepare for the 11+ exam through interactive storytelling, focusing on Verbal Reasoning and Spelling (Kent Test).

## Features

- **Interactive Storytelling**: Engaging mystery narrative with branching paths based on player choices
- **Educational Content**: Verbal Reasoning and Spelling challenges integrated naturally into the story
- **Dice Roll Mechanics**: Chance-based outcomes that add excitement and unpredictability
- **Progress Saving**: Automatically saves progress in localStorage so players can continue later
- **Beautiful Design**: Minimal, distraction-free reading experience inspired by iA Writer
- **Responsive**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom design tokens
- **Zustand** - Lightweight state management
- **Framer Motion** - Smooth animations and transitions

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
your-adventure/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Landing page with start/continue
│   ├── story/page.tsx      # Main story experience
│   └── globals.css         # Global styles and design tokens
├── components/
│   ├── StoryPage.tsx       # Main story display component
│   ├── ChoiceButtons.tsx   # Interactive choice UI
│   ├── DiceRoller.tsx      # Dice rolling mechanic
│   └── EducationalChallenge.tsx  # Question/answer UI
├── lib/
│   ├── story-data.ts       # Story content and structure
│   ├── store.ts            # Zustand state management
│   └── hooks.ts            # localStorage hooks
└── types/
    └── story.ts            # TypeScript interfaces
```

## Adding New Story Content

To add new story nodes, edit `lib/story-data.ts`:

```typescript
nodes: {
  'your-node-id': {
    id: 'your-node-id',
    title: 'Chapter Title',
    content: 'Story content here...',
    choices: [
      {
        id: 'choice-1',
        text: 'Choice description',
        nextNodeId: 'next-node-id',
        educationalChallenge: {
          subject: 'verbal-reasoning',
          question: 'Your question?',
          options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
          correctAnswer: 'Option 1',
          hint: 'Optional hint',
          explanation: 'Why this is correct'
        }
      }
    ]
  }
}
```

## Design Principles

### Typography
- **Body Text**: Charter/Georgia serif (18-20px) for comfortable reading
- **UI Elements**: System fonts for familiarity and performance
- **Line Height**: 1.7 for optimal readability

### Color Palette
- **Text**: Near-black (#1a1a1a) on off-white (#fefefe)
- **Accent**: Blue (#2563eb) for interactive elements
- **Subtle**: Light gray backgrounds for UI components

### Layout
- **Max Width**: 680px for optimal reading line length
- **Generous Spacing**: Comfortable margins and padding
- **Minimal Chrome**: Focus on content, minimal UI distractions

## Educational Content

The app currently includes challenges focusing on:

1. **Verbal Reasoning**
   - Synonym and antonym identification
   - Word meaning comprehension
   - Contextual vocabulary usage

2. **Spelling** (Kent Test words)
   - NECESSARY
   - SEPARATE
   - Common challenging words

To add more educational content, expand the story nodes in `story-data.ts` with additional `educationalChallenge` objects.

## Future Enhancements

- [ ] Multiple story adventures
- [ ] Parent/tutor dashboard for progress tracking
- [ ] More subject areas (Maths, Non-Verbal Reasoning)
- [ ] Achievement system
- [ ] Printable progress reports
- [ ] Sound effects and background music
- [ ] Multi-player mode

## License

This is a personal educational project.

## Acknowledgments

- Inspired by classic choose-your-own-adventure books
- Design influenced by iA Writer's minimal aesthetic
- Built with educational best practices for 11+ preparation
