'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkillCategory, Skill } from '@/lib/types/models';
import { SkillItem } from './skill-item';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface SkillCategoryCardProps {
  category: SkillCategory;
  isSelected: boolean;
  interactionMode: 'hover' | 'click' | 'auto';
  filterLevel: string;
}

// Helper function to calculate category statistics
const useCategoryStats = (filteredSkills: Skill[]) => {
  const averageProficiency = Math.round(
    filteredSkills.reduce((acc, skill) => acc + skill.proficiencyPercentage, 0) /
      filteredSkills.length
  );
  const expertSkillsCount = filteredSkills.filter(skill => skill.level === 'expert').length;
  const trendingSkillsCount = filteredSkills.filter(skill => skill.trending).length;

  return { averageProficiency, expertSkillsCount, trendingSkillsCount };
};

// Category header component
const CategoryHeader = ({
  category,
  isExpanded,
  setIsExpanded,
  interactionMode,
}: {
  category: SkillCategory;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  interactionMode: 'hover' | 'click' | 'auto';
}) => (
  <div className='mb-4 flex items-center justify-between'>
    <div className='flex items-center space-x-3'>
      <div className='text-3xl' role='img' aria-label={`${category.name} icon`}>
        {category.icon}
      </div>
      <div>
        <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>{category.name}</h3>
        {category.featured && (
          <span className='inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
            Featured
          </span>
        )}
      </div>
    </div>

    {interactionMode === 'click' && (
      <button
        onClick={e => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
        className='rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700'
        aria-label={isExpanded ? 'Collapse category' : 'Expand category'}
      >
        {isExpanded ? (
          <ChevronUpIcon className='h-5 w-5 text-gray-500' />
        ) : (
          <ChevronDownIcon className='h-5 w-5 text-gray-500' />
        )}
      </button>
    )}
  </div>
);

export const SkillCategoryCard = ({
  category,
  isSelected,
  interactionMode,
  filterLevel,
}: SkillCategoryCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const filteredSkills =
    filterLevel === 'all'
      ? category.skills
      : category.skills.filter(skill => skill.level === filterLevel);

  const shouldShowDetails =
    interactionMode === 'hover' ? isHovered : interactionMode === 'click' ? isSelected : true;

  const { averageProficiency, expertSkillsCount, trendingSkillsCount } =
    useCategoryStats(filteredSkills);

  return (
    <motion.div
      className={`relative cursor-pointer overflow-hidden rounded-xl border-2 bg-white shadow-lg transition-all duration-300 dark:bg-gray-800 ${
        isSelected || isHovered
          ? 'border-blue-500 shadow-xl'
          : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
      } `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
      layout
    >
      <div className='p-6'>
        <CategoryHeader
          category={category}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          interactionMode={interactionMode}
        />

        <p className='mb-4 text-sm text-gray-600 dark:text-gray-300'>{category.description}</p>

        <CategoryStats
          filteredSkills={filteredSkills}
          averageProficiency={averageProficiency}
          expertSkillsCount={expertSkillsCount}
        />

        <CategoryProgressBar
          averageProficiency={averageProficiency}
          categoryColor={category.color}
        />

        {trendingSkillsCount > 0 && (
          <div className='flex items-center space-x-1 text-xs text-orange-600 dark:text-orange-400'>
            <span>🔥</span>
            <span>{trendingSkillsCount} trending skills</span>
          </div>
        )}
      </div>

      <AnimatePresence>
        {(shouldShowDetails || isExpanded) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='border-t border-gray-200 dark:border-gray-700'
          >
            <div className='space-y-3 p-6 pt-4'>
              <h4 className='mb-3 text-sm font-medium text-gray-700 dark:text-gray-300'>
                Skills in this category:
              </h4>
              {filteredSkills.map(skill => (
                <SkillItem key={skill.id} skill={skill} categoryColor={category.color} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Category statistics component
const CategoryStats = ({
  filteredSkills,
  averageProficiency,
  expertSkillsCount,
}: {
  filteredSkills: Skill[];
  averageProficiency: number;
  expertSkillsCount: number;
}) => (
  <div className='mb-4 grid grid-cols-3 gap-4'>
    <div className='text-center'>
      <div className='text-lg font-bold text-gray-900 dark:text-white'>{filteredSkills.length}</div>
      <div className='text-xs text-gray-500 dark:text-gray-400'>Skills</div>
    </div>
    <div className='text-center'>
      <div className='text-lg font-bold text-green-600 dark:text-green-400'>
        {averageProficiency}%
      </div>
      <div className='text-xs text-gray-500 dark:text-gray-400'>Avg. Proficiency</div>
    </div>
    <div className='text-center'>
      <div className='text-lg font-bold text-purple-600 dark:text-purple-400'>
        {expertSkillsCount}
      </div>
      <div className='text-xs text-gray-500 dark:text-gray-400'>Expert</div>
    </div>
  </div>
);

// Progress bar component
const CategoryProgressBar = ({
  averageProficiency,
  categoryColor,
}: {
  averageProficiency: number;
  categoryColor: string;
}) => (
  <div className='mb-4'>
    <div className='mb-1 flex justify-between text-xs text-gray-500 dark:text-gray-400'>
      <span>Overall Proficiency</span>
      <span>{averageProficiency}%</span>
    </div>
    <div className='h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700'>
      <motion.div
        className='h-2 rounded-full'
        style={{ backgroundColor: categoryColor }}
        initial={{ width: 0 }}
        animate={{ width: `${averageProficiency}%` }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </div>
  </div>
);
