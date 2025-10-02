'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ParticleBackground } from './particles';
import { TypingAnimation } from './animations';
import { HeroSectionProps } from '@/lib/types/components';

interface EnhancedHeroSectionProps extends Omit<HeroSectionProps, 'title'> {
  name: string;
  tagline: string;
  skills: string[];
  profileImage: string;
  profileImageAlt: string;
  onViewProjects: () => void;
  onGetInTouch: () => void;
}

const getContainerVariants = (): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
    },
  },
});

const getItemVariants = (): Variants => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
});

const renderProfileImage = (
  profileImage: string,
  profileImageAlt: string,
  itemVariants: Variants
) => (
  <motion.div className='mb-8 flex justify-center' variants={itemVariants}>
    <div className='group relative'>
      <motion.div
        className='absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-75 blur-sm transition-opacity duration-300 group-hover:opacity-100'
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <div className='relative h-32 w-32 overflow-hidden rounded-full border-4 border-slate-700 bg-slate-800 sm:h-40 sm:w-40 lg:h-48 lg:w-48'>
        <Image
          src={profileImage}
          alt={profileImageAlt}
          fill
          className='object-cover transition-transform duration-300 group-hover:scale-110'
          priority
          sizes='(max-width: 640px) 128px, (max-width: 1024px) 160px, 192px'
        />
      </div>
    </div>
  </motion.div>
);

const renderNameAndTitle = (name: string, tagline: string, itemVariants: Variants) => (
  <motion.div variants={itemVariants} className='mb-6'>
    <h1 className='mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl'>
      {name}
    </h1>
    <p className='text-xl font-light text-slate-300 sm:text-2xl lg:text-3xl'>{tagline}</p>
  </motion.div>
);

const renderCallToActionButtons = (
  onViewProjects: () => void,
  onGetInTouch: () => void,
  itemVariants: Variants
) => (
  <motion.div
    variants={itemVariants}
    className='flex flex-col items-center justify-center gap-4 sm:flex-row'
  >
    <Button
      onClick={onViewProjects}
      size='lg'
      className='min-w-[160px] border-0 bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl'
      aria-label='View my projects'
    >
      View Projects
    </Button>
    <Button
      onClick={onGetInTouch}
      variant='outline'
      size='lg'
      className='min-w-[160px] border-slate-400 px-8 py-3 text-lg font-semibold text-slate-300 transition-all duration-300 hover:scale-105 hover:bg-slate-800 hover:text-white'
      aria-label='Get in touch with me'
    >
      Get In Touch
    </Button>
  </motion.div>
);

const renderScrollIndicator = (itemVariants: Variants) => (
  <motion.div
    className='absolute bottom-8 left-1/2 -translate-x-1/2 transform'
    variants={itemVariants}
  >
    <motion.div
      className='flex h-10 w-6 justify-center rounded-full border-2 border-slate-400'
      animate={{ y: [0, 10, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <motion.div
        className='mt-2 h-3 w-1 rounded-full bg-slate-400'
        animate={{ scaleY: [1, 0.5, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  </motion.div>
);

export const HeroSection = (props: EnhancedHeroSectionProps) => {
  const {
    name,
    tagline,
    description,
    skills,
    profileImage,
    profileImageAlt,
    onViewProjects,
    onGetInTouch,
    className = '',
    animated = true,
  } = props;

  const containerVariants = getContainerVariants();
  const itemVariants = getItemVariants();

  return (
    <section
      className={`relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 ${className}`}
      aria-label='Hero section'
    >
      <ParticleBackground />
      <div className='absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/30' />

      <motion.div
        className='relative z-10 container mx-auto px-4 py-20 text-center sm:px-6 lg:px-8'
        variants={containerVariants}
        initial={animated ? 'hidden' : 'visible'}
        animate='visible'
      >
        {renderProfileImage(profileImage, profileImageAlt, itemVariants)}
        {renderNameAndTitle(name, tagline, itemVariants)}

        <motion.div variants={itemVariants} className='mb-8'>
          <TypingAnimation skills={skills} />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className='mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-slate-400 sm:text-xl'
        >
          {description}
        </motion.p>

        {renderCallToActionButtons(onViewProjects, onGetInTouch, itemVariants)}
        {renderScrollIndicator(itemVariants)}
      </motion.div>
    </section>
  );
};

export default HeroSection;
