'use client';

import { motion } from 'framer-motion';
import { Achievement } from '@/lib/types/models';

interface AchievementsListProps {
  achievements: Achievement[];
  className?: string;
}

/**
 * AchievementsList Component - Grid layout for achievements display
 */
export function AchievementsList({ achievements, className = '' }: AchievementsListProps) {
  const featuredAchievements = achievements.filter(achievement => achievement.featured);
  const otherAchievements = achievements.filter(achievement => !achievement.featured);

  return (
    <div className={`${className}`} role='region' aria-label='Key Achievements'>
      <FeaturedAchievements achievements={featuredAchievements} />
      <OtherAchievements achievements={otherAchievements} />
      <EmptyState achievements={achievements} />
      <ReducedMotionStyles />
    </div>
  );
}

function FeaturedAchievements({ achievements }: { achievements: Achievement[] }) {
  if (achievements.length === 0) return null;

  return (
    <div className='mb-12'>
      <h4 className='mb-6 text-center text-xl font-semibold text-gray-900 dark:text-white'>
        Featured Achievements
      </h4>
      <AchievementsGrid achievements={achievements} featured={true} />
    </div>
  );
}

function OtherAchievements({ achievements }: { achievements: Achievement[] }) {
  if (achievements.length === 0) return null;

  return (
    <div>
      <h4 className='mb-6 text-center text-xl font-semibold text-gray-900 dark:text-white'>
        Additional Achievements
      </h4>
      <AchievementsGrid achievements={achievements} featured={false} />
    </div>
  );
}

function AchievementsGrid({
  achievements,
  featured,
}: {
  achievements: Achievement[];
  featured: boolean;
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const gridClass = featured
    ? 'grid md:grid-cols-2 lg:grid-cols-2 gap-6'
    : 'grid sm:grid-cols-2 lg:grid-cols-2 gap-6';

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-50px' }}
      className={gridClass}
    >
      {achievements.map(achievement => (
        <AchievementCard key={achievement.id} achievement={achievement} featured={featured} />
      ))}
    </motion.div>
  );
}

function AchievementCard({
  achievement,
  featured = false,
}: {
  achievement: Achievement;
  featured?: boolean;
}) {
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      className={`group relative ${featured ? 'md:col-span-2' : ''}`}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <AchievementCardContent achievement={achievement} featured={featured} />
    </motion.div>
  );
}

function AchievementCardContent({
  achievement,
  featured,
}: {
  achievement: Achievement;
  featured: boolean;
}) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'leadership':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'innovation':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'education':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'recognition':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const cardClass = featured
    ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700 shadow-lg hover:shadow-xl'
    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg';

  return (
    <div
      className={`h-full rounded-xl border p-6 transition-all duration-300 ${cardClass} hover:border-blue-300 dark:hover:border-blue-600`}
      role='article'
      aria-labelledby={`achievement-${achievement.id}-title`}
      tabIndex={0}
    >
      <AchievementHeader
        achievement={achievement}
        featured={featured}
        getCategoryColor={getCategoryColor}
      />
      <AchievementBody achievement={achievement} featured={featured} />
      <AchievementMetrics achievement={achievement} featured={featured} />
      <div className='pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
    </div>
  );
}

function AchievementHeader({
  achievement,
  featured,
  getCategoryColor,
}: {
  achievement: Achievement;
  featured: boolean;
  getCategoryColor: (category: string) => string;
}) {
  return (
    <>
      {featured && (
        <div className='absolute -top-3 -right-3'>
          <span className='inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white shadow-lg'>
            ⭐ Featured
          </span>
        </div>
      )}
      <div className='mb-4 flex items-start justify-between'>
        <div className='flex items-center gap-3'>
          {achievement.icon && (
            <div className={`text-3xl ${featured ? 'text-4xl' : ''}`} aria-hidden='true'>
              {achievement.icon}
            </div>
          )}
          <span
            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getCategoryColor(achievement.category)}`}
          >
            {achievement.category}
          </span>
        </div>
        <time
          className='text-sm text-gray-500 dark:text-gray-400'
          dateTime={achievement.date.toISOString()}
        >
          {achievement.date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
          })}
        </time>
      </div>
    </>
  );
}

function AchievementBody({
  achievement,
  featured,
}: {
  achievement: Achievement;
  featured: boolean;
}) {
  return (
    <>
      <h4
        id={`achievement-${achievement.id}-title`}
        className={`mb-3 font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 ${
          featured ? 'text-xl' : 'text-lg'
        }`}
      >
        {achievement.title}
      </h4>
      <p
        className={`mb-4 leading-relaxed text-gray-700 dark:text-gray-300 ${
          featured ? 'text-base' : 'text-sm'
        }`}
      >
        {achievement.description}
      </p>
    </>
  );
}

function AchievementMetrics({
  achievement,
  featured,
}: {
  achievement: Achievement;
  featured: boolean;
}) {
  if (!achievement.metrics) return null;

  const metricsClass = featured
    ? 'bg-white/80 dark:bg-gray-800/80 border border-blue-200 dark:border-blue-700'
    : 'bg-gray-50 dark:bg-gray-700';

  return (
    <div className='mt-auto'>
      <div className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 ${metricsClass}`}>
        <svg
          className='h-4 w-4 text-green-500'
          fill='currentColor'
          viewBox='0 0 20 20'
          aria-hidden='true'
        >
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
            clipRule='evenodd'
          />
        </svg>
        <span
          className={`font-medium text-gray-900 dark:text-white ${
            featured ? 'text-sm' : 'text-xs'
          }`}
        >
          {achievement.metrics}
        </span>
      </div>
    </div>
  );
}

function EmptyState({ achievements }: { achievements: Achievement[] }) {
  if (achievements.length > 0) return null;

  return (
    <div className='py-12 text-center'>
      <div className='mb-4 text-4xl' aria-hidden='true'>
        🏆
      </div>
      <p className='text-gray-500 dark:text-gray-400'>No achievements to display yet.</p>
    </div>
  );
}

function ReducedMotionStyles() {
  return (
    <style jsx>{`
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `}</style>
  );
}
