'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DiceRollConfig } from '@/types/story';

interface DiceRollerProps {
  config: DiceRollConfig;
  onResult: (success: boolean, nextNodeId: string) => void;
}

export default function DiceRoller({ config, onResult }: DiceRollerProps) {
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [hasRolled, setHasRolled] = useState(false);

  const rollDice = () => {
    setIsRolling(true);
    setHasRolled(false);

    // Animate rolling
    let rolls = 0;
    const maxRolls = 10;
    const interval = setInterval(() => {
      setResult(Math.floor(Math.random() * config.diceType) + 1);
      rolls++;

      if (rolls >= maxRolls) {
        clearInterval(interval);
        const finalResult = Math.floor(Math.random() * config.diceType) + 1;
        setResult(finalResult);
        setIsRolling(false);
        setHasRolled(true);

        // Determine success or failure
        setTimeout(() => {
          const success = finalResult >= config.targetNumber;
          const nextNodeId = success
            ? config.successNodeId
            : config.failureNodeId;
          onResult(success, nextNodeId);
        }, 1500);
      }
    }, 100);
  };

  const isSuccess = result !== null && result >= config.targetNumber;

  return (
    <div className="my-8 p-6 md:p-8 bg-purple/5 rounded-3xl border-2 border-purple">
      <p className="text-base md:text-lg mb-6 font-display font-semibold text-center text-text-primary">
        🎲 {config.description}
      </p>

      <div className="flex flex-col items-center gap-6">
        {/* Dice Display */}
        <motion.div
          className={`w-28 h-28 rounded-3xl flex items-center justify-center text-6xl font-bold border-4 shadow-lg ${
            hasRolled
              ? isSuccess
                ? 'bg-accent border-accent text-black'
                : 'bg-red-50 border-red-400 text-red-700'
              : 'bg-white border-purple text-text-primary'
          }`}
          animate={
            isRolling
              ? {
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }
              : {}
          }
          transition={{
            duration: 0.1,
            repeat: isRolling ? Infinity : 0,
          }}
        >
          {result || '?'}
        </motion.div>

        {/* Result Message */}
        {hasRolled && result !== null && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xl md:text-2xl font-display font-bold ${
              isSuccess ? 'text-black' : 'text-red-700'
            }`}
          >
            {isSuccess
              ? `🎉 Success! You rolled ${result}!`
              : `😅 Not quite... you rolled ${result}`}
          </motion.p>
        )}

        {/* Roll Button */}
        {!hasRolled && (
          <button
            onClick={rollDice}
            disabled={isRolling}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            {isRolling ? '🎲 Rolling...' : '🎲 Roll the Dice'}
          </button>
        )}
      </div>
    </div>
  );
}
