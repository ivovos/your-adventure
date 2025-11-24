import { useEffect, useState } from 'react';
import { useStoryStore } from './store';

const STORAGE_KEY = 'your-adventure-storage';

export function hasSavedProgress(): boolean {
  if (typeof window === 'undefined') return false;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return false;

  try {
    const parsed = JSON.parse(saved);
    // Check if there's a valid state with a current world
    return parsed && parsed.state && parsed.state.currentWorldId;
  } catch (e) {
    return false;
  }
}

export function clearSavedProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

// Hook to safely access store values after hydration to avoid mismatches
export function useHydratedStore<T>(selector: (state: any) => T): T | null {
  const [hydrated, setHydrated] = useState(false);
  const result = useStoryStore(selector);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated ? result : null;
}
