'use client';

import { motion } from 'framer-motion';

interface SkillsLoadingProps {
  message?: string;
}

const SkeletonCard = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay, duration: 0.3 }}
    className='rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800'
  >
    <div className='mb-4 flex items-center space-x-3'>
      <div className='h-8 w-8 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700' />
      <div className='flex-1'>
        <div className='mb-2 h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
        <div className='h-3 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
      </div>
    </div>
    <div className='mb-4 space-y-2'>
      <div className='h-3 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
      <div className='h-3 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
    </div>
    <div className='mb-4 grid grid-cols-3 gap-4'>
      {[...Array(3)].map((_, i) => (
        <div key={i} className='text-center'>
          <div className='mb-1 h-6 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
          <div className='h-3 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
        </div>
      ))}
    </div>
    <div className='h-2 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
  </motion.div>
);

export const SkillsLoading = ({ message = 'Loading skills...' }: SkillsLoadingProps) => {
  return (
    <div
      className='px-4 py-16 sm:px-6 lg:px-8'
      role='status'
      aria-live='polite'
      aria-label={message}
    >
      <div className='mx-auto max-w-7xl'>
        {/* Header Skeleton */}
        <div className='mb-12 text-center'>
          <div className='mx-auto mb-4 h-10 max-w-md animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mx-auto h-6 max-w-2xl animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
        </div>

        {/* Filter Skeleton */}
        <div className='mb-8 flex justify-center'>
          <div className='flex space-x-2'>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className='h-8 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700'
              />
            ))}
          </div>
        </div>

        {/* Cards Grid Skeleton */}
        <div className='mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} delay={i * 0.1} />
          ))}
        </div>

        {/* Summary Skeleton */}
        <div className='mx-auto grid max-w-2xl grid-cols-2 gap-4 md:grid-cols-4'>
          {[...Array(4)].map((_, i) => (
            <div key={i} className='rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800'>
              <div className='mb-2 h-8 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
              <div className='h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
            </div>
          ))}
        </div>

        {/* Screen reader message */}
        <div className='sr-only'>{message}</div>
      </div>
    </div>
  );
};
