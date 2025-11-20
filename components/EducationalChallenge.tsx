'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EducationalChallenge as ChallengeType } from '@/types/story';

interface EducationalChallengeProps {
  challenge: ChallengeType;
  onCorrect: () => void;
}

export default function EducationalChallenge({
  challenge,
  onCorrect,
}: EducationalChallengeProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const correct = selectedAnswer === challenge.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);
  };

  const handleContinue = () => {
    if (isCorrect) {
      onCorrect();
    } else {
      // Reset for retry
      setShowExplanation(false);
      setIsCorrect(null);
      setSelectedAnswer(null);
    }
  };

  return (
    <div className="my-8 p-6 md:p-8 bg-accent/5 rounded-3xl border-2 border-accent relative">
      {/* Challenge Header */}
      <div className="mb-6">
        <div className="inline-block px-4 py-2 bg-accent text-black text-sm font-display font-bold rounded-full mb-4">
          {challenge.subject === 'verbal-reasoning'
            ? '🧠 Verbal Reasoning'
            : '📝 Spelling Challenge'}
        </div>
        <h3 className="text-2xl md:text-3xl font-display font-bold mb-2">
          {challenge.question}
        </h3>
      </div>

      {/* Options */}
      {challenge.options && (
        <div className="space-y-3 mb-6">
          {challenge.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showExplanation && setSelectedAnswer(option)}
              disabled={showExplanation}
              className={`w-full text-left px-6 py-4 rounded-2xl font-display font-semibold text-base md:text-lg transition-all border-2 ${selectedAnswer === option
                  ? 'bg-accent text-black border-accent scale-98'
                  : 'bg-white border-gray-200 hover:border-accent hover:bg-background-subtle'
                } ${showExplanation ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              <span className="flex items-center justify-between">
                <span>{option}</span>
                {selectedAnswer === option && (
                  <span className="text-xl">●</span>
                )}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Hint */}
      {challenge.hint && !showExplanation && (
        <div className="mb-6">
          {!showHint ? (
            <button
              onClick={() => setShowHint(true)}
              className="text-accent hover:text-accent-hover font-display font-semibold text-base"
            >
              💡 Need a hint?
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-4 bg-yellow/10 border-2 border-yellow/30 rounded-2xl"
            >
              <p className="text-sm md:text-base font-display font-medium text-text-primary">
                💡 <strong>Hint:</strong> {challenge.hint}
              </p>
            </motion.div>
          )}
        </div>
      )}

      {/* Submit Button */}
      {!showExplanation && (
        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Answer
        </button>
      )}

      {/* Full Screen Feedback Overlay */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 ${isCorrect ? 'bg-green-500' : 'bg-red-500'
              }`}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-8 md:p-12 max-w-2xl w-full text-center shadow-2xl"
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                <span className="text-4xl">{isCorrect ? '✓' : '✗'}</span>
              </div>

              <h2 className={`text-3xl md:text-4xl font-display font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'
                }`}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </h2>

              {challenge.explanation && (
                <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                  {challenge.explanation}
                </p>
              )}

              <button
                onClick={handleContinue}
                className={`w-full py-4 rounded-xl font-display font-bold text-lg text-white transition-transform active:scale-95 ${isCorrect
                    ? 'bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200'
                    : 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200'
                  }`}
              >
                {isCorrect ? 'Continue' : 'Try Again'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
