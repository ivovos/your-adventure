'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VocabWordProps {
  word: string;
  definition: string;
}

export default function VocabWord({ word, definition }: VocabWordProps) {
  const [showDefinition, setShowDefinition] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowDefinition(true)}
        className="underline decoration-accent decoration-2 underline-offset-2 hover:decoration-accent-hover transition-colors cursor-pointer"
      >
        {word}
      </button>

      <AnimatePresence>
        {showDefinition && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDefinition(false)}
          >
            <motion.div
              className="bg-background rounded-2xl p-6 max-w-md w-full shadow-2xl border-2 border-accent"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Word */}
              <h3 className="text-2xl font-display font-bold mb-3 text-accent">
                {word}
              </h3>

              {/* Definition */}
              <p className="text-lg leading-relaxed mb-6">
                {definition}
              </p>

              {/* Close Button */}
              <button
                onClick={() => setShowDefinition(false)}
                className="btn-secondary w-full"
              >
                Got it!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
