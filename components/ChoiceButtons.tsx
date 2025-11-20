'use client';

import { Choice } from '@/types/story';
import { motion } from 'framer-motion';

interface ChoiceButtonsProps {
  choices: Choice[];
  onChoiceSelect: (choice: Choice) => void;
  inventory: string[];
}

export default function ChoiceButtons({
  choices,
  onChoiceSelect,
  inventory,
}: ChoiceButtonsProps) {
  return (
    <div className="space-y-4 my-8">
      {choices.map((choice, index) => {
        const canSelect = !choice.requiresItem || inventory.includes(choice.requiresItem);

        return (
          <motion.button
            key={choice.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => canSelect && onChoiceSelect(choice)}
            disabled={!canSelect}
            className={`choice-button ${
              !canSelect ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {choice.text}
            {choice.requiresItem && !canSelect && (
              <span className="block text-sm text-text-secondary mt-1">
                (Requires: {choice.requiresItem})
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
