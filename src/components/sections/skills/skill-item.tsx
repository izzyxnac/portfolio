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
  if (!skill.icon) {
    // Fallback icon based on skill name first letter
    return (
      <div className='flex h-6 w-6 items-center justify-center rounded bg-gray-200 text-xs font-bold text-gray-600 dark:bg-gray-600 dark:text-gray-300'>
        {skill.name.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <div className='h-6 w-6 flex-shrink-0'>
      <Image
        src={skill.icon}
        alt={`${skill.name} icon`}
        width={24}
        height={24}
        className='h-full w-full object-contain transition-transform group-hover:scale-110'
      />
    </div>
  );
};

// Enhanced skill icon container
const SkillIconContainer = ({ skill, categoryColor }: { skill: Skill; categoryColor: string }) => (
  <div className='flex-shrink-0'>
    <div
      className='flex h-10 w-10 items-center justify-center rounded-lg shadow-sm transition-transform group-hover:scale-110'
      style={{ backgroundColor: `${categoryColor}10`, border: `1px solid ${categoryColor}30` }}
    >
      <SkillIcon skill={skill} />
    </div>
  </div>
);

// Skill information section
const SkillInfo = ({
  skill,
  levelConfig,
}: {
  skill: Skill;
  levelConfig: { color: string; bg: string; label: string };
}) => (
  <div className='min-w-0 flex-1'>
    <div className='flex items-center space-x-2'>
      <h5 className='truncate font-semibold text-gray-900 dark:text-white'>{skill.name}</h5>
      {skill.trending && (
        <motion.span
          className='text-orange-500'
          aria-label='Trending skill'
          title='Currently trending'
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🔥
        </motion.span>
      )}
    </div>
    <div className='mt-1 flex items-center space-x-3'>
      <span
        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${levelConfig.bg} ${levelConfig.color} dark:bg-gray-600 dark:text-gray-200`}
      >
        {levelConfig.label}
      </span>
      <span className='text-xs font-medium text-gray-500 dark:text-gray-400'>
        {skill.yearsOfExperience}+ years
      </span>
    </div>
  </div>
);

// Proficiency display section
const ProficiencyDisplay = ({ skill, categoryColor }: { skill: Skill; categoryColor: string }) => (
  <div className='flex-shrink-0 text-right'>
    <div className='text-lg font-bold' style={{ color: categoryColor }}>
      {skill.proficiencyPercentage}%
    </div>
    <div className='mt-2 w-20'>
      <SkillProgress percentage={skill.proficiencyPercentage} color={categoryColor} size='sm' />
    </div>
  </div>
);

export const SkillItem = ({ skill, categoryColor }: SkillItemProps) => {
  const { showTooltip, setShowTooltip, levelConfig, handleKeyDown } = useSkillItemLogic(skill);

  return (
    <div className='relative'>
      <motion.div
        className='group flex cursor-pointer items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:border-gray-200 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600 dark:focus:ring-offset-gray-800'
        tabIndex={0}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        onKeyDown={handleKeyDown}
        whileHover={{ scale: 1.01, y: -1 }}
        whileTap={{ scale: 0.99 }}
        role='button'
        aria-label={`${skill.name} - ${levelConfig.label} level skill`}
        aria-describedby={`skill-${skill.id}-details`}
      >
        <div className='flex min-w-0 flex-1 items-center space-x-4'>
          <SkillIconContainer skill={skill} categoryColor={categoryColor} />
          <SkillInfo skill={skill} levelConfig={levelConfig} />
          <ProficiencyDisplay skill={skill} categoryColor={categoryColor} />
        </div>
      </motion.div>

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
