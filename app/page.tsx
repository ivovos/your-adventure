'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { hasSavedProgress, clearSavedProgress } from '@/lib/hooks';
import { useStoryStore } from '@/lib/store';
import { gameData } from '@/lib/worlds-data';
import WorldBookCard from '@/components/WorldBookCard';

export default function Home() {
  const router = useRouter();
  const [canContinue, setCanContinue] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const resetProgress = useStoryStore((state) => state.resetProgress);
  const setCurrentWorld = useStoryStore((state) => state.setCurrentWorld);
  const generatedWorlds = useStoryStore((state) => state.generatedWorlds);
  const currentWorldId = useStoryStore((state) => state.currentWorldId);

  useEffect(() => {
    setCanContinue(hasSavedProgress());
    setIsHydrated(true);
  }, []);

  const handleWorldClick = (worldId: string) => {
    // Look in both static and generated worlds
    const world = [...gameData.worlds, ...generatedWorlds].find((w) => w.id === worldId);
    if (!world) return;

    // Clear any previous progress and start fresh
    // We don't need to clearSavedProgress() from localStorage anymore as zustand handles it
    // But we might want to reset the store state for a new run
    resetProgress();
    setCurrentWorld(worldId);
    router.push('/story');
  };

  const handleContinue = () => {
    // With zustand persist, the state is already loaded.
    // We just need to ensure we have a valid world ID
    if (currentWorldId) {
      router.push('/story');
    } else {
      // Fallback if something is wrong
      router.push('/');
    }
  };

  // Combine static and generated worlds
  // Only show generated worlds after hydration to avoid server/client mismatch
  const allWorlds = isHydrated
    ? [...gameData.worlds, ...generatedWorlds]
    : [...gameData.worlds];

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
          {allWorlds
            .sort((a, b) => {
              // Sort by last played if hydrated
              if (!isHydrated) return 0;
              if (a.id === currentWorldId) return -1;
              if (b.id === currentWorldId) return 1;
              return 0;
            })
            .map((world, index) => {
              const isLastPlayed = isHydrated && currentWorldId === world.id;

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
