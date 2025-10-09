'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Skill } from '@/lib/types/models';

interface SkillTooltipProps {
  skill: Skill;
  categoryColor: string;
  id: string;
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(date);
};

const TooltipHeader = ({ skill }: { skill: Skill }) => (
  <div className='mb-3 flex items-center space-x-3'>
    {skill.icon && (
      <Image
        src={skill.icon}
        alt={`${skill.name} icon`}
        width={32}
        height={32}
        className='object-contain'
      />
    )}
    <div>
      <h4 className='font-semibold text-gray-900 dark:text-white'>{skill.name}</h4>
      <p className='text-sm text-gray-600 dark:text-gray-300'>
        {skill.yearsOfExperience}+ years experience
      </p>
    </div>
  </div>
);

const RelatedProjects = ({ projects }: { projects: string[] }) => {
  if (projects.length === 0) return null;

  return (
    <div className='mb-3'>
      <h5 className='mb-2 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400'>
        Related Projects
      </h5>
      <div className='flex flex-wrap gap-1'>
        {projects.map((project, index) => (
          <span
            key={index}
            className='inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200'
          >
            {project.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
        ))}
      </div>
    </div>
  );
};

const Certifications = ({ certifications }: { certifications: string[] }) => {
  if (certifications.length === 0) return null;

  return (
    <div className='mb-3'>
      <h5 className='mb-2 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400'>
        Certifications
      </h5>
      <div className='space-y-1'>
        {certifications.map((cert, index) => (
          <div
            key={index}
            className='flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300'
          >
            <span className='text-green-500'>✓</span>
            <span>{cert}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SkillTooltip = ({ skill, categoryColor, id }: SkillTooltipProps) => {
  return (
    <AnimatePresence>
      <motion.div
        id={id}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className='absolute top-full left-0 z-50 mt-2 w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-gray-800'
        role='tooltip'
      >
        <TooltipHeader skill={skill} />

        {/* Description */}
        {skill.description && (
          <p className='mb-3 text-sm text-gray-700 dark:text-gray-300'>{skill.description}</p>
        )}

        {/* Experience Details */}
        <div className='mb-3'>
          <h5 className='mb-1 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400'>
            Experience
          </h5>
          <p className='text-sm text-gray-700 dark:text-gray-300'>{skill.experience}</p>
        </div>

        <RelatedProjects projects={skill.relatedProjects} />
        <Certifications certifications={skill.certifications} />

        {/* Stats */}
        <div className='grid grid-cols-2 gap-4 border-t border-gray-200 pt-3 dark:border-gray-700'>
          <div>
            <div className='text-lg font-bold' style={{ color: categoryColor }}>
              {skill.proficiencyPercentage}%
            </div>
            <div className='text-xs text-gray-500 dark:text-gray-400'>Proficiency</div>
          </div>
          <div>
            <div className='text-lg font-bold text-gray-700 dark:text-gray-300'>
              {formatDate(skill.lastUsed)}
            </div>
            <div className='text-xs text-gray-500 dark:text-gray-400'>Last Used</div>
          </div>
        </div>

        {/* Trending Badge */}
        {skill.trending && (
          <div className='mt-3 flex items-center justify-center'>
            <span className='inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800 dark:bg-orange-900 dark:text-orange-200'>
              🔥 Currently Trending
            </span>
          </div>
        )}

        {/* Tooltip Arrow */}
        <div className='absolute -top-1 left-4 h-2 w-2 rotate-45 transform border-t border-l border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'></div>
      </motion.div>
    </AnimatePresence>
  );
};
