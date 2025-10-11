'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SkillCategory, Skill } from '@/lib/types/models';

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

// Compact category header component
const CompactCategoryHeader = ({ category }: { category: SkillCategory }) => (
  <div className='mb-4 flex items-center space-x-3'>
    <div
      className='flex h-10 w-10 items-center justify-center rounded-lg text-xl shadow-sm'
      style={{ backgroundColor: `${category.color}15`, color: category.color }}
      role='img'
      aria-label={`${category.name} icon`}
    >
      {category.icon}
    </div>
    <div className='flex-1'>
      <h3 className='text-lg font-bold text-gray-900 dark:text-white'>{category.name}</h3>
      {category.featured && (
        <span className='mt-0.5 inline-flex items-center rounded-md bg-gradient-to-r from-blue-500 to-purple-600 px-2 py-0.5 text-xs font-medium text-white'>
          ⭐ Featured
        </span>
      )}
    </div>
  </div>
);

export const SkillCategoryCard = ({
  category,
  isSelected,
  filterLevel,
}: SkillCategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const filteredSkills =
    filterLevel === 'all'
      ? category.skills
      : category.skills.filter(skill => skill.level === filterLevel);

  const { averageProficiency, expertSkillsCount, trendingSkillsCount } =
    useCategoryStats(filteredSkills);

  return (
    <motion.div
      className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800 ${
        isSelected || isHovered
          ? 'border-transparent shadow-2xl ring-2 ring-blue-500'
          : 'border border-gray-100 hover:border-gray-200 dark:border-gray-700'
      } `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4, scale: 1.02 }}
      style={{ minHeight: '320px', height: 'auto' }}
    >
      {/* Gradient overlay for visual appeal */}
      <div
        className='absolute inset-0 opacity-5 transition-opacity group-hover:opacity-10'
        style={{ background: `linear-gradient(135deg, ${category.color}20, transparent)` }}
      />

      <div className='relative flex h-full flex-col p-6'>
        <CompactCategoryHeader category={category} />

        <ModernCategoryStats
          filteredSkills={filteredSkills}
          averageProficiency={averageProficiency}
          expertSkillsCount={expertSkillsCount}
          trendingSkillsCount={trendingSkillsCount}
          categoryColor={category.color}
        />

        <EnhancedProgressBar
          averageProficiency={averageProficiency}
          categoryColor={category.color}
        />

        {/* Modern Skills Pills Display */}
        <div className='min-h-0 flex-1'>
          <SkillsPillsGrid skills={filteredSkills.slice(0, 8)} categoryColor={category.color} />

          {filteredSkills.length > 8 && (
            <div className='mt-2 text-center'>
              <span className='text-xs text-gray-500 dark:text-gray-400'>
                +{filteredSkills.length - 8} more
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Compact category statistics component
const ModernCategoryStats = ({
  filteredSkills,
  averageProficiency,
  expertSkillsCount,
  trendingSkillsCount,
  categoryColor,
}: {
  filteredSkills: Skill[];
  averageProficiency: number;
  expertSkillsCount: number;
  trendingSkillsCount: number;
  categoryColor: string;
}) => (
  <div className='mb-4 space-y-3'>
    {/* Primary metric - Proficiency */}
    <div className='text-center'>
      <div className='text-2xl font-bold' style={{ color: categoryColor }}>
        {averageProficiency}%
      </div>
      <div className='text-xs font-medium text-gray-600 dark:text-gray-400'>
        Overall Proficiency
      </div>
    </div>

    {/* Compact metrics row */}
    <div className='flex justify-center space-x-4 text-center'>
      <div>
        <div className='text-sm font-bold text-gray-900 dark:text-white'>
          {filteredSkills.length}
        </div>
        <div className='text-xs text-gray-500 dark:text-gray-400'>Skills</div>
      </div>
      <div>
        <div className='text-sm font-bold text-emerald-600 dark:text-emerald-400'>
          {expertSkillsCount}
        </div>
        <div className='text-xs text-gray-500 dark:text-gray-400'>Expert</div>
      </div>
      {trendingSkillsCount > 0 && (
        <div>
          <div className='text-sm font-bold text-orange-600 dark:text-orange-400'>
            {trendingSkillsCount}
          </div>
          <div className='text-xs text-gray-500 dark:text-gray-400'>Trending</div>
        </div>
      )}
    </div>
  </div>
);

// Compact progress bar component
const EnhancedProgressBar = ({
  averageProficiency,
  categoryColor,
}: {
  averageProficiency: number;
  categoryColor: string;
}) => (
  <div className='mb-4'>
    <div className='relative h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700'>
      <motion.div
        className='h-full rounded-full'
        style={{
          background: `linear-gradient(90deg, ${categoryColor}60, ${categoryColor})`,
        }}
        initial={{ width: 0 }}
        animate={{ width: `${averageProficiency}%` }}
        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
      />
    </div>
  </div>
);

// Modern skills pills grid component
const SkillsPillsGrid = ({ skills, categoryColor }: { skills: Skill[]; categoryColor: string }) => (
  <div className='space-y-2'>
    <h4 className='text-xs font-medium text-gray-500 dark:text-gray-400'>Top Skills</h4>
    <div className='flex flex-wrap gap-1.5 overflow-hidden'>
      {skills.map(skill => (
        <SkillPill key={skill.id} skill={skill} categoryColor={categoryColor} />
      ))}
    </div>
  </div>
);

// Individual skill pill component
const SkillPill = ({ skill, categoryColor }: { skill: Skill; categoryColor: string }) => {
  const getProficiencyIntensity = (percentage: number) => {
    if (percentage >= 90) return '100';
    if (percentage >= 75) return '80';
    if (percentage >= 60) return '60';
    if (percentage >= 40) return '40';
    return '20';
  };

  const intensity = getProficiencyIntensity(skill.proficiencyPercentage);

  return (
    <motion.div
      className='group relative flex flex-shrink-0 items-center space-x-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-all hover:scale-105'
      style={{
        backgroundColor: `${categoryColor}${intensity === '100' ? '' : intensity}`,
        borderColor: `${categoryColor}40`,
        color: intensity === '100' ? 'white' : categoryColor,
        minWidth: 'fit-content',
        maxWidth: '140px',
      }}
      whileHover={{ scale: 1.05 }}
      title={`${skill.name} - ${skill.proficiencyPercentage}% proficiency`}
    >
      {skill.trending && <span className='text-xs text-orange-400'>🔥</span>}
      <span className='truncate text-xs'>{skill.name}</span>
      <div
        className='h-1 w-1 flex-shrink-0 rounded-full'
        style={{ backgroundColor: intensity === '100' ? 'white' : categoryColor }}
      />
    </motion.div>
  );
};
