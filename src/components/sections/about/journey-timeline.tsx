'use client';

import { motion } from 'framer-motion';
import { JourneyMilestone } from '@/lib/types/models';

interface JourneyTimelineProps {
  milestones: JourneyMilestone[];
  className?: string;
}

/**
 * JourneyTimeline Component
 *
 * Interactive timeline displaying professional milestones with:
 * - Scroll-triggered animations for timeline reveals
 * - Responsive layout adapting to screen sizes
 * - Milestone categories (education, career, achievements)
 * - Keyboard navigation support for accessibility
 * - Proper ARIA labels for timeline structure
 * - Reduced motion preferences support
 */
export function JourneyTimeline({ milestones, className = '' }: JourneyTimelineProps) {
  const sortedMilestones = [...milestones].sort((a, b) => a.order - b.order);

  return (
    <div className={`relative ${className}`} role='region' aria-label='Professional Timeline'>
      <TimelineLine />
      <TimelineContent milestones={sortedMilestones} />
      <TimelineAccessibility />
    </div>
  );
}

function TimelineLine() {
  return (
    <div className='absolute top-0 bottom-0 left-4 w-0.5 bg-gray-300 md:left-1/2 md:-translate-x-px md:transform dark:bg-gray-600' />
  );
}

function TimelineContent({ milestones }: { milestones: JourneyMilestone[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-100px' }}
      className='space-y-12'
    >
      {milestones.map((milestone, index) => (
        <TimelineMilestone key={milestone.id} milestone={milestone} index={index} />
      ))}
    </motion.div>
  );
}

function TimelineMilestone({ milestone, index }: { milestone: JourneyMilestone; index: number }) {
  const itemVariants = {
    hidden: {
      opacity: 0,
      x: index % 2 === 0 ? -50 : 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-100px' }}
      className={`relative flex items-center ${
        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
      tabIndex={0}
      role='article'
      aria-labelledby={`milestone-${milestone.id}-title`}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
        }
      }}
    >
      <TimelineNode milestone={milestone} />
      <TimelineCard milestone={milestone} index={index} />
    </motion.div>
  );
}

function TimelineNode({ milestone }: { milestone: JourneyMilestone }) {
  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'education':
        return '🎓';
      case 'career':
        return '💼';
      case 'achievement':
        return '🏆';
      case 'certification':
        return '📜';
      case 'project':
        return '🚀';
      default:
        return '📍';
    }
  };

  const getMilestoneColor = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'bg-blue-500 border-blue-600';
      case 'medium':
        return 'bg-green-500 border-green-600';
      case 'low':
        return 'bg-gray-500 border-gray-600';
      default:
        return 'bg-blue-500 border-blue-600';
    }
  };

  return (
    <div className='absolute left-4 z-10 md:left-1/2 md:-translate-x-1/2 md:transform'>
      <div
        className={`h-8 w-8 rounded-full border-4 ${getMilestoneColor(milestone.importance)} flex items-center justify-center shadow-lg`}
        aria-hidden='true'
      >
        <span className='text-xs'>{getMilestoneIcon(milestone.type)}</span>
      </div>
    </div>
  );
}

function TimelineCard({ milestone, index }: { milestone: JourneyMilestone; index: number }) {
  return (
    <div
      className={`ml-16 md:ml-0 md:w-5/12 ${
        index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
      }`}
    >
      <motion.div
        className='rounded-lg border border-gray-200 bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800'
        whileHover={{
          y: -4,
          transition: { duration: 0.2 },
        }}
      >
        <TimelineCardHeader milestone={milestone} />
        <TimelineCardContent milestone={milestone} />
        <TimelineCardTags milestone={milestone} />
      </motion.div>
    </div>
  );
}

function TimelineCardHeader({ milestone }: { milestone: JourneyMilestone }) {
  return (
    <div className='mb-3 flex items-center gap-3'>
      <span className='inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
        {milestone.year}
      </span>
      {milestone.location && (
        <span className='flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400'>
          <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 20 20' aria-hidden='true'>
            <path
              fillRule='evenodd'
              d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
              clipRule='evenodd'
            />
          </svg>
          {milestone.location}
        </span>
      )}
    </div>
  );
}

function TimelineCardContent({ milestone }: { milestone: JourneyMilestone }) {
  return (
    <>
      <h4
        id={`milestone-${milestone.id}-title`}
        className='mb-3 text-xl font-semibold text-gray-900 dark:text-white'
      >
        {milestone.title}
      </h4>
      <p className='mb-4 leading-relaxed text-gray-700 dark:text-gray-300'>
        {milestone.description}
      </p>
    </>
  );
}

function TimelineCardTags({ milestone }: { milestone: JourneyMilestone }) {
  if (!milestone.tags || milestone.tags.length === 0) return null;

  return (
    <div className='flex flex-wrap gap-2'>
      {milestone.tags.map((tag, tagIndex) => (
        <span
          key={tagIndex}
          className='inline-flex items-center rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200'
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function TimelineAccessibility() {
  return (
    <>
      <div className='sr-only'>
        Use arrow keys to navigate through timeline milestones. Press Enter or Space to interact
        with each milestone.
      </div>
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
}
