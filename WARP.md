# WARP.md
This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Core commands

### Install & run locally
- Install dependencies (Node 18+): `npm install`
- Start dev server (Next.js App Router): `npm run dev`
- Build for production: `npm run build`
- Start production server (after build): `npm start`

### Linting
- Run ESLint via Next.js: `npm run lint`

### Tests (Playwright)
Playwright is configured in `playwright.config.ts` to:
- Use tests in `tests/*.spec.ts`
- Run against `http://localhost:3000`
- Auto-start the dev server with `npm run dev` via the `webServer` block

Common commands (see `tests/README.md` for full details):
- Run all tests (headless): `npm test`
- Open Playwright UI (recommended while developing tests): `npm run test:ui`
- Run tests with a visible browser: `npm run test:headed`
- View the last HTML test report: `npm run test:report`
- Run a single test by name (from `tests/README.md`): `npx playwright test -g "should complete Path 1"`

## High-level architecture

### App routing & pages
The app uses Next.js 14 App Router under `app/`:
- `app/layout.tsx` – Root layout that imports `globals.css`, sets global `<Metadata>`, and mounts the design system provider (`<DesignSystemProvider />`) before rendering all pages.
- `app/page.tsx` (`/`) – Library-style home that:
  - Reads available worlds from `gameData.worlds` in `lib/worlds-data.ts` and renders them as clickable book covers (`WorldBookCard`).
  - Uses the Zustand store (`useStoryStore`) to set `currentWorldId`, reset player progress, and route to `/story` when a world is chosen.
  - Uses `hasSavedProgress`, `loadSavedProgress`, and `clearSavedProgress` from `lib/hooks.ts` to decide whether to show a "Continue" button and to hydrate store state from `localStorage`.
  - Links to the story builder at `/create`.
- `app/story/page.tsx` (`/story`) – Main reading experience:
  - Looks up the active world by `currentWorldId` from either static `gameData.worlds` or `generatedWorlds` in the store.
  - Calls `useSaveProgress()` on each render to auto-persist `PlayerState` to `localStorage`.
  - Drives progression by mutating the store via `addNodeToStack`, `addToInventory`, and `addQuizAnswer`, and passes `nodeStack`, `nodes`, `inventory`, and `quizAnswers` into `<ContinuousStory />`.
  - Renders a sticky header (back to `/`) and a fixed bottom inventory bar.
- `app/create/page.tsx` (`/create`) – Story builder wizard (3 steps: hero → quest → world):
  - Uses selection metadata from `lib/story-builder-types.ts` (`CHARACTERS`, `QUESTS`, `WORLDS`) and `BuilderCard` components for the UI.
  - On "Generate Story" posts the current `StoryBuilderState` to `/api/generate-story`, receives a `StoryData` object, wraps it in a `World` object, calls `addGeneratedWorld` and `setCurrentWorld`, then routes to `/story`.
- `app/design-system/page.tsx` (`/design-system`) – Internal design system storyboard:
  - Left sidebar: `ThemeControls` to tweak colors, typography, and radii in the design system store.
  - Right side: `ComponentPreview` showcasing headings, body text, buttons, choice cards, and color swatches using the current theme tokens.

### Domain model & story data
Core types live in `types/story.ts` and are used consistently across the app:
- `StoryData` – Story-level object (`title`, `description`, `startNodeId`, `nodes`).
- `StoryNode` – Node in the adventure graph (`content`, optional `choices`, optional `diceRoll`, optional `itemsGained`, optional `isEnding`).
- `Choice` – Edge between nodes with optional `EducationalChallenge` and `requiresItem` gating.
- `EducationalChallenge` – Encapsulates verbal reasoning or spelling questions, options, correct answer, optional hint, and explanation.
- `DiceRollConfig` – Config for dice-based branches (d6/d20, target number, success/failure nodes).
- `PlayerState` – Persisted player progress: `currentNodeId`, `inventory`, visited nodes, answered questions, quiz answers, and `lastUpdated`.
- `World` / `GameData` – Metadata for each world (title, description, emoji, cover styling, optional `storyData`) and the overall `gameData` container.

