'use client';

import { motion } from 'framer-motion';
import { World } from '@/types/story';

interface WorldBookCardProps {
  world: World;
  onClick: () => void;
}

export default function WorldBookCard({ world, onClick }: WorldBookCardProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={world.locked}
      className={`
        relative group
        ${world.locked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
      `}
      whileHover={!world.locked ? { y: -8, rotateY: -5 } : {}}
      whileTap={!world.locked ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Book Container */}
      <div className="relative w-full aspect-[3/4]">
        {/* Book Shadow */}
        <div className="absolute inset-0 bg-black/20 blur-xl translate-y-4 scale-95 rounded-lg" />

        {/* Book Body */}
        <div className={`
          relative h-full w-full
          bg-gradient-to-br ${world.coverGradient}
          rounded-r-xl rounded-l-sm
          shadow-2xl
          border-r-8 border-black/20
          ${!world.locked && 'group-hover:shadow-accent/50'}
          transition-all duration-300
        `}>
          {/* Book Spine Effect */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-black/10 rounded-l-sm" />
          <div className="absolute left-2 top-0 bottom-0 w-1 bg-white/20" />

          {/* Book Content */}
          <div className="relative h-full p-8 flex flex-col justify-between">
            {/* Emoji Icon */}
            <div className="text-6xl mb-4 filter drop-shadow-lg">
              {world.emoji}
            </div>

            {/* Title */}
            <div className="flex-1 flex items-center">
              <h3 className="text-3xl font-display font-bold text-white leading-tight drop-shadow-lg">
                {world.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm font-display font-medium text-white/90 drop-shadow-md">
              {world.description}
            </p>

            {/* Lock Badge */}
            {world.locked && (
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm rounded-full p-3">
                <span className="text-2xl">🔒</span>
              </div>
            )}

            {/* New/Play Badge */}
            {!world.locked && (
              <motion.div
                className="absolute -top-3 -right-3 bg-yellow text-black font-display font-bold text-sm px-4 py-2 rounded-full shadow-lg"
                animate={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                PLAY NOW
              </motion.div>
            )}
          </div>

          {/* Book Pages Effect */}
          <div className="absolute right-0 top-2 bottom-2 w-1 bg-white/40 mr-2" />
          <div className="absolute right-0 top-3 bottom-3 w-1 bg-white/30 mr-3" />
          <div className="absolute right-0 top-4 bottom-4 w-1 bg-white/20 mr-4" />
        </div>

        {/* Hover Glow Effect */}
        {!world.locked && (
          <div className={`
            absolute inset-0 rounded-r-xl rounded-l-sm
            bg-gradient-to-br ${world.coverGradient}
            opacity-0 group-hover:opacity-30
            blur-xl
            transition-opacity duration-300
            pointer-events-none
          `} />
        )}
      </div>
    </motion.button>
  );
}
