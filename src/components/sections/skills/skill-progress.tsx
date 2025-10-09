'use client';

import { motion } from 'framer-motion';

interface SkillProgressProps {
  percentage: number;
  color: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

const sizeConfig = {
  sm: { height: 'h-1', text: 'text-xs' },
  md: { height: 'h-2', text: 'text-sm' },
  lg: { height: 'h-3', text: 'text-base' },
};

export const SkillProgress = ({
  percentage,
  color,
  size = 'md',
  showLabel = false,
  animated = true,
}: SkillProgressProps) => {
  const config = sizeConfig[size];

  return (
    <div className='w-full'>
      {showLabel && (
        <div className={`mb-1 flex justify-between ${config.text}`}>
          <span className='text-gray-700 dark:text-gray-300'>Proficiency</span>
          <span className='font-medium text-gray-900 dark:text-white'>{percentage}%</span>
        </div>
      )}

      <div className={`w-full rounded-full bg-gray-200 dark:bg-gray-700 ${config.height}`}>
        <motion.div
          className={`${config.height} rounded-full`}
          style={{ backgroundColor: color }}
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={
            animated
              ? {
                  duration: 1.2,
                  delay: 0.3,
                  ease: 'easeOut',
                }
              : undefined
          }
          role='progressbar'
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Skill proficiency: ${percentage}%`}
        />
      </div>
    </div>
  );
};
