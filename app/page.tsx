'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { hasSavedProgress, loadSavedProgress, clearSavedProgress } from '@/lib/hooks';
import { useStoryStore } from '@/lib/store';
import { gameData } from '@/lib/worlds-data';
import WorldBookCard from '@/components/WorldBookCard';

export default function Home() {
  const router = useRouter();
  const [canContinue, setCanContinue] = useState(false);
  const loadProgress = useStoryStore((state) => state.loadProgress);
  const resetProgress = useStoryStore((state) => state.resetProgress);
  const setCurrentWorld = useStoryStore((state) => state.setCurrentWorld);

  useEffect(() => {
    setCanContinue(hasSavedProgress());
  }, []);

  const handleWorldClick = (worldId: string) => {
    const world = gameData.worlds.find((w) => w.id === worldId);
    if (!world || world.locked) return;

    // Clear any previous progress and start fresh
    clearSavedProgress();
    resetProgress();
    setCurrentWorld(worldId);
    router.push('/story');
  };

  const handleContinue = () => {
    const savedProgress = loadSavedProgress();
    if (savedProgress) {
      loadProgress(savedProgress);
    }
    router.push('/story');
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 text-balance leading-none">
            Your Adventure Library
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary font-display font-semibold mb-6">
            Choose your world and start learning
          </p>

          {/* Continue Button */}
          {canContinue && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleContinue}
              className="btn-primary mb-8"
            >
              📖 Continue Your Story
            </motion.button>
          )}
        </div>

        {/* World Books Grid - Fixed 2 columns */}
        <div className="grid grid-cols-2 gap-8 md:gap-10 max-w-3xl mx-auto mb-12">
          {gameData.worlds.map((world, index) => (
            <motion.div
              key={world.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full"
            >
              <WorldBookCard
                world={world}
                onClick={() => handleWorldClick(world.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="text-center pt-8 border-t-2 border-gray-200 max-w-2xl mx-auto">
          <p className="text-base text-text-secondary font-display font-medium mb-2">
            📚 Practice Verbal Reasoning & Spelling for the Kent Test
          </p>
          <p className="text-sm text-text-secondary/70 font-display">
            Each adventure is designed to improve your vocabulary and spelling skills
          </p>
        </div>
      </motion.div>
    </main>
  );
}
