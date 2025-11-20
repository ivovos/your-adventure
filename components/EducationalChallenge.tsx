'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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

    if (correct) {
      setTimeout(() => {
        onCorrect();
      }, 2000);
    }
  };

  return (
    <div className="my-8 p-6 md:p-8 bg-accent/5 rounded-3xl border-2 border-accent">
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
              className={`w-full text-left px-6 py-4 rounded-2xl font-display font-semibold text-base md:text-lg transition-all border-2 ${
                selectedAnswer === option
                  ? 'bg-accent text-black border-accent scale-98'
                  : 'bg-white border-gray-200 hover:border-accent hover:bg-background-subtle'
              } ${showExplanation ? 'cursor-not-allowed' : ''} ${
                showExplanation && option === challenge.correctAnswer
                  ? 'bg-accent text-black border-accent'
                  : ''
              } ${
                showExplanation &&
                selectedAnswer === option &&
                option !== challenge.correctAnswer
                  ? 'bg-red-50 border-red-400 text-red-900'
                  : ''
              }`}
            >
              <span className="flex items-center justify-between">
                <span>{option}</span>
                {showExplanation && option === challenge.correctAnswer && (
                  <span className="text-2xl">✓</span>
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

      {/* Result & Explanation */}
      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-6 rounded-3xl ${
            isCorrect
              ? 'bg-accent text-black border-2 border-accent'
              : 'bg-red-50 border-2 border-red-400'
          }`}
        >
          <p
            className={`text-2xl md:text-3xl font-display font-bold mb-3 ${
              isCorrect ? 'text-black' : 'text-red-700'
            }`}
          >
            {isCorrect ? '✓ Nailed it!' : '✗ Not quite'}
          </p>
          {challenge.explanation && (
            <p className="text-base md:text-lg font-display font-medium mb-3">
              {challenge.explanation}
            </p>
          )}
          {isCorrect && (
            <p className="text-sm font-display font-medium opacity-75 mt-3">
              Moving to the next part...
            </p>
          )}
          {!isCorrect && (
            <button
              onClick={() => {
                setShowExplanation(false);
                setIsCorrect(null);
                setSelectedAnswer(null);
              }}
              className="btn-secondary mt-4"
            >
              Try Again
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}
