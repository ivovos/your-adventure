'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StoryNode, Choice } from '@/types/story';
import ChoiceButtons from './ChoiceButtons';
import DiceRoller from './DiceRoller';
import EducationalChallenge from './EducationalChallenge';
import { useStoryStore } from '@/lib/store';

interface StoryPageProps {
  node: StoryNode;
  onNavigate: (nodeId: string) => void;
}

export default function StoryPage({ node, onNavigate }: StoryPageProps) {
  const [showChallenge, setShowChallenge] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const inventory = useStoryStore((state) => state.inventory);
  const addToInventory = useStoryStore((state) => state.addToInventory);

  // Reset challenge state when node changes
  useEffect(() => {
    setShowChallenge(false);
    setSelectedChoice(null);
  }, [node.id]);

  const handleChoiceSelect = (choice: Choice) => {
    if (choice.educationalChallenge) {
      setSelectedChoice(choice);
      setShowChallenge(true);
    } else {
      navigateToNext(choice.nextNodeId);
    }
  };

  const handleChallengeComplete = () => {
    if (selectedChoice) {
      navigateToNext(selectedChoice.nextNodeId);
    }
  };

  const handleDiceResult = (_success: boolean, nextNodeId: string) => {
    setTimeout(() => {
      navigateToNext(nextNodeId);
    }, 500);
  };

  const navigateToNext = (nodeId: string) => {
    // Add any items gained from this node
    if (node.itemsGained) {
      node.itemsGained.forEach((item) => addToInventory(item));
    }
    onNavigate(nodeId);
  };

  return (
    <motion.div
      key={node.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="reading-container py-12 min-h-screen"
    >
      {/* Title */}
      {node.title && (
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-balance">
          {node.title}
        </h1>
      )}

      {/* Story Content */}
      <div className="story-content whitespace-pre-line">{node.content}</div>

      {/* Items Gained */}
      {node.itemsGained && node.itemsGained.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="my-6 p-5 bg-blue/5 border-2 border-blue rounded-2xl"
        >
          <p className="font-display font-semibold text-base text-text-primary">
            📦 <strong>Item{node.itemsGained.length > 1 ? 's' : ''} acquired:</strong>{' '}
            {node.itemsGained.join(', ')}
          </p>
        </motion.div>
      )}

      {/* Educational Challenge */}
      {showChallenge && selectedChoice?.educationalChallenge && (
        <EducationalChallenge
          challenge={selectedChoice.educationalChallenge}
          onCorrect={handleChallengeComplete}
        />
      )}

      {/* Dice Roll */}
      {node.diceRoll && !showChallenge && (
        <DiceRoller config={node.diceRoll} onResult={handleDiceResult} />
      )}

      {/* Choices */}
      {node.choices && !showChallenge && !node.diceRoll && (
        <ChoiceButtons
          choices={node.choices}
          onChoiceSelect={handleChoiceSelect}
          inventory={inventory}
        />
      )}

      {/* Ending message */}
      {node.isEnding && !node.choices && (
        <div className="mt-8 text-center">
          <p className="text-lg font-sans text-text-secondary italic">
            The End
          </p>
        </div>
      )}

      {/* Inventory Display */}
      {inventory.length > 0 && (
        <div className="mt-12 pt-6 border-t-2 border-gray-200">
          <p className="font-display font-semibold text-base text-text-secondary mb-3">
            🎒 Your Inventory
          </p>
          <div className="flex flex-wrap gap-2">
            {inventory.map((item, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-background-subtle border-2 border-gray-200 rounded-full text-sm font-display font-semibold"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
