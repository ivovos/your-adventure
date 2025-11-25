'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Choice } from '@/types/story';
import EducationalChallenge from './EducationalChallenge';

interface InlineQuizProps {
  choices: Choice[];
  quizIndex: number;
  selectedChoiceId: string | null;
  inventory: string[];
  onChoiceComplete: (choiceId: string, nextNodeId: string) => void;
}

export default function InlineQuiz({
  choices,
  quizIndex,
  selectedChoiceId,
  inventory,
  onChoiceComplete,
}: InlineQuizProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeChoice, setActiveChoice] = useState<Choice | null>(null);
  const [showChallenge, setShowChallenge] = useState(false);
  const isCompleted = selectedChoiceId !== null;

  const handleChoiceClick = (choice: Choice) => {
    if (isCompleted) return;

    // Check if item is required
    if (choice.requiresItem && !inventory.includes(choice.requiresItem)) {
      return;
    }

    setActiveChoice(choice);
    setIsExpanded(true);
    setShowChallenge(false);

    // If there's a challenge, show it
    if (choice.educationalChallenge) {
      setTimeout(() => setShowChallenge(true), 300);
    } else {
      // No challenge, complete immediately
      setTimeout(() => {
        handleComplete(choice);
      }, 500);
    }
  };

  const handleComplete = (choice: Choice) => {
    setShowChallenge(false);
    setIsExpanded(false);
    setTimeout(() => {
      onChoiceComplete(choice.id, choice.nextNodeId);
    }, 300);
  };

  const handleBack = () => {
    setShowChallenge(false);
    setIsExpanded(false);
    setActiveChoice(null);
  };

  return (
    <>
      {/* Inline Quiz View */}
      <motion.div
        ref={quizRef}
        className="my-12 scroll-mt-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {choices.map((choice, index) => {
            const isSelected = selectedChoiceId === choice.id;
            const isLocked = !!(choice.requiresItem && !inventory.includes(choice.requiresItem));

            return (
              <motion.button
                key={choice.id}
                onClick={() => handleChoiceClick(choice)}
                disabled={isCompleted || isLocked}
                className={`
                  relative p-4 rounded-xl border-2 transition-all duration-200
                  flex flex-col items-center justify-center text-center min-h-[100px]
                  ${isSelected
                    ? 'bg-accent/10 border-accent shadow-lg'
                    : 'bg-background border-gray-400 hover:border-gray-600 hover:shadow-md'
                  }
                  ${isCompleted && !isSelected ? 'opacity-40' : ''}
                  ${isLocked ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                  ${!isCompleted && !isLocked ? 'active:scale-95' : ''}
                `}
                whileHover={!isCompleted && !isLocked ? { y: -4 } : {}}
                whileTap={!isCompleted && !isLocked ? { scale: 0.98 } : {}}
              >
                {/* Number Circle */}
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-gray-200 border border-gray-400 flex items-center justify-center">
                  <span className="text-sm font-display font-bold text-text-primary">
                    {index + 1}
                  </span>
                </div>

                {/* Choice Text */}
                <p className="font-display font-bold text-lg leading-snug px-2">
                  {choice.text}
                </p>

                {/* Selected Tick */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute bottom-3 right-3 w-10 h-10 bg-accent rounded-full flex items-center justify-center"
                  >
                    <span className="text-2xl">✓</span>
                  </motion.div>
                )}

                {/* Lock Icon */}
                {isLocked && (
                  <div className="absolute top-3 right-3 text-2xl">
                    🔒
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Expanded Quiz Overlay */}
      <AnimatePresence>
        {isExpanded && activeChoice && activeChoice.educationalChallenge && (
          <motion.div
            className="fixed inset-0 z-50 bg-background overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Back Button */}
            <motion.button
              onClick={handleBack}
              className="fixed top-6 left-6 z-50 w-12 h-12 bg-background-subtle rounded-full flex items-center justify-center border-2 border-gray-300 hover:border-gray-600 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <span className="text-xl">←</span>
            </motion.button>

            {/* Quiz Content */}
            <motion.div
              className="reading-container py-24 min-h-screen flex flex-col justify-center"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {showChallenge && (
                <div className="max-w-2xl mx-auto w-full">
                  <EducationalChallenge
                    challenge={activeChoice.educationalChallenge}
                    onCorrect={() => handleComplete(activeChoice)}
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
