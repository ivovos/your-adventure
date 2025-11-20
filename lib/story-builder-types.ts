export interface BuilderOption {
    id: string;
    label: string;
    image: string; // URL or Emoji
    promptFragment: string; // Description for the AI
}

export interface StoryBuilderState {
    character: BuilderOption;
    quest: BuilderOption;
    world: BuilderOption;
}

export const CHARACTERS: BuilderOption[] = [
    {
        id: 'robot',
        label: 'Rusty the Robot',
        image: '🤖',
        promptFragment: 'a rusty but brave robot named Rusty who loves logic puzzles',
    },
    {
        id: 'wizard',
        label: 'Willow the Wizard',
        image: '🧙‍♀️',
        promptFragment: 'a young wizard named Willow who is learning to control her magic',
    },
    {
        id: 'detective',
        label: 'Drake the Detective',
        image: '🕵️‍♂️',
        promptFragment: 'a sharp-witted detective named Drake who notices every detail',
    },
    {
        id: 'knight',
        label: 'Sir Clanks-a-Lot',
        image: '🛡️',
        promptFragment: 'a clumsy but good-hearted knight named Sir Clanks-a-Lot',
    },
];

export const QUESTS: BuilderOption[] = [
    {
        id: 'treasure',
        label: 'Find the Lost Treasure',
        image: '💎',
        promptFragment: 'a quest to find the legendary Lost Treasure of Knowledge',
    },
    {
        id: 'rescue',
        label: 'Rescue the Prince(ss)',
        image: '👑',
        promptFragment: 'a mission to rescue the royal heir from a confusing labyrinth',
    },
    {
        id: 'mystery',
        label: 'Solve the Ghostly Mystery',
        image: '👻',
        promptFragment: 'an investigation into why the town library is haunted by noisy ghosts',
    },
    {
        id: 'escape',
        label: 'Escape the Glitch',
        image: '👾',
        promptFragment: 'a desperate attempt to escape a video game that is falling apart',
    },
];

export const WORLDS: BuilderOption[] = [
    {
        id: 'cyber',
        label: 'Cyber City',
        image: '🏙️',
        promptFragment: 'a futuristic city made of neon lights and computer code',
    },
    {
        id: 'forest',
        label: 'Enchanted Forest',
        image: '🌲',
        promptFragment: 'a magical forest where trees whisper secrets and animals talk',
    },
    {
        id: 'space',
        label: 'Space Station',
        image: '🚀',
        promptFragment: 'a high-tech space station orbiting a purple planet',
    },
    {
        id: 'underwater',
        label: 'Deep Sea Kingdom',
        image: '🌊',
        promptFragment: 'an underwater kingdom filled with glowing coral and friendly fish',
    },
];
