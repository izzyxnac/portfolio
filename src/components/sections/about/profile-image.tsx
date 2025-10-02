'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ImageAsset } from '@/lib/types/models';

interface ProfileImageProps {
  image: ImageAsset;
  name: string;
  title: string;
  className?: string;
}

/**
 * ProfileImage Component
 *
 * Optimized profile image component with Next.js Image optimization,
 * Framer Motion animations, and accessibility features.
 */
export function ProfileImage({ image, name, title, className = '' }: ProfileImageProps) {
  return (
    <div className={`relative ${className}`}>
      <ProfileImageContainer image={image} />
      <ProfileImageCaption name={name} title={title} />
      <ReducedMotionStyles />
    </div>
  );
}

function ProfileImageContainer({ image }: { image: ImageAsset }) {
  return (
    <motion.div
      className='relative mx-auto h-80 w-80'
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3, ease: 'easeInOut' },
      }}
    >
      <ProfileImageFrame image={image} />
      <DecorativeRing />
      <StatusIndicator />
    </motion.div>
  );
}

function ProfileImageFrame({ image }: { image: ImageAsset }) {
  return (
    <div className='relative h-full w-full overflow-hidden rounded-full shadow-2xl ring-4 ring-white dark:ring-gray-800'>
      <Image
        src={image.url}
        alt={image.alt}
        width={image.width || 400}
        height={image.height || 400}
        priority
        placeholder={image.placeholder ? 'blur' : 'empty'}
        blurDataURL={image.placeholder}
        className='h-full w-full object-cover transition-transform duration-300 hover:scale-110'
        sizes='(max-width: 768px) 280px, (max-width: 1024px) 320px, 400px'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100' />
    </div>
  );
}

function DecorativeRing() {
  return (
    <motion.div
      className='absolute inset-0 rounded-full border-2 border-blue-500/30'
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

function StatusIndicator() {
  return (
    <motion.div
      className='absolute right-4 bottom-4 h-6 w-6 rounded-full border-4 border-white bg-green-500 shadow-lg dark:border-gray-800'
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.8, duration: 0.3 }}
      whileHover={{ scale: 1.2 }}
      aria-label='Available for work'
      role='img'
    >
      <span className='sr-only'>Available for work</span>
    </motion.div>
  );
}

function ProfileImageCaption({ name, title }: { name: string; title: string }) {
  return (
    <div className='sr-only'>
      Professional headshot of {name}, {title}
    </div>
  );
}

function ReducedMotionStyles() {
  return (
    <style jsx>{`
      @media (prefers-reduced-motion: reduce) {
        .motion-div {
          animation: none !important;
          transition: none !important;
        }
      }
    `}</style>
  );
}
