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
      className="relative group w-full cursor-pointer"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
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
      </div>
    </motion.button >
  );
}
