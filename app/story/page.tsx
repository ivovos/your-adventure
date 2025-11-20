'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ContinuousStory from '@/components/ContinuousStory';
import { useStoryStore } from '@/lib/store';
import { useSaveProgress } from '@/lib/hooks';
import { gameData } from '@/lib/worlds-data';

export default function Story() {
  const router = useRouter();
  const nodeStack = useStoryStore((state) => state.nodeStack);
  const currentWorldId = useStoryStore((state) => state.currentWorldId);
  const inventory = useStoryStore((state) => state.inventory);
  const quizAnswers = useStoryStore((state) => state.quizAnswers);
  const addNodeToStack = useStoryStore((state) => state.addNodeToStack);
  const addToInventory = useStoryStore((state) => state.addToInventory);
  const addQuizAnswer = useStoryStore((state) => state.addQuizAnswer);

  const generatedWorlds = useStoryStore((state) => state.generatedWorlds);

  // Auto-save progress
  useSaveProgress();

  // Get current world
  const currentWorld = gameData.worlds.find((w) => w.id === currentWorldId) ||
    generatedWorlds.find((w) => w.id === currentWorldId);
  const storyData = currentWorld?.storyData;

  useEffect(() => {
    // If no valid world, redirect to home
    if (!currentWorld || !storyData) {
      router.push('/');
    }
  }, [currentWorld, storyData, router]);

  const handleChoiceComplete = (quizIndex: number, choiceId: string, nextNodeId: string) => {
    // Record the quiz answer
    addQuizAnswer({ quizIndex, choiceId });
    // Navigate to next node
    addNodeToStack(nextNodeId);
  };

  const handleDiceResult = (_success: boolean, nextNodeId: string) => {
    addNodeToStack(nextNodeId);
  };

  const handleItemsGained = (items: string[]) => {
    items.forEach((item) => addToInventory(item));
  };

  if (!currentWorld || !storyData) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-gray-200 bg-background sticky top-0 z-10 backdrop-blur-lg bg-background/95">
        <div className="reading-container py-4 flex justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="text-accent hover:text-accent-hover font-display text-base font-bold transition-colors"
          >
            ← Home
          </button>
          <h2 className="text-sm font-display font-semibold text-text-secondary">
            {currentWorld.emoji} {storyData.title}
          </h2>
        </div>
      </header>

      {/* Continuous Story */}
      <ContinuousStory
        nodeStack={nodeStack}
        nodes={storyData.nodes}
        inventory={inventory}
        quizAnswers={quizAnswers}
        onChoiceComplete={handleChoiceComplete}
        onDiceResult={handleDiceResult}
        onItemsGained={handleItemsGained}
        title={storyData.title}
        emoji={currentWorld.emoji}
      />

      {/* Inventory Display - Fixed at bottom */}
      {inventory.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t-2 border-gray-200 py-4 z-20">
          <div className="reading-container">
            <p className="font-display font-semibold text-sm text-text-secondary mb-2">
              🎒 Your Inventory
            </p>
            <div className="flex flex-wrap gap-2">
              {inventory.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-background-subtle border-2 border-gray-200 rounded-full text-xs font-display font-semibold"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