Static story content is defined in `lib/worlds-data.ts`:
- Exports `gameData: GameData` with one or more `World` entries.
- Each `World` embeds a `StoryData` that wires together:
  - Rich narrative `content` strings
  - `choices` with linked nodes
  - `EducationalChallenge` blocks that reuse 11+ vocabulary (e.g. NECESSARY, SEPARATE) and reasoning terms
  - `itemsGained` for inventory and optional `diceRoll` sections

### State management & progression
State is handled with Zustand in `lib/store.ts`:
- `useStoryStore` extends `PlayerState` with:
  - `currentWorldId` – Which world the player is in (static or generated).
  - `nodeStack: string[]` – Ordered list of visited node IDs, used to render the story as a continuous scroll.
  - `generatedWorlds: World[]` – Custom AI-generated (or, currently, mock-generated) worlds created via `/create`.
- Key actions:
  - `setCurrentWorld(worldId)` – Resets progress and sets `currentWorldId`, `currentNodeId`, and `nodeStack` back to the world’s start node.
  - `addNodeToStack(nodeId)` – Moves the player to a new node, appends to `nodeStack`, and tracks visitation.
  - `addToInventory`, `addVisitedNode`, `addAnsweredQuestion`, `addQuizAnswer` – Update slices of `PlayerState` and bump `lastUpdated`.
  - `resetProgress()` – Resets to the initial state.
  - `loadProgress(savedState)` – Hydrates from a `PlayerState` snapshot (optionally including `currentWorldId`, `nodeStack`, and `generatedWorlds`).

Progress persistence is implemented in `lib/hooks.ts`:
- `useSaveProgress()` – React hook that subscribes to the entire `useStoryStore` state and writes a `PlayerState` snapshot to `localStorage` under `your-adventure-progress` whenever key fields change.
- `loadSavedProgress()` / `hasSavedProgress()` / `clearSavedProgress()` – Helpers used primarily on the home page to activate the "Continue" flow and to reset progress when starting a new world.

### Story rendering & educational interactions
The story UI is composed from a set of focused components:
- `ContinuousStory` – Main renderer for `/story`:
  - Derives a linear `storyParts` array from `nodeStack` and the `nodes` map, tagging each piece of content as text, items, quiz, dice, or ending.
  - Maintains a `quizCounter` so quizzes are indexed in order and linked to entries in `quizAnswers`.
  - Auto-scrolls to new content when the stack grows and when new text appears after a completed quiz.
  - Delegates quizzes to `InlineQuiz`, dice to `DiceRoller`, and text paragraphs to `StoryText`.
  - Notifies the page via `onChoiceComplete`, `onDiceResult`, and `onItemsGained` so the store can update `nodeStack`, inventory, and quiz answers.
- `InlineQuiz` – Renders choices inline in the story as a 2-column grid:
  - Handles selection state, gating on `requiresItem`, and animates an expanded full-screen overlay when a choice includes an `EducationalChallenge`.
  - Uses `EducationalChallenge` to run the quiz interaction; on success, it calls `onChoiceComplete(choiceId, nextNodeId)` so `ContinuousStory` can push the next node.
- `EducationalChallenge` – Encapsulates MCQ logic:
  - Tracks selected answer, hints, correctness, and shows a full-screen feedback overlay with explanation.
  - On a correct answer, calls `onCorrect`, which ultimately advances the story.
- `DiceRoller` – Dice-based challenge component:
  - Animates random dice rolls up to a final value, computes success/failure against `targetNumber`, and then calls `onResult(success, nextNodeId)` after a short delay.
