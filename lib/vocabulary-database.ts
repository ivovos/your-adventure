export interface VocabularyWord {
  word: string;
  type: 'spelling' | 'verbal';
  category: string;
  definition: string;
  synonyms: string[];
  difficulty: 1 | 2 | 3; // 1=easier, 3=harder
  commonContexts: string[]; // Where this word might naturally appear
  memoryTrick?: string; // Mnemonic device
  exampleSentence?: string;
}

// ==================== SPELLING WORDS ====================
// Common spelling challenges for Kent 11+ exam

export const SPELLING_WORDS: VocabularyWord[] = [
  // Double letters and tricky patterns
  {
    word: 'NECESSARY',
    type: 'spelling',
    category: 'spelling-doubles',
    definition: 'Needed; required',
    synonyms: ['essential', 'required', 'needed'],
    difficulty: 2,
    commonContexts: ['adventure', 'quest', 'puzzle', 'survival'],
    memoryTrick: 'One Collar, two Sleeves (1 C, 2 S)',
    exampleSentence: 'It is necessary to find the key before entering the castle.'
  },
  {
    word: 'SEPARATE',
    type: 'spelling',
    category: 'spelling-vowels',
    definition: 'To divide or keep apart',
    synonyms: ['divide', 'split', 'part'],
    difficulty: 2,
    commonContexts: ['puzzle', 'choice', 'path'],
    memoryTrick: 'There\'s A RAT in sepARATE',
    exampleSentence: 'The wizard used magic to separate the two fighting dragons.'
  },
  {
    word: 'BELIEVE',
    type: 'spelling',
    category: 'spelling-ie-ei',
    definition: 'To accept as true',
    synonyms: ['trust', 'accept', 'think'],
    difficulty: 2,
    commonContexts: ['mystery', 'magic', 'discovery'],
    memoryTrick: 'I before E except after C',
    exampleSentence: 'Do you believe in magic and mythical creatures?'
  },
  {
    word: 'DEFINITELY',
    type: 'spelling',
    category: 'spelling-ie-ei',
    definition: 'Certainly; without doubt',
    synonyms: ['certainly', 'absolutely', 'surely'],
    difficulty: 2,
    commonContexts: ['decision', 'certainty', 'planning'],
    memoryTrick: 'DEFINITE + LY',
    exampleSentence: 'I will definitely complete this quest before sunset.'
  },
  {
    word: 'OCCURRED',
    type: 'spelling',
    category: 'spelling-doubles',
    definition: 'Happened; took place',
    synonyms: ['happened', 'took place', 'arose'],
    difficulty: 2,
    commonContexts: ['story', 'event', 'mystery'],
    memoryTrick: 'Double C, double R',
    exampleSentence: 'A strange event occurred in the haunted library last night.'
  },
  {
    word: 'DISAPPEAR',
    type: 'spelling',
    category: 'spelling-prefixes',
    definition: 'To vanish; to go out of sight',
    synonyms: ['vanish', 'fade', 'evaporate'],
    difficulty: 2,
    commonContexts: ['magic', 'mystery', 'stealth'],
    memoryTrick: 'DIS + APPEAR (one S, two P)',
    exampleSentence: 'The ghost will disappear when the sun rises.'
  },
  {
    word: 'ACCOMMODATE',
    type: 'spelling',
    category: 'spelling-doubles',
    definition: 'To provide space or adjustment for',
    synonyms: ['hold', 'fit', 'house'],
    difficulty: 3,
    commonContexts: ['building', 'planning', 'space'],
    memoryTrick: 'Two Cots, Two Mattresses (CC, MM)',
    exampleSentence: 'This ship can accommodate fifty passengers.'
  },
  {
    word: 'EMBARRASS',
    type: 'spelling',
    category: 'spelling-doubles',
    definition: 'To make someone feel awkward or ashamed',
    synonyms: ['shame', 'humiliate', 'fluster'],
    difficulty: 2,
    commonContexts: ['social', 'mistake', 'emotion'],
    memoryTrick: 'Two R, two S - Really Red, Super Shy',
    exampleSentence: 'Making a mistake in front of everyone can embarrass you.'
  },
  {
    word: 'OCCASIONALLY',
    type: 'spelling',
    category: 'spelling-doubles',
    definition: 'Sometimes; now and then',
    synonyms: ['sometimes', 'periodically', 'infrequently'],
    difficulty: 2,
    commonContexts: ['frequency', 'time', 'event'],
    memoryTrick: 'Two C, one S, two L',
    exampleSentence: 'The dragon only attacks the village occasionally.'
  },
  {
    word: 'POSSESSION',
    type: 'spelling',
    category: 'spelling-doubles',
    definition: 'Something owned; ownership',
    synonyms: ['ownership', 'property', 'belonging'],
    difficulty: 2,
    commonContexts: ['treasure', 'items', 'ownership'],
    memoryTrick: 'Two S in the middle, two S at the end',
    exampleSentence: 'The ancient sword is the knight\'s most valuable possession.'
  },
  {
    word: 'RECEIVE',
    type: 'spelling',
    category: 'spelling-ie-ei',
    definition: 'To get or be given something',
    synonyms: ['get', 'obtain', 'accept'],
    difficulty: 2,
    commonContexts: ['reward', 'gift', 'message'],
    memoryTrick: 'I before E except after C',
    exampleSentence: 'You will receive a reward after completing the quest.'
  },
  {
    word: 'ACHIEVE',
    type: 'spelling',
    category: 'spelling-ie-ei',
    definition: 'To accomplish; to reach a goal',
    synonyms: ['accomplish', 'reach', 'attain'],
    difficulty: 2,
    commonContexts: ['goal', 'success', 'victory'],
    memoryTrick: 'I before E (no C before)',
    exampleSentence: 'With hard work, you can achieve anything you dream of.'
  },
  {
    word: 'BEGINNING',
    type: 'spelling',
    category: 'spelling-doubles',
    definition: 'The start or first part',
    synonyms: ['start', 'origin', 'commencement'],
    difficulty: 2,
    commonContexts: ['story', 'journey', 'time'],
    memoryTrick: 'One G at start, two N in middle',
    exampleSentence: 'Every great adventure has a humble beginning.'
  },
  {
    word: 'COMMITTEE',
    type: 'spelling',
    category: 'spelling-doubles',
    definition: 'A group of people working together',
    synonyms: ['group', 'council', 'board'],
    difficulty: 3,
    commonContexts: ['group', 'planning', 'organization'],
    memoryTrick: 'Two M, two T, two E',
    exampleSentence: 'The village committee decided to send heroes on the quest.'
  },
  {
    word: 'CONSCIENCE',
    type: 'spelling',
    category: 'spelling-tricky',
    definition: 'Inner sense of right and wrong',
    synonyms: ['morals', 'ethics', 'principles'],
    difficulty: 3,
    commonContexts: ['choice', 'morality', 'decision'],
    memoryTrick: 'CON + SCIENCE',
    exampleSentence: 'His conscience told him to return the stolen treasure.'
  },
  {
    word: 'CURIOSITY',
    type: 'spelling',
    category: 'spelling-tricky',
    definition: 'Desire to learn or know',
    synonyms: ['inquisitiveness', 'interest', 'wonder'],
    difficulty: 2,
    commonContexts: ['learning', 'exploration', 'discovery'],
    memoryTrick: 'CURIOUS + ITY',
    exampleSentence: 'Curiosity led the explorer into the mysterious cave.'
  },
  {
    word: 'IMMEDIATELY',
    type: 'spelling',
    category: 'spelling-doubles',
    definition: 'Right away; without delay',
    synonyms: ['instantly', 'now', 'promptly'],
    difficulty: 2,
    commonContexts: ['urgency', 'action', 'speed'],
    memoryTrick: 'Two M in the middle',
    exampleSentence: 'You must leave immediately before the bridge collapses!'
  },
  {
    word: 'LIGHTNING',
    type: 'spelling',
    category: 'spelling-silent',
    definition: 'Electric flash in the sky',
    synonyms: ['bolt', 'flash', 'thunderbolt'],
    difficulty: 2,
    commonContexts: ['weather', 'storm', 'magic'],
    memoryTrick: 'Silent T (like light)',
    exampleSentence: 'Lightning struck the ancient tower during the storm.'
  },
  {
    word: 'PARALLEL',
    type: 'spelling',
    category: 'spelling-doubles',
    definition: 'Side by side; never meeting',
    synonyms: ['alongside', 'similar', 'matching'],
    difficulty: 3,
    commonContexts: ['geometry', 'path', 'comparison'],
    memoryTrick: 'Two parallel lines (LL)',
    exampleSentence: 'The train tracks run parallel to each other.'
  },
  {
    word: 'RHYTHM',
    type: 'spelling',
    category: 'spelling-unusual',
    definition: 'A pattern of beats or sounds',
    synonyms: ['beat', 'pattern', 'tempo'],
    difficulty: 3,
    commonContexts: ['music', 'pattern', 'dance'],
    memoryTrick: 'Rhythm Helps Your Two Hips Move',
    exampleSentence: 'The drummer played a steady rhythm on the drums.'
  },
];

