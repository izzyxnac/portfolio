'use client';

import { motion } from 'framer-motion';

interface SkillsHeaderProps {
  isInView: boolean;
}

export const SkillsHeader = ({ isInView }: SkillsHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className='mb-12 text-center'
    >
      <h2
        id='skills-heading'
        className='mb-4 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white'
      >
        Technical Skills & Expertise
      </h2>
      <p className='mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300'>
        A comprehensive overview of my technical skills and proficiency levels across different
        domains of software development and technology.
      </p>
    </motion.div>
  );
};
