// src/components/MemoryCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface MemoryCardProps {
  date: string;
  description: string;
  image: string;
  isActive: boolean;
  position: 'left' | 'center' | 'right';
}

const MemoryCard: React.FC<MemoryCardProps> = ({
  date,
  description,
  image,
  isActive,
  position,
}) => {
  const variants = {
    left: { x: '-100%', scale: 0.8, opacity: 0.5 },
    center: { x: 0, scale: 1, opacity: 1 },
    right: { x: '100%', scale: 0.8, opacity: 0.5 },
  };

  return (
    <motion.div
      className="absolute w-full max-w-xl"
      initial={false}
      animate={position}
      variants={variants}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105">
        <div className="relative h-96">
          <img
            src={image}
            alt={date}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-8 text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5" />
              <h3 className="text-2xl font-bold">{date}</h3>
            </div>
            <p className="text-lg">{description}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MemoryCard;