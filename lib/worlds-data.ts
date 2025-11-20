import { GameData, StoryData } from '@/types/story';

// World 1: The Glitched Realm
const glitchedRealmStory: StoryData = {
  title: 'The Glitched Realm',
  description: 'A gamer\'s quest through digital chaos',
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      title: 'The Glitch Begins',
      content: `You're grinding on the rails in your favorite skateboarding game, pulling off a perfect 360 kickflip, when suddenly—*BZZZZT*—your screen flickers. Lines of corrupted code scroll across the display: ERROR, WARNING, SYSTEM FAILURE. Before you can react, a strange pulling sensation grabs you. The room spins, your vision blurs, and then—whoosh!—you're sucked INTO the game itself.

You land hard on a pixelated street. Everything feels wrong. Around you, the world is glitching: medieval castle towers flicker and transform into modern skate park ramps. Stone walls become glass buildings, then back to stone. NPCs phase in and out of existence like ghosts. Above you, the sky shifts from bright day to star-filled night to sunset orange in seconds.

A holographic figure materializes—the game's tutorial character, but twisted and broken. "Warning: Reality.exe has encountered a critical error," it announces before glitching out. "Find the... *bzzt*... Core Blocks... restore system... *bzzt*... before permanent corruption spreads!" The figure vanishes.

Three paths shimmer before you, each leading to a different corrupted zone:`,
      choices: [
        {
          id: 'choice-craftmine',
          text: '🧱 Head to the Craft-Mine District (blocky terrain ahead)',
          nextNodeId: 'craftmine-entrance',
          educationalChallenge: {
            subject: 'verbal-reasoning',
            question: 'The game world is experiencing CORRUPTION. What does CORRUPTION mean in this context?',
            options: ['Building', 'Damage or errors', 'Improvement', 'Connection'],
            correctAnswer: 'Damage or errors',
            hint: 'Think about what happens when computer files get corrupted.',
            explanation: 'CORRUPTION means a state of decay or damage. In computing, it refers to errors in data or files that make them unreliable or unusable.',
          },
        },
        {
          id: 'choice-skate',
          text: '🛹 Drop into the Neon Skate District (rails and ramps everywhere)',
          nextNodeId: 'skate-entrance',
          educationalChallenge: {
            subject: 'spelling',
            question: 'Which spelling is CORRECT?',
            options: ['Neccessary', 'Necesary', 'NECESSARY', 'Neccesary'],
            correctAnswer: 'NECESSARY',
            hint: 'Remember: one Collar, two Sleeves (one C, two S\'s)',
            explanation: 'NECESSARY has one C and two S\'s. A good memory trick: "one Collar and two Sleeves".',
          },
        },
        {
          id: 'choice-dungeon',
          text: '⚔️ Explore the Glitched Dungeon (ancient temple vibes)',
          nextNodeId: 'dungeon-entrance',
        },
      ],
    },

    'craftmine-entrance': {
      id: 'craftmine-entrance',
      title: 'The Craft-Mine District',
      content: `The Craft-Mine District is chaos incarnate—pure, unfiltered digital madness. As you step into the zone, reality itself seems to break apart. Half-rendered chunks of terrain float impossibly in mid-air, defying all laws of physics. Some chunks are upside-down, others rotate slowly like they're stuck in an infinite loading screen. Below you, the ground flickers between grass, stone, and pure void. Hostile mobs spawn and despawn randomly around you—zombies appear for a split second before vanishing into pixels, skeletons fire arrows that freeze mid-air, and creepers phase in and out of existence without ever exploding.

The whole district pulses with unstable energy. Blocks flicker between different types: dirt becomes diamond, then sandstone, then back to dirt again. It's dizzying to watch. The air itself crackles with corrupt data, visible as glitchy particles floating all around you.

In the center of this chaos, you spot a crafting table—the iconic 3x3 grid that every player knows. But this one is glitching wildly between different states: wooden table, stone table, iron table, back to wood. On its surface, a holographic message flickers in and out of existence: "REDSTONE PUZZLE CORRUPTED. Solve to access the... *bzzt*... Core Block."

A villager suddenly phases into existence nearby, appearing out of thin air with a digital *pop*. His character model is broken—one arm is missing, his face glitches between different textures, and his name tag floats crookedly above his head: "Error_Trader_404". When he speaks, his voice is fragmented, like a corrupted audio file: "Young... *glitch*... one. The Core Block CONCEALS itself deep within the Nether Portal. But portal needs... *bzzt*... four Glitch Shards to activate. I can trade you one shard... if you can solve my riddle."

He gestures toward a row of wooden signs, each one displaying a different word. The signs flicker and buzz with electric energy.`,
      choices: [
        {
          id: 'choice-trade',
          text: '📝 Accept the trader\'s riddle challenge',
          nextNodeId: 'trader-riddle',
          educationalChallenge: {
            subject: 'verbal-reasoning',
            question: 'The Core Block CONCEALS itself. What does CONCEALS mean?',
            options: ['Reveals', 'Hides', 'Destroys', 'Creates'],
            correctAnswer: 'Hides',
            hint: 'If something conceals itself, can you easily see it?',
            explanation: 'CONCEALS means to hide or keep something secret. It\'s the opposite of reveal.',
          },
        },
        {
          id: 'choice-mine',
          text: '⛏️ Search the corrupted mines instead',
          nextNodeId: 'corrupted-mines',
        },
      ],
    },

    'trader-riddle': {
      id: 'trader-riddle',
      title: 'The Trader\'s Challenge',
      content: `Error_Trader_404 grins (or glitches into something resembling a grin). "Smart choice. Here's your challenge: I need to write a sign, but the glitch has scrambled the letters. Which word is spelled INCORRECTLY?"

Four signs appear, each with a word written on it. One of them flickers more than the others.`,
      choices: [
        {
          id: 'word-1',
          text: 'BUILDING',
          nextNodeId: 'trader-success',
        },
        {
          id: 'word-2',
          text: 'DEFENITLY',
          nextNodeId: 'trader-success',
          educationalChallenge: {
            subject: 'spelling',
            question: 'You selected DEFENITLY. Is this spelled correctly?',
            options: ['Yes, it\'s correct', 'No, it should be DEFINITELY'],
            correctAnswer: 'No, it should be DEFINITELY',
            explanation: 'DEFINITELY is spelled with an I before the T, not an I after. Think of it as DEFINITE + LY.',
          },
        },
        {
          id: 'word-3',
          text: 'CRAFTING',
          nextNodeId: 'trader-success',
        },
        {
          id: 'word-4',
          text: 'DIAMOND',
          nextNodeId: 'trader-success',
        },
      ],
    },

    'trader-success': {
      id: 'trader-success',
      title: 'First Glitch Shard Obtained',
      content: `"Impressive!" Error_Trader_404 flickers happily and hands you a glowing blue shard that pulses with corrupted energy. The Glitch Shard feels warm in your hand, and lines of code swirl inside it.

"You'll need three more shards," he says. "Try the Redstone Factory—it's ADJACENT to here. But be careful, the glitch has made everything... unpredictable."

As he speaks, the ground trembles. A chunk of the world reloads nearby with a sound like thousands of blocks being placed at once.`,
      itemsGained: ['Glitch Shard #1'],
      choices: [
        {
          id: 'choice-factory',
          text: '⚙️ Head to the Redstone Factory',
          nextNodeId: 'redstone-factory',
          educationalChallenge: {
            subject: 'verbal-reasoning',
            question: 'The factory is ADJACENT to your location. What does ADJACENT mean?',
            options: ['Far away', 'Next to or nearby', 'Below', 'Dangerous'],
            correctAnswer: 'Next to or nearby',
            hint: 'Think about adjacent rooms in a house.',
            explanation: 'ADJACENT means next to or adjoining something. Adjacent rooms share a wall.',
          },
        },
        {
          id: 'choice-explore',
          text: '🔍 Explore the area more',
          nextNodeId: 'corrupted-mines',
        },
      ],
    },

    'corrupted-mines': {
      id: 'corrupted-mines',
      title: 'The Corrupted Mines',
      content: `You descend into the mines, but something is very wrong. The minecart tracks twist in impossible directions, defying gravity. Ores spawn and despawn, and you hear the sound of pickaxes that aren't there.

At the bottom, you find an ancient chest flickering between locked and unlocked states. When it stabilizes for a moment, you see it contains a Glitch Shard!

But there's a riddle carved into the wall beside it, glitching between different languages. Finally it settles on English: "To OBTAIN what lies within, prove your knowledge of the written word."`,
      choices: [
        {
          id: 'chest-puzzle',
          text: '📖 Solve the chest riddle',
          nextNodeId: 'chest-solution',
          educationalChallenge: {
            subject: 'verbal-reasoning',
            question: 'To OBTAIN the shard. What does OBTAIN mean?',
            options: ['To lose', 'To get or acquire', 'To hide', 'To break'],
            correctAnswer: 'To get or acquire',
            hint: 'What are you trying to do with the shard?',
            explanation: 'OBTAIN means to get or acquire something, especially through effort or by request.',
          },
        },
      ],
    },

    'chest-solution': {
      id: 'chest-solution',
      title: 'Spelling Lock',
      content: `The chest lid displays a holographic keyboard. A message appears: "SPELL THE WORD TO UNLOCK. Which spelling is CORRECT?"

The word you need to spell is crucial—it's the nature of the glitch itself.`,
      choices: [
        {
          id: 'spell-1',
          text: 'SEPERATE',
          nextNodeId: 'chest-opened',
        },
        {
          id: 'spell-2',
          text: 'SEPARATE',
          nextNodeId: 'chest-opened',
          educationalChallenge: {
            subject: 'spelling',
            question: 'Which spelling is CORRECT?',
            options: ['SEPERATE', 'SEPARATE', 'SEPARETE', 'SEPRATE'],
            correctAnswer: 'SEPARATE',
            hint: 'There\'s "a rat" in separate!',
            explanation: 'SEPARATE is spelled with an A in the middle, not an E. Remember: there\'s "a rat" in separate.',
          },
        },
        {
          id: 'spell-3',
          text: 'SEPARETE',
          nextNodeId: 'chest-opened',
        },
        {
          id: 'spell-4',
          text: 'SEPRATE',
          nextNodeId: 'chest-opened',
        },
      ],
    },

    'chest-opened': {
      id: 'chest-opened',
      title: 'Second Shard Found',
      content: `The chest clicks open with a satisfying sound effect (the same one from treasure chests in adventure games). Inside, glowing with purple energy, is another Glitch Shard!

As you pick it up, the mines around you stabilize slightly. The flickering slows. You're making progress.

Your inventory now shows: Two Glitch Shards. Two more to go.

You hear music drifting down from above—electronic beats mixed with the sound of wheels on pavement. The Skate District?`,
      itemsGained: ['Glitch Shard #2'],
      choices: [
        {
          id: 'go-skate',
          text: '🛹 Head up to the Skate District',
          nextNodeId: 'skate-entrance',
        },
        {
          id: 'go-factory',
          text: '⚙️ Try the Redstone Factory',
          nextNodeId: 'redstone-factory',
        },
      ],
    },

    'skate-entrance': {
      id: 'skate-entrance',
      title: 'Neon Skate District',
      content: `You emerge into a glitching paradise of concrete and neon. Half-pipes flicker between different sizes, rails extend and retract, and grind spots appear and disappear.

Glitched skaters zoom past—some sideways, some upside-down, one riding backwards through the air. The laws of physics are merely suggestions here.

A holographic skate coach appears, his pixel art body glitching between a medieval knight and a modern skater. "Yo! Welcome to the sickest—*bzzt*—district in the realm. I've got a Glitch Shard, but you'll have to DEMONSTRATE your skills first."

A spelling challenge appears on a massive LED screen above a half-pipe.`,
      choices: [
        {
          id: 'skate-challenge',
          text: '🎯 Accept the skate challenge',
          nextNodeId: 'skate-puzzle',
          educationalChallenge: {
            subject: 'verbal-reasoning',
            question: 'DEMONSTRATE your skills. What does DEMONSTRATE mean?',
            options: ['Hide', 'Show or prove', 'Learn', 'Forget'],
            correctAnswer: 'Show or prove',
            hint: 'What does a demonstration do?',
            explanation: 'DEMONSTRATE means to show clearly or prove by giving examples or practical evidence.',
          },
        },
        {
          id: 'skate-explore',
          text: '🔍 Look around the district first',
          nextNodeId: 'skate-rails',
        },
      ],
    },

    'skate-puzzle': {
      id: 'skate-puzzle',
      title: 'Spell & Shred',
      content: `"Alright! Here's the deal," says the coach. "You're gonna spell while you skate. The glitch has corrupted our trick list—one of these words is spelled wrong. Find it while you land a kickflip!"

You drop into the half-pipe. As you ride, four words flash on the LED screen. Your skater avatar does tricks in rhythm with your choices.

Which word is spelled INCORRECTLY?`,
      choices: [
        {
          id: 'trick-1',
          text: 'OCCURRED',
          nextNodeId: 'skate-success',
        },
        {
          id: 'trick-2',
          text: 'ACCIDENTALLY',
          nextNodeId: 'skate-success',
        },
        {
          id: 'trick-3',
          text: 'BELEIVE',
          nextNodeId: 'skate-success',
          educationalChallenge: {
            subject: 'spelling',
            question: 'You selected BELEIVE. Is this spelled correctly?',
            options: ['Yes, it\'s correct', 'No, it should be BELIEVE'],
            correctAnswer: 'No, it should be BELIEVE',
            explanation: 'BELIEVE is spelled with IE not EI. Remember the rule: "I before E except after C".',
          },
        },
        {
          id: 'trick-4',
          text: 'GRINDING',
          nextNodeId: 'skate-success',
        },
      ],
    },

    'skate-success': {
      id: 'skate-success',
      title: 'Radical Reward',
      content: `"SICK!" The coach flickers excitedly as you land your final trick. "That was totally radical! You've earned this."

He tosses you a Glitch Shard that glows with neon blue and pink energy. As you catch it, the skate park stabilizes—the ramps stop flickering, and the rails become solid.

"One more shard to go," he says. "But listen—the final one? That's in the Boss Tower. You'll need to face the Glitch Guardian. It's a tough challenge, but I believe in you. Make sure you're ready before you go there."

Your inventory: Three Glitch Shards.`,
      itemsGained: ['Glitch Shard #3'],
      choices: [
        {
          id: 'final-prep',
          text: '⚔️ Head to the Boss Tower',
          nextNodeId: 'boss-tower',
        },
        {
          id: 'more-explore',
          text: '🔍 Explore more before the final challenge',
          nextNodeId: 'redstone-factory',
        },
      ],
    },

    'skate-rails': {
      id: 'skate-rails',
      title: 'Hidden Rails',
      content: `You explore the edges of the district and find a hidden area where rails phase between different games—Tony Hawk, Skate, even some futuristic hover-rails.

A glitched treasure chest sits at the end of a particularly tricky rail combo. But there's no shard here—just some useful items and a hint about the final boss.

A message etched in the concrete reads: "The Guardian fears ANCIENT wisdom more than modern force."`,
      choices: [
        {
          id: 'back-challenge',
          text: '🎯 Go back to take the skate challenge',
          nextNodeId: 'skate-puzzle',
        },
        {
          id: 'to-factory',
          text: '⚙️ Head to Redstone Factory',
          nextNodeId: 'redstone-factory',
        },
      ],
    },

    'redstone-factory': {
      id: 'redstone-factory',
      title: 'The Redstone Factory',
      content: `The Redstone Factory is a massive structure that looks like it was built by an engineer on a creative mode binge. Redstone circuits sprawl across walls and floors, pistons fire randomly, and hoppers suck items into unknown destinations.

At the center of the main room, a complex puzzle glows: seven levers, each labeled with a word. Only one combination will unlock the factory's core where a Glitch Shard waits.

A sign flickers into readability: "PULL THE LEVER WITH THE WORD THAT MEANS 'LASTING FOREVER' TO ACCESS THE CORE."

What does PERMANENT mean?`,
      choices: [
        {
          id: 'lever-puzzle',
          text: '🎮 Solve the lever puzzle',
          nextNodeId: 'factory-puzzle',
          educationalChallenge: {
            subject: 'verbal-reasoning',
            question: 'Find the lever labeled with a word meaning "lasting forever". What does PERMANENT mean?',
            options: ['Temporary', 'Lasting forever', 'Broken', 'Flexible'],
            correctAnswer: 'Lasting forever',
            hint: 'The opposite of temporary.',
            explanation: 'PERMANENT means lasting or intended to last indefinitely without change. It\'s the opposite of temporary.',
          },
        },
      ],
    },

    'factory-puzzle': {
      id: 'factory-puzzle',
      title: 'Core Access',
      content: `You pull the correct lever. The factory roars to life—but in a good way. Pistons align, hoppers organize themselves, and the redstone circuits pulse in a beautiful, synchronized pattern.

A hidden door opens, revealing the factory core. Inside, on a pedestal surrounded by perfectly timed redstone torches, sits another Glitch Shard!

But as you reach for it, an alarm sounds. The glitch knows you're close to fixing it. The corruption seems almost... RELUCTANT to be solved.

"WARNING: SYSTEM REPAIR IN PROGRESS. BOSS ENCOUNTER IMMINENT."`,
      choices: [
        {
          id: 'grab-shard',
          text: '✨ Take the shard',
          nextNodeId: 'factory-shard',
          educationalChallenge: {
            subject: 'verbal-reasoning',
            question: 'The glitch is RELUCTANT to be solved. What does RELUCTANT mean?',
            options: ['Eager', 'Unwilling or hesitant', 'Happy', 'Quick'],
            correctAnswer: 'Unwilling or hesitant',
            hint: 'Is something reluctant excited to happen?',
            explanation: 'RELUCTANT means unwilling or hesitant to do something. It shows resistance or lack of enthusiasm.',
          },
        },
      ],
    },

    'factory-shard': {
      id: 'factory-shard',
      title: 'The Fourth Shard',
      content: `You grab the Glitch Shard. Power surges through you as all four shards in your inventory begin to resonate with each other. They're reacting, pulling toward something...

The Boss Tower. You can see it in the distance now, materializing as if the shards are revealing it. It's a fusion of all the districts: blocky base, neon lights spiraling up its sides, rails wrapping around it, and at its peak, ancient temple architecture.

"FOUR GLITCH SHARDS COLLECTED. BOSS TOWER ACCESSIBLE. PREPARE FOR FINAL CONFRONTATION."

Your skateboard appears beneath your feet, glowing with shard energy. Time to finish this.`,
      itemsGained: ['Glitch Shard #4'],
      choices: [
        {
          id: 'to-boss',
          text: '🏰 Enter the Boss Tower',
          nextNodeId: 'boss-tower',
        },
      ],
    },

    'boss-tower': {
      id: 'boss-tower',
      title: 'The Boss Tower',
      content: `The tower's entrance looms before you. Inside, you can see a spiral of challenges—each district's theme represented. But you have all four shards now. You're ready.

As you enter, the Glitch Guardian materializes. It's massive—a corrupted fusion of a blocky golem, a skateboarding athlete, and an ancient knight. Its body flickers between forms, and its eyes glow with unstable code.

"YOU... *glitch*... SEEK TO... *bzzt*... RESTORE? I AM THE GLITCH. I AM... *static*... INEVITABLE."

But you notice something. The Guardian looks... tired. Maybe it WANTS to be fixed?

You need to place the four shards in their slots around the room. But first, one final challenge appears on the tower's central screen.`,
      choices: [
        {
          id: 'boss-challenge',
          text: '⚔️ Face the final challenge',
          nextNodeId: 'boss-final',
        },
      ],
    },

    'boss-final': {
      id: 'boss-final',
      title: 'The Final Test',
      content: `The Guardian speaks, its voice stabilizing: "To restore... the realm... prove your mastery... of words. Which word below is spelled INCORRECTLY? Choose wisely... this determines... everything."

Four words appear in glowing letters around the room. The Guardian watches. Your four shards pulse with energy, ready to be placed if you succeed.`,
      choices: [
        {
          id: 'final-1',
          text: 'GUARDIAN',
          nextNodeId: 'victory-roll',
        },
        {
          id: 'final-2',
          text: 'APPARENT',
          nextNodeId: 'victory-roll',
        },
        {
          id: 'final-3',
          text: 'SUFFICENT',
          nextNodeId: 'victory-roll',
          educationalChallenge: {
            subject: 'spelling',
            question: 'You selected SUFFICENT. Is this spelled correctly?',
            options: ['Yes, it\'s correct', 'No, it should be SUFFICIENT'],
            correctAnswer: 'No, it should be SUFFICIENT',
            explanation: 'SUFFICIENT is spelled with an I before the ENT ending. It means "enough" or "adequate".',
          },
        },
        {
          id: 'final-4',
          text: 'CHALLENGE',
          nextNodeId: 'victory-roll',
        },
      ],
    },

    'victory-roll': {
      id: 'victory-roll',
      title: 'The Restoration Dice',
      content: `The Guardian nods slowly. "Correct. You have... proven yourself... worthy."

The four shard slots light up. You place each shard carefully. As the final shard clicks into place, the Guardian speaks one more time:

"But... there is one... final element. Chaos and order... must be... balanced. Roll the dice... of fate. Roll 10 or higher... and the realm... stabilizes. Roll lower... and chaos... remains... manageable... but unpredictable."

A massive twenty-sided die materializes in your hand, glowing with all the colors of the districts.

This is it. Time to roll.`,
      diceRoll: {
        description: 'Roll to restore the realm!',
        diceType: 20,
        targetNumber: 10,
        successNodeId: 'ending-perfect',
        failureNodeId: 'ending-good',
      },
    },

    'ending-perfect': {
      id: 'ending-perfect',
      title: 'Perfect Restoration',
      content: `The die rolls across the tower floor, bouncing off steps and walls. It slows... and lands on ${20}!

CRITICAL SUCCESS!

The tower EXPLODES with light—but not destructively. It's beautiful. The glitch shards dissolve into pure energy that spreads across the entire realm.

You watch as everything stabilizes: the Craft-Mine chunks lock into place, the Skate District's ramps solidify into perfect curves, the Redstone Factory hums with perfect efficiency.

The Guardian transforms, no longer corrupted. It becomes a friendly NPC, waving at you. "Thank you... player. You have... saved us. The realm is... restored."

With a flash, you feel yourself being pulled back. The screen around you fades...

...and you open your eyes in your room, controller in hand. The game loads perfectly now—no glitches. But on screen, your character stands in the center of a new area called "The Hero's District" with a statue of YOU holding four glowing shards.

Achievement Unlocked: "Glitch Guardian"
Achievement Unlocked: "Perfect Restoration"
Achievement Unlocked: "Master of Words"

You smile. What an adventure. And your spelling is going to ace that test now!

THE END (PERFECT ENDING)`,
      isEnding: true,
    },

    'ending-good': {
      id: 'ending-good',
      title: 'Chaotic Restoration',
      content: `The die rolls... and lands on a lower number.

The shards activate, but the restoration is... quirky. The realm stabilizes, but keeps some of its glitchy charm. Skaters can now do impossible tricks, blocks sometimes float, and the physics are wonderfully weird.

The Guardian laughs—actually laughs! "A perfect... *glitch*... balance. Chaos and order... together. Well done... player!"

The realm is saved, but it's more fun this way. Some glitches are features, not bugs.

You feel yourself being pulled back to reality. The screen fades...

...and you open your eyes in your room. The game runs great now—it still has those cool "intentional" glitches that make it unique. And on screen, your character stands proudly in the new "Hero's District."

Achievement Unlocked: "Glitch Guardian"
Achievement Unlocked: "Chaotic Savior"
Achievement Unlocked: "Vocabulary Victor"

You grin. That was epic. And now you're way better at spelling, too!

THE END (GOOD ENDING)`,
      isEnding: true,
    },

    'dungeon-entrance': {
      id: 'dungeon-entrance',
      title: 'The Glitched Dungeon',
      content: `The Glitched Dungeon is clearly inspired by ancient adventure games—but corrupted. Stone torches flicker between fire and redstone torches. Zelda-style pots sit next to Minecraft chests. Ancient symbols glitch between different languages.

Deep in the dungeon, you'll find challenges and secrets. But this path requires items from the other districts. For now, you can explore the entrance.

A sign reads: "THOSE WHO POSSESS THE KNOWLEDGE OF OTHER REALMS SHALL FIND TREASURE HERE."`,
      choices: [
        {
          id: 'back-to-start',
          text: '🔙 Go back and choose another path',
          nextNodeId: 'start',
        },
        {
          id: 'explore-dungeon',
          text: '🔦 Explore what you can',
          nextNodeId: 'dungeon-explore',
        },
      ],
    },

    'dungeon-explore': {
      id: 'dungeon-explore',
      title: 'Dungeon Depths',
      content: `You venture deeper into the dungeon. The atmosphere is thick with mystery—glowing crystals embedded in walls, ancient mechanisms that look like puzzle bosses from adventure games.

You find some useful hints about the other districts and how they're connected. But the main treasures here require shards from the other zones.

A hint on the wall reads: "THE ANCIENT wisdom is in the words. Master them, master the realm."`,
      choices: [
        {
          id: 'leave-dungeon',
          text: '🚪 Leave the dungeon',
          nextNodeId: 'start',
        },
      ],
    },
  },
};

// Define all four worlds
export const gameData: GameData = {
  worlds: [
    {
      id: 'glitched-realm',
      title: 'The Glitched Realm',
      description: 'Restore order to a digital world gone wrong',
      emoji: '🎮',
      coverColor: '#00D632',
      coverGradient: 'from-accent to-purple',
      locked: false,
      storyData: glitchedRealmStory,
    },
    {
      id: 'spelling-academy',
      title: 'Spelling Academy',
      description: 'Master the art of perfect spelling',
      emoji: '✏️',
      coverColor: '#FFCF00',
      coverGradient: 'from-yellow to-orange-500',
      locked: true,
    },
    {
      id: 'word-wizards',
      title: 'Word Wizards',
      description: 'Cast spells with vocabulary',
      emoji: '🧙',
      coverColor: '#A259FF',
      coverGradient: 'from-purple to-blue',
      locked: true,
    },
    {
      id: 'mystery-mansion',
      title: 'Mystery Mansion',
      description: 'Solve riddles in a haunted house',
      emoji: '🏚️',
      coverColor: '#00D5FF',
      coverGradient: 'from-blue to-gray-700',
      locked: true,
    },
  ],
};

// For backwards compatibility, export the first world's story
export const storyData = glitchedRealmStory;
