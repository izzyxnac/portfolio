'use client';

import { motion } from 'framer-motion';
import { SkillsData } from '@/lib/types/models';

interface SkillsSummaryProps {
  data: SkillsData;
  isInView: boolean;
}

export const SkillsSummary = ({ data, isInView }: SkillsSummaryProps) => {
  const totalSkills = data.categories.reduce((acc, cat) => acc + cat.skills.length, 0);

  const expertSkills = data.categories.reduce(
    (acc, cat) => acc + cat.skills.filter(skill => skill.level === 'expert').length,
    0
  );

  const trendingSkills = data.categories.reduce(
    (acc, cat) => acc + cat.skills.filter(skill => skill.trending).length,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className='mt-12 text-center'
    >
      <div className='mx-auto grid max-w-2xl grid-cols-2 gap-4 md:grid-cols-4'>
        <div className='rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800'>
          <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
            {data.categories.length}
          </div>
          <div className='text-sm text-gray-600 dark:text-gray-300'>Categories</div>
        </div>
        <div className='rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800'>
          <div className='text-2xl font-bold text-green-600 dark:text-green-400'>{totalSkills}</div>
          <div className='text-sm text-gray-600 dark:text-gray-300'>Total Skills</div>
        </div>
        <div className='rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800'>
          <div className='text-2xl font-bold text-purple-600 dark:text-purple-400'>
            {expertSkills}
          </div>
          <div className='text-sm text-gray-600 dark:text-gray-300'>Expert Level</div>
        </div>
        <div className='rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800'>
          <div className='text-2xl font-bold text-orange-600 dark:text-orange-400'>
            {trendingSkills}
          </div>
          <div className='text-sm text-gray-600 dark:text-gray-300'>Trending</div>
        </div>
      </div>
    </motion.div>
  );
};
