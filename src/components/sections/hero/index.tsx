'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ParticleBackground } from './particles';
import { TypingAnimation } from './animations';
import { HeroSectionProps } from '@/lib/types/components';
import { useBreakpoints } from '@/hooks/use-media-query';
import { useAccessibilityPreferences } from '@/hooks/use-media-query';
import { getAnimationVariant } from '@/styles/themes/animations';

interface EnhancedHeroSectionProps extends Omit<HeroSectionProps, 'title'> {
  name: string;
  tagline: string;
  skills: string[];
  profileImage: string;
  profileImageAlt: string;
  onViewProjects: () => void;
  onGetInTouch: () => void;
}

const getContainerVariants = (motionPreference: 'no-preference' | 'reduce' | 'none'): Variants => {
  const baseVariant = getAnimationVariant('staggerContainer', motionPreference);
  const defaultTransition = {
    duration: 0.8,
    staggerChildren: 0.2,
  };
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition:
        (typeof baseVariant.animate?.transition === 'object' && baseVariant.animate?.transition) ||
        defaultTransition,
    },
  };
};

const getItemVariants = (): Variants => {
  return {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };
};

const renderProfileImage = (
  profileImage: string,
  profileImageAlt: string,
  itemVariants: Variants
) => (
  <motion.div className='mb-8 flex justify-center' variants={itemVariants}>
    <div className='group relative'>
      <motion.div
        className='from-primary via-accent to-info absolute -inset-1 rounded-full bg-gradient-to-r opacity-75 blur-sm transition-opacity duration-300 group-hover:opacity-100'
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <div className='border-border bg-surface relative h-32 w-32 overflow-hidden rounded-full border-4 sm:h-40 sm:w-40 lg:h-48 lg:w-48'>
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
  <motion.div variants={itemVariants} className='mb-6 text-center'>
    <h1 className='text-hierarchy-primary mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl'>
      {name}
    </h1>
    <p className='text-primary mx-auto text-center text-xl sm:text-2xl lg:text-3xl'>{tagline}</p>
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
      className='from-primary to-accent text-primary-foreground theme-transition touch-target-recommended min-w-[160px] bg-gradient-to-r px-8 py-3 text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-xl'
      aria-label='View my projects'
    >
      View Projects
    </Button>
    <Button
      onClick={onGetInTouch}
      variant='outline'
      size='lg'
      className='border-border text-hierarchy-primary theme-transition hover:bg-accent hover:text-accent-foreground touch-target-recommended min-w-[160px] px-8 py-3 text-lg font-semibold hover:scale-105'
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
      className='border-border flex h-10 w-6 justify-center rounded-full border-2'
      animate={{ y: [0, 10, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <motion.div
        className='bg-hierarchy-secondary mt-2 h-3 w-1 rounded-full'
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

  const { isMobile, isTablet } = useBreakpoints();
  const { prefersReducedMotion } = useAccessibilityPreferences();

  const motionPreference = prefersReducedMotion ? 'reduce' : 'no-preference';
  const containerVariants = getContainerVariants(motionPreference);
  const itemVariants = getItemVariants();

  // Responsive padding and spacing
  const containerPadding = isMobile ? 'px-4 py-16' : isTablet ? 'px-6 py-20' : 'px-8 py-24';

  return (
    <section
      className={`from-background via-surface to-surface-variant theme-transition relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br ${className} `}
      aria-label='Hero section'
    >
      <ParticleBackground />
      <div className='from-background/80 to-surface/20 absolute inset-0 bg-gradient-to-t via-transparent' />

      <motion.div
        className={`relative z-10 container mx-auto text-center ${containerPadding}`}
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
          className='text-hierarchy-secondary mx-auto mb-12 max-w-3xl text-lg leading-relaxed sm:text-xl'
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
