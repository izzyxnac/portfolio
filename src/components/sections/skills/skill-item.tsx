'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Skill } from '@/lib/types/models';
import { SkillProgress } from './skill-progress';
import { SkillTooltip } from './skill-tooltip';

interface SkillItemProps {
  skill: Skill;
  categoryColor: string;
}

const skillLevelConfig = {
  beginner: { color: 'text-gray-600', bg: 'bg-gray-100', label: 'Beginner' },
  intermediate: { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Intermediate' },
  advanced: { color: 'text-blue-600', bg: 'bg-blue-100', label: 'Advanced' },
  expert: { color: 'text-green-600', bg: 'bg-green-100', label: 'Expert' },
};

const useSkillItemLogic = (skill: Skill) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const levelConfig = skillLevelConfig[skill.level];

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setShowTooltip(!showTooltip);
    }
  };

  return { showTooltip, setShowTooltip, levelConfig, handleKeyDown };
};

const SkillIcon = ({ skill }: { skill: Skill }) => {
  if (!skill.icon) return null;

  return (
    <div className='h-6 w-6 flex-shrink-0'>
      <Image
        src={skill.icon}
        alt={`${skill.name} icon`}
        width={24}
        height={24}
        className='h-full w-full object-contain'
      />
    </div>
  );
};

export const SkillItem = ({ skill, categoryColor }: SkillItemProps) => {
  const { showTooltip, setShowTooltip, levelConfig, handleKeyDown } = useSkillItemLogic(skill);

  return (
    <div className='relative'>
      <motion.div
        className='flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-3 transition-colors duration-200 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800'
        tabIndex={0}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        onKeyDown={handleKeyDown}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        role='button'
        aria-label={`${skill.name} - ${levelConfig.label} level skill`}
        aria-describedby={`skill-${skill.id}-details`}
      >
        <div className='flex min-w-0 flex-1 items-center space-x-3'>
          <SkillIcon skill={skill} />

          {/* Skill Name and Level */}
          <div className='min-w-0 flex-1'>
            <div className='flex items-center space-x-2'>
              <h5 className='truncate text-sm font-medium text-gray-900 dark:text-white'>
                {skill.name}
              </h5>
              {skill.trending && (
                <span
                  className='text-xs text-orange-500'
                  aria-label='Trending skill'
                  title='Currently trending'
                >
                  🔥
                </span>
              )}
            </div>
            <div className='mt-1 flex items-center space-x-2'>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${levelConfig.bg} ${levelConfig.color} dark:bg-gray-600 dark:text-gray-200`}
              >
                {levelConfig.label}
              </span>
              <span className='text-xs text-gray-500 dark:text-gray-400'>
                {skill.yearsOfExperience}+ years
              </span>
            </div>
          </div>

          {/* Proficiency Percentage */}
          <div className='flex-shrink-0 text-right'>
            <div className='text-sm font-semibold text-gray-900 dark:text-white'>
              {skill.proficiencyPercentage}%
            </div>
            <div className='mt-1 w-16'>
              <SkillProgress
                percentage={skill.proficiencyPercentage}
                color={categoryColor}
                size='sm'
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tooltip */}
      {showTooltip && (
        <SkillTooltip
          skill={skill}
          categoryColor={categoryColor}
          id={`skill-${skill.id}-details`}
        />
      )}
    </div>
  );
};
