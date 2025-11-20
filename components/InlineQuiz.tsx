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
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const quizRef = useRef<HTMLDivElement>(null);
  const isCompleted = selectedChoiceId !== null;

  // Auto-scroll to center quiz when it appears
  useEffect(() => {
    if (!isCompleted && quizRef.current) {
      setTimeout(() => {
        quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [isCompleted]);

  const handleChoiceClick = (choice: Choice) => {
    if (isCompleted) return;

    // Check if item is required
    if (choice.requiresItem && !inventory.includes(choice.requiresItem)) {
      return;
    }

    setActiveChoice(choice);
    setIsExpanded(true);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowExplanation(false);

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

  const handleAnswerClick = (answer: string) => {
    if (isCorrect !== null) return; // Already answered

    const challenge = activeChoice?.educationalChallenge;
    if (!challenge) return;

    setSelectedAnswer(answer);
    const correct = answer === challenge.correctAnswer;

    // Animate check
    setTimeout(() => {
      setIsCorrect(correct);
      setShowExplanation(true);
    }, 300);
  };

  const handleContinue = () => {
    if (activeChoice) {
      handleComplete(activeChoice);
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
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowExplanation(false);
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
            {/* Back Button - only show if not answered */}
            {isCorrect === null && (
              <motion.button
                onClick={handleBack}
                className="fixed top-6 left-6 z-50 w-12 h-12 bg-background-subtle rounded-full flex items-center justify-center border-2 border-gray-300 hover:border-gray-600 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <span className="text-xl">←</span>
              </motion.button>
            )}

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
                  {/* Question */}
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-center">
                    {activeChoice.educationalChallenge.question}
                  </h2>

                  {/* Answer Options */}
                  <div className="space-y-3 mb-8">
                    {activeChoice.educationalChallenge.options?.map((option, idx) => {
                      const isSelected = selectedAnswer === option;
                      const isCorrectAnswer = option === activeChoice.educationalChallenge!.correctAnswer;
                      const showAsCorrect = isSelected && isCorrect === true;
                      const showAsIncorrect = isSelected && isCorrect === false;

                      return (
                        <motion.button
                          key={idx}
                          onClick={() => handleAnswerClick(option)}
                          disabled={isCorrect !== null}
                          className={`
                            w-full p-4 rounded-xl border-2 text-left transition-all
                            flex items-center gap-4
                            ${showAsCorrect
                              ? 'bg-accent/10 border-accent'
                              : showAsIncorrect
                              ? 'bg-red-50 border-red-400'
                              : isSelected
                              ? 'border-gray-600 bg-gray-50'
                              : 'border-gray-400 hover:border-gray-600 hover:bg-gray-50'
                            }
                            ${isCorrect !== null ? 'cursor-default' : 'cursor-pointer'}
                          `}
                          whileHover={isCorrect === null ? { x: 4 } : {}}
                          whileTap={isCorrect === null ? { scale: 0.99 } : {}}
                        >
                          {/* Number Circle */}
                          <div className={`
                            flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-display font-bold text-sm
                            ${showAsCorrect
                              ? 'bg-accent border-accent text-black'
                              : showAsIncorrect
                              ? 'bg-red-400 border-red-400 text-white'
                              : 'bg-white border-gray-400'
                            }
                          `}>
                            {idx + 1}
                          </div>

                          {/* Option Text */}
                          <span className="font-display font-semibold text-lg flex-1">
                            {option}
                          </span>

                          {/* Check/X Mark */}
                          {showAsCorrect && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-2xl"
                            >
                              ✓
                            </motion.span>
                          )}
                          {showAsIncorrect && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-2xl"
                            >
                              ✗
                            </motion.span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Feedback Message */}
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-6 rounded-xl mb-6 ${
                        isCorrect
                          ? 'bg-accent/10 border-2 border-accent'
                          : 'bg-red-50 border-2 border-red-400'
                      }`}
                    >
                      <p className="font-display font-bold text-xl mb-3">
                        {isCorrect ? 'Correct!' : 'Try again'}
                      </p>
                      {isCorrect && activeChoice.educationalChallenge.explanation && (
                        <p className="text-base leading-relaxed">
                          {activeChoice.educationalChallenge.explanation}
                        </p>
                      )}
                    </motion.div>
                  )}

                  {/* Continue Button */}
                  {isCorrect === true && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={handleContinue}
                      className="btn-primary w-full"
                    >
                      Continue
                    </motion.button>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
