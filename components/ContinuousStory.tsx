'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { StoryNode } from '@/types/story';
import InlineQuiz from './InlineQuiz';
import DiceRoller from './DiceRoller';
import StoryText from './StoryText';

interface StoryPart {
  type: 'text' | 'quiz' | 'dice' | 'ending' | 'items';
  node: StoryNode;
  quizIndex?: number;
}

interface ContinuousStoryProps {
  nodeStack: string[];
  nodes: Record<string, StoryNode>;
  inventory: string[];
  quizAnswers: Array<{ choiceId: string; quizIndex: number }>;
  onChoiceComplete: (quizIndex: number, choiceId: string, nextNodeId: string) => void;
  onDiceResult: (success: boolean, nextNodeId: string) => void;
  onItemsGained: (items: string[]) => void;
}

export default function ContinuousStory({
  nodeStack,
  nodes,
  inventory,
  quizAnswers,
  onChoiceComplete,
  onDiceResult,
  onItemsGained,
}: ContinuousStoryProps) {
  const newTextRef = useRef<HTMLDivElement>(null);
  const prevNodeStackLength = useRef(nodeStack.length);

  // Scroll to new content when stack grows
  useEffect(() => {
    if (nodeStack.length > prevNodeStackLength.current && newTextRef.current) {
      // Wait a bit for content to render, then scroll
      setTimeout(() => {
        newTextRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    }
    prevNodeStackLength.current = nodeStack.length;
  }, [nodeStack.length]);

  // Build the story parts from the node stack
  const storyParts: StoryPart[] = [];
  let quizCounter = 0;

  nodeStack.forEach((nodeId) => {
    const node = nodes[nodeId];
    if (!node) return;

    // Add text content
    storyParts.push({ type: 'text', node });

    // Add items gained if any
    if (node.itemsGained && node.itemsGained.length > 0) {
      storyParts.push({ type: 'items', node });
    }

    // Add quiz if has choices and not yet answered
    if (node.choices && node.choices.length > 0) {
      const currentQuizIndex = quizCounter;
      quizCounter++;
      storyParts.push({
        type: 'quiz',
        node,
        quizIndex: currentQuizIndex,
      });
    }

    // Add dice if present
    if (node.diceRoll) {
      storyParts.push({ type: 'dice', node });
    }

    // Add ending if present
    if (node.isEnding) {
      storyParts.push({ type: 'ending', node });
    }
  });

  // Get the selected choice for each quiz
  const getSelectedChoice = (quizIndex: number) => {
    const answer = quizAnswers.find((a) => a.quizIndex === quizIndex);
    return answer?.choiceId || null;
  };

  return (
    <div className="reading-container py-12 pb-32">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {storyParts.map((part, index) => {
          // Find the first text node that appears after the last quiz
          const lastCompletedQuizIndex = storyParts.map((p, i) => ({ ...p, originalIndex: i }))
            .filter(p => p.type === 'quiz')
            .reverse()
            .find((p, i) => {
              const quizIdx = p.quizIndex;
              return quizIdx !== undefined && quizAnswers.find(a => a.quizIndex === quizIdx);
            })?.originalIndex;

          const isNewTextAfterQuiz = part.type === 'text' &&
            lastCompletedQuizIndex !== undefined &&
            index > lastCompletedQuizIndex &&
            storyParts.slice(lastCompletedQuizIndex + 1, index).every(p => p.type !== 'text');

          switch (part.type) {
            case 'text':
              return (
                <motion.div
                  key={`text-${part.node.id}-${index}`}
                  ref={isNewTextAfterQuiz ? newTextRef : null}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="mb-8 scroll-mt-20"
                >
                  <div className="story-content whitespace-pre-line">
                    <StoryText content={part.node.content} />
                  </div>
                </motion.div>
              );

            case 'items':
              return (
                <motion.div
                  key={`items-${part.node.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="my-6 p-5 bg-blue/5 border-2 border-blue rounded-2xl"
                >
                  <p className="font-display font-semibold text-base text-text-primary">
                    📦{' '}
                    <strong>
                      Item{part.node.itemsGained!.length > 1 ? 's' : ''} acquired:
                    </strong>{' '}
                    {part.node.itemsGained!.join(', ')}
                  </p>
                </motion.div>
              );

            case 'quiz':
              if (!part.node.choices || part.quizIndex === undefined) return null;

              const selectedChoiceId = getSelectedChoice(part.quizIndex);

              return (
                <InlineQuiz
                  key={`quiz-${part.node.id}-${part.quizIndex}`}
                  choices={part.node.choices}
                  quizIndex={part.quizIndex}
                  selectedChoiceId={selectedChoiceId}
                  inventory={inventory}
                  onChoiceComplete={(choiceId, nextNodeId) => {
                    // First gain any items from this node
                    if (part.node.itemsGained) {
                      onItemsGained(part.node.itemsGained);
                    }
                    // Then complete the choice
                    onChoiceComplete(part.quizIndex!, choiceId, nextNodeId);
                  }}
                />
              );

            case 'dice':
              if (!part.node.diceRoll) return null;

              return (
                <div key={`dice-${part.node.id}-${index}`} className="my-12">
                  <DiceRoller
                    config={part.node.diceRoll}
                    onResult={(success, nextNodeId) => {
                      if (part.node.itemsGained) {
                        onItemsGained(part.node.itemsGained);
                      }
                      onDiceResult(success, nextNodeId);
                    }}
                  />
                </div>
              );

            case 'ending':
              return (
                <motion.div
                  key={`ending-${part.node.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12 text-center"
                >
                  <div className="inline-block p-8 bg-accent/10 border-3 border-accent rounded-3xl">
                    <p className="text-3xl font-display font-bold mb-3">
                      🎉 The End 🎉
                    </p>
                    <p className="text-lg text-text-secondary">
                      Great job! You&apos;ve completed this adventure.
                    </p>
                  </div>
                </motion.div>
              );

            default:
              return null;
          }
        })}
      </motion.div>
    </div>
  );
}
