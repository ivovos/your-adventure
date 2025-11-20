export type EducationalSubject = 'verbal-reasoning' | 'spelling';

export interface EducationalChallenge {
  subject: EducationalSubject;
  question: string;
  options?: string[];
  correctAnswer: string;
  hint?: string;
  explanation?: string;
}

export interface DiceRollConfig {
  description: string;
  successNodeId: string;
  failureNodeId: string;
  targetNumber: number;
  diceType: 6 | 20; // d6 or d20
}

export interface Choice {
  id: string;
  text: string;
  nextNodeId: string;
  educationalChallenge?: EducationalChallenge;
  requiresItem?: string;
}

export interface StoryNode {
  id: string;
  title?: string;
  content: string;
  choices?: Choice[];
  diceRoll?: DiceRollConfig;
  itemsGained?: string[];
  isEnding?: boolean;
}

export interface QuizAnswer {
  choiceId: string;
  quizIndex: number;
}

export interface PlayerState {
  currentNodeId: string;
  inventory: string[];
  visitedNodes: string[];
  answeredQuestions: string[];
  quizAnswers: QuizAnswer[];
  lastUpdated: number;
}

export interface StoryData {
  title: string;
  description: string;
  startNodeId: string;
  nodes: Record<string, StoryNode>;
}

export interface World {
  id: string;
  title: string;
  description: string;
  emoji: string;
  coverColor: string;
  coverGradient: string;
  coverImage?: string;
  locked: boolean;
  storyData?: StoryData;
}

export interface GameData {
  worlds: World[];
}
