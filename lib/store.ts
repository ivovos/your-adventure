import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { PlayerState, QuizAnswer, World } from '@/types/story';

interface StoryStore extends PlayerState {
  currentWorldId: string;
  nodeStack: string[]; // Stack of node IDs in the order they were visited
  setCurrentWorld: (worldId: string) => void;
  setCurrentNode: (nodeId: string) => void;
  addNodeToStack: (nodeId: string) => void;
  addToInventory: (item: string) => void;
  addVisitedNode: (nodeId: string) => void;
  addAnsweredQuestion: (questionId: string) => void;
  addQuizAnswer: (quizAnswer: QuizAnswer) => void;
  resetProgress: () => void;
  // loadProgress is no longer needed with persist middleware, but keeping for compatibility if needed, 
  // though we'll likely remove usages.
  loadProgress: (state: PlayerState & { currentWorldId?: string; nodeStack?: string[] }) => void;
  generatedWorlds: World[];
  addGeneratedWorld: (world: World) => void;
}

const initialState: PlayerState & { currentWorldId: string; nodeStack: string[]; generatedWorlds: World[] } = {
  currentWorldId: 'glitched-realm',
  currentNodeId: 'start',
  nodeStack: ['start'],
  inventory: [],
  visitedNodes: [],
  answeredQuestions: [],
  quizAnswers: [],
  lastUpdated: Date.now(),
  generatedWorlds: [],
};

export const useStoryStore = create<StoryStore>()(
  persist(
    (set) => ({
      ...initialState,

      setCurrentWorld: (worldId: string) =>
        set({
          currentWorldId: worldId,
          currentNodeId: 'start',
          nodeStack: ['start'],
          inventory: [],
          visitedNodes: [],
          answeredQuestions: [],
          lastUpdated: Date.now(),
        }),

      addGeneratedWorld: (world: World) =>
        set((state) => ({
          generatedWorlds: [...state.generatedWorlds, world],
        })),

      setCurrentNode: (nodeId: string) =>
        set((state) => ({
          currentNodeId: nodeId,
          visitedNodes: [...state.visitedNodes, nodeId],
          lastUpdated: Date.now(),
        })),

      addNodeToStack: (nodeId: string) =>
        set((state) => ({
          currentNodeId: nodeId,
          nodeStack: [...state.nodeStack, nodeId],
          visitedNodes: [...state.visitedNodes, nodeId],
          lastUpdated: Date.now(),
        })),

      addToInventory: (item: string) =>
        set((state) => ({
          inventory: [...state.inventory, item],
          lastUpdated: Date.now(),
        })),

      addVisitedNode: (nodeId: string) =>
        set((state) => ({
          visitedNodes: state.visitedNodes.includes(nodeId)
            ? state.visitedNodes
            : [...state.visitedNodes, nodeId],
          lastUpdated: Date.now(),
        })),

      addAnsweredQuestion: (questionId: string) =>
        set((state) => ({
          answeredQuestions: [...state.answeredQuestions, questionId],
          lastUpdated: Date.now(),
        })),

      addQuizAnswer: (quizAnswer: QuizAnswer) =>
        set((state) => ({
          quizAnswers: [...state.quizAnswers, quizAnswer],
          lastUpdated: Date.now(),
        })),

      resetProgress: () =>
        set((state) => ({
          ...initialState,
          // Preserve generated worlds when resetting progress
          generatedWorlds: state.generatedWorlds,
        })),

      loadProgress: (state: PlayerState & { currentWorldId?: string; nodeStack?: string[]; generatedWorlds?: World[] }) =>
        set({
          ...state,
          currentWorldId: state.currentWorldId || 'glitched-realm',
          nodeStack: state.nodeStack || ['start'],
          quizAnswers: state.quizAnswers || [],
          generatedWorlds: state.generatedWorlds || [],
        }),
    }),
    {
      name: 'your-adventure-storage', // unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
      // Optional: select which parts of the state to persist
      // partialize: (state) => ({ ... }), 
    }
  )
);
