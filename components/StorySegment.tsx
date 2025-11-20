'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StoryNode, Choice } from '@/types/story';
import ChoiceButtons from './ChoiceButtons';
import DiceRoller from './DiceRoller';
import EducationalChallenge from './EducationalChallenge';

interface StorySegmentProps {
  node: StoryNode;
  inventory: string[];
  isLatest: boolean;
  onNavigate: (nodeId: string) => void;
  onItemsGained?: (items: string[]) => void;
}

export default function StorySegment({
  node,
  inventory,
  isLatest,
  onNavigate,
  onItemsGained,
}: StorySegmentProps) {
  const [showChallenge, setShowChallenge] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [isResolved, setIsResolved] = useState(false);
  const segmentRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to this segment when it becomes latest
  useEffect(() => {
    if (isLatest && segmentRef.current) {
      setTimeout(() => {
        segmentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [isLatest]);

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
    }, 1000);
  };

  const navigateToNext = (nodeId: string) => {
    // Mark this segment as resolved
    setIsResolved(true);

    // Add any items gained from this node
    if (node.itemsGained && onItemsGained) {
      onItemsGained(node.itemsGained);
    }

    // Navigate to next node
    onNavigate(nodeId);
  };

  const showInteraction = isLatest && !isResolved;

  return (
    <motion.div
      ref={segmentRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="scroll-mt-20"
    >
      <div className="reading-container py-12 min-h-[60vh]">
        {/* Title */}
        {node.title && (
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-balance">
            {node.title}
          </h1>
        )}

        {/* Story Content */}
        <div className="story-content whitespace-pre-line mb-8">{node.content}</div>

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
        {showInteraction && showChallenge && selectedChoice?.educationalChallenge && (
          <EducationalChallenge
            challenge={selectedChoice.educationalChallenge}
            onCorrect={handleChallengeComplete}
          />
        )}

        {/* Dice Roll */}
        {showInteraction && node.diceRoll && !showChallenge && (
          <DiceRoller config={node.diceRoll} onResult={handleDiceResult} />
        )}

        {/* Choices */}
        {showInteraction && node.choices && !showChallenge && !node.diceRoll && (
          <ChoiceButtons
            choices={node.choices}
            onChoiceSelect={handleChoiceSelect}
            inventory={inventory}
          />
        )}

        {/* Ending message */}
        {node.isEnding && (
          <div className="mt-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-block p-6 bg-accent/10 border-2 border-accent rounded-2xl"
            >
              <p className="text-2xl font-display font-bold mb-2">🎉 The End 🎉</p>
              <p className="text-base text-text-secondary">
                Great job! You've completed this adventure.
              </p>
            </motion.div>
          </div>
        )}
      </div>

      {/* Segment Divider (only show if not the latest or if resolved) */}
      {(!isLatest || isResolved) && !node.isEnding && (
        <div className="reading-container">
          <div className="border-t-2 border-gray-200 relative">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-background px-4">
              <span className="text-sm font-display font-semibold text-text-secondary">
                ↓
              </span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
