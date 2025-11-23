'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
  const generatedWorlds = useStoryStore((state) => state.generatedWorlds);

  useEffect(() => {
    setCanContinue(hasSavedProgress());
  }, []);

  const handleWorldClick = (worldId: string) => {
    const world = gameData.worlds.find((w) => w.id === worldId);
    if (!world) return;

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

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-4 mb-12">
            <Link href="/create" className="w-full max-w-md">
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="btn-secondary w-full border-accent border-2 text-black hover:bg-accent/5"
              >
                ✨ Create Your Own Story
              </motion.button>
            </Link>
          </div>
        </div>

        {/* World Books Grid - Fixed 2 columns */}
        <div className="grid grid-cols-2 gap-8 md:gap-10 max-w-3xl mx-auto mb-12">
          {[...gameData.worlds, ...generatedWorlds]
            .sort((a, b) => {
              const savedProgress = loadSavedProgress();
              const lastPlayedId = savedProgress?.currentWorldId;
              if (a.id === lastPlayedId) return -1;
              if (b.id === lastPlayedId) return 1;
              return 0;
            })
            .map((world, index) => {
              const savedProgress = loadSavedProgress();
              const isLastPlayed = savedProgress?.currentWorldId === world.id;

              return (
                <motion.div
                  key={world.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-full relative"
                >

                  <WorldBookCard
                    world={world}
                    onClick={() => {
                      if (isLastPlayed) {
                        handleContinue();
                      } else {
                        handleWorldClick(world.id);
                      }
                    }}
                  />
                </motion.div>
              );
            })}
        </div>



      </motion.div>
    </main>
  );
}
