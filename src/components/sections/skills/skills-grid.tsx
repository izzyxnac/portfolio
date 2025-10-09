'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SkillsGridProps {
  children: ReactNode;
  className?: string;
}

export const SkillsGrid = ({ children, className = '' }: SkillsGridProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className={`grid grid-cols-1 gap-4 sm:grid-cols-1 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 ${className} `}
      role='grid'
      aria-label='Skills categories grid'
    >
      {children}
    </motion.div>
  );
};