// ==================== VERBAL REASONING WORDS ====================
// Categorized by theme for natural story integration

export const VERBAL_WORDS: VocabularyWord[] = [
  // ACTIONS & MOVEMENT
  {
    word: 'CONCEAL',
    type: 'verbal',
    category: 'action-stealth',
    definition: 'To hide or keep secret',
    synonyms: ['hide', 'cover', 'obscure'],
    difficulty: 2,
    commonContexts: ['mystery', 'stealth', 'secret', 'treasure'],
    exampleSentence: 'The spy tried to conceal the secret map in her boot.'
  },
  {
    word: 'REVEAL',
    type: 'verbal',
    category: 'action-discovery',
    definition: 'To show or make known',
    synonyms: ['show', 'display', 'uncover'],
    difficulty: 1,
    commonContexts: ['discovery', 'secret', 'mystery', 'magic'],
    exampleSentence: 'The door opened to reveal a hidden chamber filled with gold.'
  },
  {
    word: 'DEMONSTRATE',
    type: 'verbal',
    category: 'action-showing',
    definition: 'To show clearly or prove',
    synonyms: ['show', 'prove', 'display'],
    difficulty: 2,
    commonContexts: ['teaching', 'skill', 'proof', 'sports'],
    exampleSentence: 'The master will demonstrate the perfect skateboard trick.'
  },
  {
    word: 'NAVIGATE',
    type: 'verbal',
    category: 'action-movement',
    definition: 'To find your way through',
    synonyms: ['steer', 'guide', 'direct'],
    difficulty: 2,
    commonContexts: ['journey', 'exploration', 'maze', 'ocean'],
    exampleSentence: 'Use the compass to navigate through the dark forest.'
  },
  {
    word: 'EXAMINE',
    type: 'verbal',
    category: 'action-investigation',
    definition: 'To look at closely; to inspect',
    synonyms: ['inspect', 'study', 'investigate'],
    difficulty: 2,
    commonContexts: ['mystery', 'detective', 'science', 'puzzle'],
    exampleSentence: 'The detective will examine the footprints for clues.'
  },
  {
    word: 'ABANDON',
    type: 'verbal',
    category: 'action-leaving',
    definition: 'To leave behind or give up',
    synonyms: ['desert', 'forsake', 'leave'],
    difficulty: 2,
    commonContexts: ['quest', 'place', 'decision', 'rescue'],
    exampleSentence: 'The crew had to abandon the sinking ship.'
  },
  {
    word: 'PURSUE',
    type: 'verbal',
    category: 'action-chase',
    definition: 'To chase or follow',
    synonyms: ['chase', 'follow', 'hunt'],
    difficulty: 2,
    commonContexts: ['chase', 'goal', 'quest', 'adventure'],
    exampleSentence: 'The heroes pursue the villain through the crowded marketplace.'
  },
  {
    word: 'OBSERVE',
    type: 'verbal',
    category: 'action-watching',
    definition: 'To watch carefully',
    synonyms: ['watch', 'notice', 'see'],
    difficulty: 2,
    commonContexts: ['investigation', 'nature', 'science', 'spy'],
    exampleSentence: 'Observe the stars to find the path north.'
  },
  {
    word: 'ACQUIRE',
    type: 'verbal',
    category: 'action-obtaining',
    definition: 'To get or obtain',
    synonyms: ['obtain', 'get', 'gain'],
    difficulty: 2,
    commonContexts: ['treasure', 'skill', 'item', 'knowledge'],
    exampleSentence: 'You must acquire three magical gems to unlock the door.'
  },
  {
    word: 'ATTEMPT',
    type: 'verbal',
    category: 'action-trying',
    definition: 'To try',
    synonyms: ['try', 'endeavor', 'strive'],
    difficulty: 1,
    commonContexts: ['challenge', 'puzzle', 'quest', 'battle'],
    exampleSentence: 'She will attempt to solve the riddle before time runs out.'
  },

  // DESCRIPTIVE - SIZE & SCALE
  {
    word: 'ENORMOUS',
    type: 'verbal',
    category: 'descriptive-size',
    definition: 'Very large; huge',
    synonyms: ['huge', 'massive', 'gigantic'],
    difficulty: 1,
    commonContexts: ['monster', 'building', 'object', 'creature'],
    exampleSentence: 'An enormous dragon blocked the entrance to the cave.'
  },
  {
    word: 'MINIATURE',
    type: 'verbal',
    category: 'descriptive-size',
    definition: 'Very small; tiny',
    synonyms: ['tiny', 'small', 'minute'],
    difficulty: 2,
    commonContexts: ['object', 'creature', 'magic', 'model'],
    exampleSentence: 'The wizard kept a miniature castle on his desk.'
  },
  {
    word: 'VAST',
    type: 'verbal',
    category: 'descriptive-size',
    definition: 'Extremely large in area or extent',
    synonyms: ['huge', 'immense', 'expansive'],
    difficulty: 2,
    commonContexts: ['landscape', 'ocean', 'space', 'desert'],
    exampleSentence: 'They crossed the vast desert for seven days.'
  },

  // DESCRIPTIVE - AGE & TIME
  {
    word: 'ANCIENT',
    type: 'verbal',
    category: 'descriptive-time',
    definition: 'Very old',
    synonyms: ['old', 'aged', 'historical'],
    difficulty: 2,
    commonContexts: ['ruins', 'artifact', 'temple', 'wisdom'],
    exampleSentence: 'The ancient temple was built thousands of years ago.'
  },
  {
    word: 'PERMANENT',
    type: 'verbal',
    category: 'descriptive-time',
    definition: 'Lasting forever; not temporary',
    synonyms: ['lasting', 'enduring', 'eternal'],
    difficulty: 2,
    commonContexts: ['change', 'mark', 'solution', 'decision'],
    exampleSentence: 'The spell created a permanent shield around the castle.'
  },
  {
    word: 'BRIEF',
    type: 'verbal',
    category: 'descriptive-time',
    definition: 'Short in time or length',
    synonyms: ['short', 'quick', 'fleeting'],
    difficulty: 1,
    commonContexts: ['time', 'message', 'visit', 'moment'],
    exampleSentence: 'They had only a brief moment to escape.'
  },
  {
    word: 'CONSTANT',
    type: 'verbal',
    category: 'descriptive-time',
    definition: 'Happening all the time; continuous',
    synonyms: ['continuous', 'steady', 'persistent'],
    difficulty: 2,
    commonContexts: ['sound', 'motion', 'problem', 'presence'],
    exampleSentence: 'The constant dripping of water echoed through the cave.'
  },

  // DESCRIPTIVE - APPEARANCE
  {
    word: 'BRILLIANT',
    type: 'verbal',
    category: 'descriptive-appearance',
    definition: 'Very bright or very clever',
    synonyms: ['bright', 'shining', 'smart'],
    difficulty: 2,
    commonContexts: ['light', 'idea', 'person', 'gem'],
    exampleSentence: 'The brilliant gemstone glowed in the darkness.'
  },
  {
    word: 'DULL',
    type: 'verbal',
    category: 'descriptive-appearance',
    definition: 'Not bright or interesting',
    synonyms: ['boring', 'dim', 'plain'],
    difficulty: 1,
    commonContexts: ['color', 'blade', 'activity', 'sound'],
    exampleSentence: 'The sword had become dull from years of use.'
  },
  {
    word: 'INVISIBLE',
    type: 'verbal',
    category: 'descriptive-appearance',
    definition: 'Cannot be seen',
    synonyms: ['unseen', 'hidden', 'imperceptible'],
    difficulty: 2,
    commonContexts: ['magic', 'stealth', 'air', 'force'],
    exampleSentence: 'The potion made him invisible for one hour.'
  },
  {
    word: 'TRANSPARENT',
    type: 'verbal',
    category: 'descriptive-appearance',
    definition: 'Can be seen through; clear',
    synonyms: ['clear', 'see-through', 'obvious'],
    difficulty: 2,
    commonContexts: ['glass', 'water', 'lie', 'material'],
    exampleSentence: 'The walls were made of transparent crystal.'
  },

  // DESCRIPTIVE - QUALITY
  {
    word: 'EXCELLENT',
    type: 'verbal',
    category: 'descriptive-quality',
    definition: 'Very good; outstanding',
    synonyms: ['outstanding', 'superb', 'great'],
    difficulty: 1,
    commonContexts: ['performance', 'quality', 'work', 'skill'],
    exampleSentence: 'Your excellent work has earned you a reward.'
  },
  {
    word: 'INFERIOR',
    type: 'verbal',
    category: 'descriptive-quality',
    definition: 'Lower in quality or rank',
    synonyms: ['worse', 'lesser', 'poor'],
    difficulty: 2,
    commonContexts: ['quality', 'rank', 'comparison', 'product'],
    exampleSentence: 'This sword is inferior to the legendary blade.'
  },
  {
    word: 'SUFFICIENT',
    type: 'verbal',
    category: 'descriptive-amount',
    definition: 'Enough; adequate',
    synonyms: ['enough', 'adequate', 'ample'],
    difficulty: 2,
    commonContexts: ['amount', 'resource', 'time', 'supply'],
    exampleSentence: 'We have sufficient supplies to last the winter.'
  },
  {
    word: 'SCARCE',
    type: 'verbal',
    category: 'descriptive-amount',
    definition: 'Not enough; rare',
    synonyms: ['rare', 'limited', 'insufficient'],
    difficulty: 2,
    commonContexts: ['resource', 'food', 'time', 'treasure'],
    exampleSentence: 'Water is scarce in the desert kingdom.'
  },

  // EMOTIONS & STATES
  {
    word: 'ANXIOUS',
    type: 'verbal',
    category: 'emotion-worry',
    definition: 'Worried or nervous',
    synonyms: ['worried', 'nervous', 'uneasy'],
    difficulty: 2,
    commonContexts: ['feeling', 'waiting', 'danger', 'test'],
    exampleSentence: 'The villagers were anxious about the approaching storm.'
  },
  {
    word: 'COURAGEOUS',
    type: 'verbal',
    category: 'emotion-brave',
    definition: 'Brave; fearless',
    synonyms: ['brave', 'bold', 'fearless'],
    difficulty: 2,
    commonContexts: ['hero', 'action', 'decision', 'battle'],
    exampleSentence: 'It was courageous to face the dragon alone.'
  },
  {
    word: 'RELUCTANT',
    type: 'verbal',
    category: 'emotion-unwilling',
    definition: 'Unwilling or hesitant',
    synonyms: ['unwilling', 'hesitant', 'resistant'],
    difficulty: 2,
    commonContexts: ['decision', 'agreement', 'participation', 'change'],
    exampleSentence: 'He was reluctant to enter the haunted mansion.'
  },
  {
    word: 'ENTHUSIASTIC',
    type: 'verbal',
    category: 'emotion-excited',
    definition: 'Very excited and interested',
    synonyms: ['excited', 'eager', 'keen'],
    difficulty: 2,
    commonContexts: ['participation', 'interest', 'response', 'attitude'],
    exampleSentence: 'The team was enthusiastic about the new quest.'
  },
  {
    word: 'SUSPICIOUS',
    type: 'verbal',
    category: 'emotion-distrust',
    definition: 'Doubting; not trusting',
    synonyms: ['doubtful', 'distrustful', 'questionable'],
    difficulty: 2,
    commonContexts: ['mystery', 'detective', 'behavior', 'evidence'],
    exampleSentence: 'The detective found the stranger\'s story suspicious.'
  },
  {
    word: 'CONFIDENT',
    type: 'verbal',
    category: 'emotion-sure',
    definition: 'Sure of oneself; self-assured',
    synonyms: ['sure', 'certain', 'assured'],
    difficulty: 1,
    commonContexts: ['attitude', 'performance', 'decision', 'ability'],
    exampleSentence: 'She felt confident she could solve the puzzle.'
  },
  {
    word: 'MISERABLE',
    type: 'verbal',
    category: 'emotion-sad',
    definition: 'Very unhappy or uncomfortable',
    synonyms: ['unhappy', 'sad', 'wretched'],
    difficulty: 2,
    commonContexts: ['feeling', 'condition', 'weather', 'situation'],
    exampleSentence: 'The prisoners were miserable in the cold dungeon.'
  },
  {
    word: 'GRATEFUL',
    type: 'verbal',
    category: 'emotion-thankful',
    definition: 'Thankful; appreciative',
    synonyms: ['thankful', 'appreciative', 'obliged'],
    difficulty: 1,
    commonContexts: ['help', 'gift', 'rescue', 'kindness'],
    exampleSentence: 'The villagers were grateful for the hero\'s help.'
  },

  // THINKING & KNOWLEDGE
  {
    word: 'INTELLIGENT',
    type: 'verbal',
    category: 'thinking-smart',
    definition: 'Smart; able to learn and understand',
    synonyms: ['smart', 'clever', 'bright'],
    difficulty: 2,
    commonContexts: ['person', 'creature', 'decision', 'design'],
    exampleSentence: 'The intelligent robot could solve complex problems.'
  },
  {
    word: 'IGNORANT',
    type: 'verbal',
    category: 'thinking-unaware',
    definition: 'Lacking knowledge or awareness',
    synonyms: ['unaware', 'unknowing', 'uninformed'],
    difficulty: 2,
    commonContexts: ['person', 'situation', 'danger', 'fact'],
    exampleSentence: 'They were ignorant of the dangers that lay ahead.'
  },
  {
    word: 'OBVIOUS',
    type: 'verbal',
    category: 'thinking-clear',
    definition: 'Easy to see or understand',
    synonyms: ['clear', 'evident', 'apparent'],
    difficulty: 2,
    commonContexts: ['clue', 'answer', 'choice', 'fact'],
    exampleSentence: 'It was obvious which path led to the treasure.'
  },
  {
    word: 'CONFUSING',
    type: 'verbal',
    category: 'thinking-unclear',
    definition: 'Hard to understand',
    synonyms: ['puzzling', 'unclear', 'bewildering'],
    difficulty: 1,
    commonContexts: ['instruction', 'maze', 'message', 'situation'],
    exampleSentence: 'The wizard\'s riddle was very confusing.'
  },
  {
    word: 'EVIDENCE',
    type: 'verbal',
    category: 'thinking-proof',
    definition: 'Proof or signs that something is true',
    synonyms: ['proof', 'clue', 'indication'],
    difficulty: 2,
    commonContexts: ['mystery', 'detective', 'science', 'investigation'],
    exampleSentence: 'The detective found evidence that pointed to the thief.'
  },
  {
    word: 'PREDICT',
    type: 'verbal',
    category: 'thinking-future',
    definition: 'To say what will happen in the future',
    synonyms: ['forecast', 'foresee', 'anticipate'],
    difficulty: 2,
    commonContexts: ['future', 'weather', 'outcome', 'magic'],
    exampleSentence: 'The fortune teller claimed to predict the future.'
  },

  // LOCATION & POSITION
  {
    word: 'ADJACENT',
    type: 'verbal',
    category: 'position-near',
    definition: 'Next to or nearby',
    synonyms: ['next to', 'neighboring', 'beside'],
    difficulty: 2,
    commonContexts: ['location', 'room', 'building', 'area'],
    exampleSentence: 'The library is adjacent to the town hall.'
  },
  {
    word: 'REMOTE',
    type: 'verbal',
    category: 'position-far',
    definition: 'Far away; distant',
    synonyms: ['distant', 'faraway', 'isolated'],
    difficulty: 2,
    commonContexts: ['location', 'island', 'village', 'control'],
    exampleSentence: 'The castle was built on a remote mountain peak.'
  },
  {
    word: 'HORIZONTAL',
    type: 'verbal',
    category: 'position-direction',
    definition: 'Flat; parallel to the ground',
    synonyms: ['flat', 'level', 'sideways'],
    difficulty: 2,
    commonContexts: ['line', 'position', 'surface', 'beam'],
    exampleSentence: 'The beam was placed in a horizontal position.'
  },
  {
    word: 'VERTICAL',
    type: 'verbal',
    category: 'position-direction',
    definition: 'Upright; perpendicular to the ground',
    synonyms: ['upright', 'perpendicular', 'straight up'],
    difficulty: 2,
    commonContexts: ['line', 'cliff', 'wall', 'tower'],
    exampleSentence: 'They climbed the vertical cliff face.'
  },
  {
    word: 'BENEATH',
    type: 'verbal',
    category: 'position-under',
    definition: 'Under or below',
    synonyms: ['under', 'below', 'underneath'],
    difficulty: 1,
    commonContexts: ['location', 'surface', 'ground', 'water'],
    exampleSentence: 'The treasure was hidden beneath the old oak tree.'
  },
  {
    word: 'INTERIOR',
    type: 'verbal',
    category: 'position-inside',
    definition: 'Inside part',
    synonyms: ['inside', 'inner', 'internal'],
    difficulty: 2,
    commonContexts: ['building', 'box', 'cave', 'design'],
    exampleSentence: 'The interior of the castle was decorated with gold.'
  },
  {
    word: 'EXTERIOR',
    type: 'verbal',
    category: 'position-outside',
    definition: 'Outside part',
    synonyms: ['outside', 'outer', 'external'],
    difficulty: 2,
    commonContexts: ['building', 'surface', 'appearance', 'wall'],
    exampleSentence: 'The exterior of the spaceship was covered in scratches.'
  },

  // ABSTRACT CONCEPTS
  {
    word: 'OPPORTUNITY',
    type: 'verbal',
    category: 'abstract-chance',
    definition: 'A chance to do something',
    synonyms: ['chance', 'possibility', 'opening'],
    difficulty: 2,
    commonContexts: ['choice', 'chance', 'career', 'adventure'],
    exampleSentence: 'This quest is an opportunity to prove yourself.'
  },
  {
    word: 'CONSEQUENCE',
    type: 'verbal',
    category: 'abstract-result',
    definition: 'A result or effect of an action',
    synonyms: ['result', 'outcome', 'effect'],
    difficulty: 2,
    commonContexts: ['decision', 'action', 'choice', 'behavior'],
    exampleSentence: 'Every choice has a consequence, good or bad.'
  },
  {
    word: 'ADVANTAGE',
    type: 'verbal',
    category: 'abstract-benefit',
    definition: 'Something that helps you succeed',
    synonyms: ['benefit', 'edge', 'plus'],
    difficulty: 2,
    commonContexts: ['competition', 'battle', 'situation', 'skill'],
    exampleSentence: 'Speed gives you an advantage in battle.'
  },
  {
    word: 'OBSTACLE',
    type: 'verbal',
    category: 'abstract-barrier',
    definition: 'Something that blocks your way',
    synonyms: ['barrier', 'hurdle', 'impediment'],
    difficulty: 2,
    commonContexts: ['challenge', 'path', 'goal', 'problem'],
    exampleSentence: 'The fallen tree was a major obstacle on the path.'
  },
  {
    word: 'CHAOS',
    type: 'verbal',
    category: 'abstract-disorder',
    definition: 'Complete disorder and confusion',
    synonyms: ['disorder', 'confusion', 'mayhem'],
    difficulty: 2,
    commonContexts: ['battle', 'disaster', 'magic', 'crowd'],
    exampleSentence: 'The glitch caused chaos throughout the digital realm.'
  },
  {
    word: 'HARMONY',
    type: 'verbal',
    category: 'abstract-order',
    definition: 'Agreement; working well together',
    synonyms: ['agreement', 'unity', 'balance'],
    difficulty: 2,
    commonContexts: ['music', 'peace', 'cooperation', 'balance'],
    exampleSentence: 'The kingdom lived in harmony for many years.'
  },
  {
    word: 'AUTHENTIC',
    type: 'verbal',
    category: 'abstract-real',
    definition: 'Real; genuine',
    synonyms: ['genuine', 'real', 'true'],
    difficulty: 2,
    commonContexts: ['artifact', 'document', 'person', 'story'],
    exampleSentence: 'The museum confirmed the crown was authentic.'
  },
  {
    word: 'ARTIFICIAL',
    type: 'verbal',
    category: 'abstract-fake',
    definition: 'Made by humans; not natural',
    synonyms: ['fake', 'synthetic', 'man-made'],
    difficulty: 2,
    commonContexts: ['intelligence', 'light', 'material', 'flavoring'],
    exampleSentence: 'The flowers were artificial, made of plastic.'
  },

  // COMPARISON & RELATIONSHIP
  {
    word: 'SIMILAR',
    type: 'verbal',
    category: 'comparison-alike',
    definition: 'Almost the same; alike',
    synonyms: ['alike', 'comparable', 'resembling'],
    difficulty: 1,
    commonContexts: ['comparison', 'pattern', 'object', 'idea'],
    exampleSentence: 'The two puzzles were very similar in design.'
  },
  {
    word: 'OPPOSITE',
    type: 'verbal',
    category: 'comparison-different',
    definition: 'Completely different',
    synonyms: ['contrary', 'reverse', 'antithesis'],
    difficulty: 1,
    commonContexts: ['direction', 'meaning', 'side', 'character'],
    exampleSentence: 'Hot and cold are opposite temperatures.'
  },
  {
    word: 'UNIQUE',
    type: 'verbal',
    category: 'comparison-special',
    definition: 'One of a kind; special',
    synonyms: ['special', 'singular', 'distinctive'],
    difficulty: 2,
    commonContexts: ['item', 'person', 'ability', 'design'],
    exampleSentence: 'Each snowflake is unique with its own pattern.'
  },
  {
    word: 'TYPICAL',
    type: 'verbal',
    category: 'comparison-usual',
    definition: 'Normal; usual',
    synonyms: ['normal', 'usual', 'standard'],
    difficulty: 2,
    commonContexts: ['behavior', 'example', 'day', 'pattern'],
    exampleSentence: 'This is typical weather for summer in the desert.'
  },

  // CHANGE & TRANSFORMATION
  {
    word: 'TRANSFORM',
    type: 'verbal',
    category: 'change-major',
    definition: 'To change completely',
    synonyms: ['change', 'convert', 'alter'],
    difficulty: 2,
    commonContexts: ['magic', 'development', 'change', 'robot'],
    exampleSentence: 'The wizard can transform into a hawk.'
  },
  {
    word: 'MODIFY',
    type: 'verbal',
    category: 'change-adjust',
    definition: 'To change slightly; adjust',
    synonyms: ['adjust', 'alter', 'adapt'],
    difficulty: 2,
    commonContexts: ['plan', 'design', 'vehicle', 'rule'],
    exampleSentence: 'We need to modify the plan based on new information.'
  },
  {
    word: 'EXPAND',
    type: 'verbal',
    category: 'change-grow',
    definition: 'To grow larger or increase',
    synonyms: ['grow', 'enlarge', 'increase'],
    difficulty: 2,
    commonContexts: ['size', 'territory', 'knowledge', 'gas'],
    exampleSentence: 'The kingdom continued to expand its borders.'
  },
  {
    word: 'DIMINISH',
    type: 'verbal',
    category: 'change-shrink',
    definition: 'To become smaller or less',
    synonyms: ['decrease', 'reduce', 'lessen'],
    difficulty: 2,
    commonContexts: ['size', 'power', 'supply', 'hope'],
    exampleSentence: 'The dragon\'s power began to diminish with age.'
  },
  {
    word: 'RESTORE',
    type: 'verbal',
    category: 'change-fix',
    definition: 'To bring back to original condition',
    synonyms: ['repair', 'renew', 'fix'],
    difficulty: 2,
    commonContexts: ['building', 'health', 'order', 'system'],
    exampleSentence: 'The heroes must restore balance to the realm.'
  },

  // INTENSITY & DEGREE
  {
    word: 'INTENSE',
    type: 'verbal',
    category: 'intensity-strong',
    definition: 'Very strong or extreme',
    synonyms: ['extreme', 'severe', 'powerful'],
    difficulty: 2,
    commonContexts: ['feeling', 'heat', 'light', 'competition'],
    exampleSentence: 'The intense heat of the lava made them step back.'
  },
  {
    word: 'MILD',
    type: 'verbal',
    category: 'intensity-weak',
    definition: 'Not strong or harsh; gentle',
    synonyms: ['gentle', 'soft', 'moderate'],
    difficulty: 1,
    commonContexts: ['weather', 'flavor', 'punishment', 'manner'],
    exampleSentence: 'The mild winter made travel much easier.'
  },
  {
    word: 'EXTREME',
    type: 'verbal',
    category: 'intensity-very',
    definition: 'Very great or severe',
    synonyms: ['severe', 'intense', 'drastic'],
    difficulty: 2,
    commonContexts: ['weather', 'sport', 'measure', 'condition'],
    exampleSentence: 'The extreme cold froze the waterfall solid.'
  },

  // COMMUNICATION
  {
    word: 'COMMUNICATE',
    type: 'verbal',
    category: 'communication-share',
    definition: 'To share information or feelings',
    synonyms: ['share', 'convey', 'express'],
    difficulty: 2,
    commonContexts: ['message', 'idea', 'signal', 'language'],
    exampleSentence: 'The dolphins communicate using special sounds.'
  },
  {
    word: 'PERSUADE',
    type: 'verbal',
    category: 'communication-convince',
    definition: 'To convince someone to do something',
    synonyms: ['convince', 'influence', 'sway'],
    difficulty: 2,
    commonContexts: ['argument', 'negotiation', 'decision', 'debate'],
    exampleSentence: 'She tried to persuade the guard to let them pass.'
  },
  {
    word: 'INQUIRE',
    type: 'verbal',
    category: 'communication-ask',
    definition: 'To ask for information',
    synonyms: ['ask', 'question', 'investigate'],
    difficulty: 2,
    commonContexts: ['question', 'investigation', 'curiosity', 'request'],
    exampleSentence: 'The detective will inquire about your whereabouts.'
  },
  {
    word: 'DECLARE',
    type: 'verbal',
    category: 'communication-announce',
    definition: 'To announce officially',
    synonyms: ['announce', 'proclaim', 'state'],
    difficulty: 2,
    commonContexts: ['announcement', 'war', 'independence', 'winner'],
    exampleSentence: 'The king will declare the winner of the tournament.'
  },

  // PERMISSION & RESTRICTION
  {
    word: 'PERMIT',
    type: 'verbal',
    category: 'permission-allow',
    definition: 'To allow',
    synonyms: ['allow', 'authorize', 'enable'],
    difficulty: 2,
    commonContexts: ['permission', 'rule', 'access', 'entry'],
    exampleSentence: 'The guard will not permit anyone to enter without a pass.'
  },
  {
    word: 'PROHIBIT',
    type: 'verbal',
    category: 'permission-forbid',
    definition: 'To forbid; not allow',
    synonyms: ['forbid', 'ban', 'prevent'],
    difficulty: 2,
    commonContexts: ['rule', 'law', 'sign', 'restriction'],
    exampleSentence: 'The law prohibits swimming in the sacred pool.'
  },
  {
    word: 'RESTRICT',
    type: 'verbal',
    category: 'permission-limit',
    definition: 'To limit or control',
    synonyms: ['limit', 'control', 'constrain'],
    difficulty: 2,
    commonContexts: ['access', 'movement', 'use', 'area'],
    exampleSentence: 'This door restricts access to authorized personnel only.'
  },

  // SURVIVAL & DANGER
  {
    word: 'PERILOUS',
    type: 'verbal',
    category: 'danger-risky',
    definition: 'Very dangerous',
    synonyms: ['dangerous', 'hazardous', 'risky'],
    difficulty: 3,
    commonContexts: ['journey', 'situation', 'path', 'adventure'],
    exampleSentence: 'The journey through the mountains was perilous.'
  },
  {
    word: 'SECURE',
    type: 'verbal',
    category: 'danger-safe',
    definition: 'Safe and protected',
    synonyms: ['safe', 'protected', 'guarded'],
    difficulty: 2,
    commonContexts: ['location', 'connection', 'vault', 'position'],
    exampleSentence: 'The treasure is secure in the underground vault.'
  },
  {
    word: 'VULNERABLE',
    type: 'verbal',
    category: 'danger-weak',
    definition: 'Easy to hurt or attack',
    synonyms: ['exposed', 'weak', 'defenseless'],
    difficulty: 3,
    commonContexts: ['position', 'person', 'system', 'creature'],
    exampleSentence: 'The dragon is vulnerable to ice magic.'
  },
  {
    word: 'DEFEND',
    type: 'verbal',
    category: 'danger-protect',
    definition: 'To protect from harm',
    synonyms: ['protect', 'guard', 'shield'],
    difficulty: 1,
    commonContexts: ['battle', 'castle', 'person', 'territory'],
    exampleSentence: 'The knights defend the castle from invaders.'
  },

  // IMPORTANCE & VALUE
  {
    word: 'VITAL',
    type: 'verbal',
    category: 'importance-essential',
    definition: 'Extremely important; essential',
    synonyms: ['essential', 'crucial', 'critical'],
    difficulty: 2,
    commonContexts: ['information', 'organ', 'resource', 'mission'],
    exampleSentence: 'Finding water is vital for survival in the desert.'
  },
  {
    word: 'TRIVIAL',
    type: 'verbal',
    category: 'importance-unimportant',
    definition: 'Not important; minor',
    synonyms: ['unimportant', 'minor', 'insignificant'],
    difficulty: 2,
    commonContexts: ['matter', 'detail', 'problem', 'complaint'],
    exampleSentence: 'Don\'t worry about such trivial matters.'
  },
  {
    word: 'PRECIOUS',
    type: 'verbal',
    category: 'importance-valuable',
    definition: 'Very valuable or loved',
    synonyms: ['valuable', 'treasured', 'dear'],
    difficulty: 2,
    commonContexts: ['gem', 'time', 'memory', 'object'],
    exampleSentence: 'The precious jewel was guarded day and night.'
  },
  {
    word: 'WORTHLESS',
    type: 'verbal',
    category: 'importance-valueless',
    definition: 'Having no value or use',
    synonyms: ['valueless', 'useless', 'futile'],
    difficulty: 2,
    commonContexts: ['object', 'currency', 'effort', 'promise'],
    exampleSentence: 'The fake map turned out to be worthless.'
  },

  // DIFFICULTY & EASE
  {
    word: 'COMPLEX',
    type: 'verbal',
    category: 'difficulty-hard',
    definition: 'Complicated; having many parts',
    synonyms: ['complicated', 'intricate', 'elaborate'],
    difficulty: 2,
    commonContexts: ['puzzle', 'system', 'problem', 'machine'],
    exampleSentence: 'The lock had a complex mechanism with many gears.'
  },
  {
    word: 'SIMPLE',
    type: 'verbal',
    category: 'difficulty-easy',
    definition: 'Easy; not complicated',
    synonyms: ['easy', 'basic', 'straightforward'],
    difficulty: 1,
    commonContexts: ['task', 'design', 'answer', 'life'],
    exampleSentence: 'The solution was surprisingly simple.'
  },
  {
    word: 'EFFORTLESS',
    type: 'verbal',
    category: 'difficulty-easy',
    definition: 'Requiring no effort; very easy',
    synonyms: ['easy', 'smooth', 'natural'],
    difficulty: 2,
    commonContexts: ['movement', 'victory', 'skill', 'grace'],
    exampleSentence: 'The master made the difficult trick look effortless.'
  },

  // SUCCESS & FAILURE
  {
    word: 'TRIUMPH',
    type: 'verbal',
    category: 'success-victory',
    definition: 'A great victory or achievement',
    synonyms: ['victory', 'success', 'win'],
    difficulty: 2,
    commonContexts: ['battle', 'competition', 'challenge', 'achievement'],
    exampleSentence: 'The team celebrated their triumph over the enemy.'
  },
  {
    word: 'DEFEAT',
    type: 'verbal',
    category: 'success-loss',
    definition: 'To win against; or a loss',
    synonyms: ['beat', 'conquer', 'overcome'],
    difficulty: 1,
    commonContexts: ['battle', 'competition', 'enemy', 'challenge'],
    exampleSentence: 'The heroes managed to defeat the evil sorcerer.'
  },
  {
    word: 'ACCOMPLISH',
    type: 'verbal',
    category: 'success-achieve',
    definition: 'To complete successfully',
    synonyms: ['achieve', 'complete', 'finish'],
    difficulty: 2,
    commonContexts: ['goal', 'task', 'mission', 'dream'],
    exampleSentence: 'You must accomplish three tasks to prove yourself.'
  },

  // MOVEMENT & SPEED
  {
    word: 'SWIFT',
    type: 'verbal',
    category: 'movement-fast',
    definition: 'Very fast',
    synonyms: ['fast', 'quick', 'rapid'],
    difficulty: 2,
    commonContexts: ['movement', 'action', 'creature', 'change'],
    exampleSentence: 'The swift fox escaped before they could catch it.'
  },
  {
    word: 'GRADUAL',
    type: 'verbal',
    category: 'movement-slow',
    definition: 'Happening slowly over time',
    synonyms: ['slow', 'steady', 'progressive'],
    difficulty: 2,
    commonContexts: ['change', 'slope', 'improvement', 'decline'],
    exampleSentence: 'The gradual rise in temperature melted the ice.'
  },
  {
    word: 'STATIONARY',
    type: 'verbal',
    category: 'movement-still',
    definition: 'Not moving; still',
    synonyms: ['still', 'motionless', 'fixed'],
    difficulty: 2,
    commonContexts: ['object', 'vehicle', 'position', 'target'],
    exampleSentence: 'The guard remained stationary at his post.'
  },
];

