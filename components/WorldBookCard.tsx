'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
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
        relative group w-full
        ${world.locked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
      `}
      whileHover={!world.locked ? { y: -4 } : {}}
      whileTap={!world.locked ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Book Container */}
      <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
        {/* Cover Image */}
        {world.coverImage && (
          <Image
            src={world.coverImage}
            alt={world.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        )}

        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Title Overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <h3 className="text-2xl font-display font-bold text-white leading-tight text-center drop-shadow-lg">
            {world.title}
          </h3>
        </div>

        {/* Lock Badge */}
        {world.locked && (
          <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-full p-2">
            <span className="text-xl">🔒</span>
          </div>
        )}

        {/* Play Badge */}
        {!world.locked && (
          <motion.div
            className="absolute -top-2 -right-2 bg-accent text-black font-display font-bold text-xs px-3 py-1 rounded-full shadow-lg"
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            PLAY
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}