- `StoryText` / `VocabWord` – Rich text rendering:
  - `StoryText` tokenizes node content, identifies a curated set of difficult vocabulary words, and wraps them in `VocabWord` components.
  - `VocabWord` displays definitions in a modal-style overlay when clicked, reinforcing 11+ vocabulary.
- `WorldBookCard` – Visual book-cover UI for each `World` on the home page, including locked/PLAY badges.

There are also older, more traditional node-by-node components (`StoryPage`, `StorySegment`) that still follow the `StoryNode` model but are no longer central now that `ContinuousStory` is the primary renderer.

### Story builder & AI prompt scaffolding
Even though `/api/generate-story` currently returns a mock story, the builder pipeline is structured around a future AI integration:
- `lib/story-builder-types.ts` – Defines `BuilderOption` and `StoryBuilderState` and exports curated `CHARACTERS`, `QUESTS`, and `WORLDS`. These supply labels, emojis, and `promptFragment` strings for the prompt.
- `lib/story-prompts.ts` – Contains:
  - `VOCABULARY_LIST` – Spelling and verbal reasoning targets (NECESSARY, SEPARATE, CONCEALS, OBTAIN, etc.).
  - `SYSTEM_PROMPT` – High-level system instructions for an AI storyteller.
  - `generateMasterPrompt(state)` – Builds a rich prompt that describes user selections, lists vocabulary, and specifies that the output must be valid JSON matching the `StoryData` TypeScript interface.
- `app/api/generate-story/route.ts` – Next.js route handler for `/api/generate-story`:
  - Validates required fields in `StoryBuilderState`.
  - Constructs a mock `StoryData` graph that includes at least one `EducationalChallenge` node.
  - Returns `{ story: StoryData }`, which `/create` uses to create a new `World` and push it into `generatedWorlds`.

### Design system & theming
The visual design is centralized in a small design system layer:
- `lib/stores/design-system.ts` – Zustand store (with `persist`) for design tokens:
  - `colors` (primary/secondary text, background, accent, semantic colors).
  - `fonts` (serif, sans, display families tuned for reading and UI).
  - `borderRadius` (XL/2XL/3XL rounding values).
  - Actions `setColors`, `setFonts`, `setBorderRadius`, and `reset` update and reset theme tokens.
- `components/DesignSystemProvider.tsx` – Mounts once in `RootLayout` and syncs the store into CSS custom properties on `document.documentElement` (e.g. `--color-text-primary`, `--font-serif`, `--radius-3xl`). Tailwind utility classes in `globals.css` and `tailwind.config.ts` reference these variables.
- `app/design-system/page.tsx`, `components/design-system/ThemeControls.tsx`, and `components/design-system/ComponentPreview.tsx` – Provide a live playground for adjusting the design system and seeing how changes affect typography, buttons, choice cards, and color swatches.

### Automated testing architecture
Playwright-based tests live in `tests/` and are documented in `tests/README.md`:
- `adventure-paths.spec.ts` – End-to-end paths through major branches of the story, including:
  - Multiple complete paths (different routes through the narrative).
  - Wrong-answer flows, hint usage, inventory changes, and spelling challenges.
- `ui-components.spec.ts` – UI and interaction sanity checks:
  - Home and story pages load correctly, buttons are clickable, educational badges render, dice animations run, and explanations appear.
- `progress-saving.spec.ts` – Persistance behavior:
  - Verifies automatic saving, "Continue" behavior from the home page, inventory persistence across reloads, and reset-on-new-game logic.

Key points from `tests/README.md` that affect how you should modify code:
- When you add new story paths or educational challenges, extend `adventure-paths.spec.ts` with new scenarios that walk those paths end-to-end.
- Prefer running `npm run test:ui` while iterating so you can visually confirm that new story nodes, hints, and inventory behavior match expectations.
- For debugging specific scenarios, run targeted tests with `npx playwright test -g "<test name>"` and inspect screenshots, HTML reports, and traces generated under `test-results/` and `playwright-report/`.
