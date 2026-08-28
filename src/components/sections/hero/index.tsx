'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';

const ParticleBackground = dynamic(
  () => import('./particles').then(mod => mod.ParticleBackground),
  {
    ssr: false,
  }
);
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
  githubUrl?: string;
  linkedinUrl?: string;
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
          sizes='(max-width: 640px) 160px, (max-width: 1024px) 240px, 320px'
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
    <h2 className='text-primary mx-auto text-center text-xl font-medium sm:text-2xl lg:text-3xl'>
      {tagline}
    </h2>
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
      className='bg-primary hover:bg-primary/90 theme-transition touch-target-recommended min-w-[180px] rounded-full px-8 py-6 text-lg font-bold text-white shadow-xl hover:scale-105 active:scale-95'
      aria-label='View my projects'
    >
      View Projects
    </Button>
    <Button
      onClick={onGetInTouch}
      variant='outline'
      size='lg'
      className='border-primary/20 hover:border-primary text-primary theme-transition hover:bg-primary/5 touch-target-recommended min-w-[180px] rounded-full px-8 py-6 text-lg font-semibold hover:scale-105 active:scale-95'
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
    githubUrl,
    linkedinUrl,
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

        {(githubUrl || linkedinUrl) && (
          <motion.div
            variants={itemVariants}
            className='mt-12 flex items-center justify-center gap-6'
          >
            {githubUrl && (
              <a
                href={githubUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='text-muted-foreground hover:text-primary transition-colors'
                aria-label='GitHub Profile'
              >
                <GitHubIcon />
              </a>
            )}
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='text-muted-foreground hover:text-primary transition-colors'
                aria-label='LinkedIn Profile'
              >
                <LinkedInIcon />
              </a>
            )}
          </motion.div>
        )}

        {renderScrollIndicator(itemVariants)}
      </motion.div>
    </section>
  );
};

function GitHubIcon() {
  return (
    <svg className='h-7 w-7' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
      <path
        fillRule='evenodd'
        d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
        clipRule='evenodd'
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className='h-7 w-7' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
      <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
    </svg>
  );
}

export default HeroSection;