// Combine all vocabulary
export const ALL_VOCABULARY: VocabularyWord[] = [
  ...SPELLING_WORDS,
  ...VERBAL_WORDS,
];

// Helper functions for vocabulary selection
export function getVocabularyByCategory(category: string): VocabularyWord[] {
  return ALL_VOCABULARY.filter(word => word.category === category);
}

export function getVocabularyByDifficulty(difficulty: 1 | 2 | 3): VocabularyWord[] {
  return ALL_VOCABULARY.filter(word => word.difficulty === difficulty);
}

export function getVocabularyByContext(context: string): VocabularyWord[] {
  return ALL_VOCABULARY.filter(word =>
    word.commonContexts.some(ctx =>
      ctx.toLowerCase().includes(context.toLowerCase())
    )
  );
}

export function getRandomVocabulary(count: number, type?: 'spelling' | 'verbal'): VocabularyWord[] {
  const pool = type ? ALL_VOCABULARY.filter(w => w.type === type) : ALL_VOCABULARY;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function selectVocabularyForStory(
  storyTheme: string,
  count: number = 10,
  spellingRatio: number = 0.4 // 40% spelling, 60% verbal
): VocabularyWord[] {
  // Get context-relevant words
  const contextWords = getVocabularyByContext(storyTheme);

  // Calculate how many of each type
  const spellingCount = Math.ceil(count * spellingRatio);
  const verbalCount = count - spellingCount;

  // Get spelling words (mix of context-relevant and random)
  const spellingPool = SPELLING_WORDS;
  const contextSpelling = contextWords.filter(w => w.type === 'spelling');
  const randomSpelling = spellingPool.filter(w => !contextSpelling.includes(w));

  const selectedSpelling = [
    ...contextSpelling.slice(0, Math.min(2, spellingCount)),
    ...randomSpelling.sort(() => Math.random() - 0.5).slice(0, spellingCount - Math.min(2, spellingCount))
  ];

  // Get verbal words (prioritize context-relevant)
  const verbalPool = VERBAL_WORDS;
  const contextVerbal = contextWords.filter(w => w.type === 'verbal');
  const randomVerbal = verbalPool.filter(w => !contextVerbal.includes(w));

  const selectedVerbal = [
    ...contextVerbal.slice(0, Math.min(5, verbalCount)),
    ...randomVerbal.sort(() => Math.random() - 0.5).slice(0, Math.max(0, verbalCount - 5))
  ];

  return [...selectedSpelling, ...selectedVerbal].slice(0, count);
}

// Category mapping for story themes
export const THEME_TO_CONTEXTS: Record<string, string[]> = {
  'cyber': ['technology', 'computer', 'digital', 'robot', 'space'],
  'forest': ['nature', 'magic', 'creature', 'exploration', 'adventure'],
  'space': ['space', 'technology', 'exploration', 'science', 'adventure'],
  'underwater': ['ocean', 'water', 'exploration', 'creature', 'discovery'],
  'dungeon': ['ancient', 'temple', 'adventure', 'puzzle', 'treasure'],
  'mystery': ['detective', 'investigation', 'puzzle', 'secret', 'evidence'],
  'magic': ['magic', 'wizard', 'spell', 'ancient', 'power'],
  'adventure': ['adventure', 'quest', 'journey', 'exploration', 'challenge'],
};
