import { useEffect } from 'react';
import { useStoryStore } from './store';
import { PlayerState } from '@/types/story';

const STORAGE_KEY = 'your-adventure-progress';

export function useSaveProgress() {
  const state = useStoryStore();

  useEffect(() => {
    const saveState: PlayerState & { currentWorldId: string; generatedWorlds: any[] } = {
      currentNodeId: state.currentNodeId,
      inventory: state.inventory,
      visitedNodes: state.visitedNodes,
      answeredQuestions: state.answeredQuestions,
      quizAnswers: state.quizAnswers,
      lastUpdated: state.lastUpdated,
      currentWorldId: state.currentWorldId,
      generatedWorlds: state.generatedWorlds,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saveState));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }, [
    state.currentNodeId,
    state.inventory,
    state.visitedNodes,
    state.answeredQuestions,
    state.quizAnswers,
    state.lastUpdated,
    state.currentWorldId,
    state.generatedWorlds,
  ]);
}

export function loadSavedProgress(): (PlayerState & { currentWorldId?: string; generatedWorlds?: any[] }) | null {
  if (typeof window === 'undefined') return null;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load progress:', error);
  }

  return null;
}

export function hasSavedProgress(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEY) !== null;
}

export function clearSavedProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
