'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface TypingAnimationProps {
  skills: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

const useTypingEffect = (
  skills: string[],
  typingSpeed: number,
  deletingSpeed: number,
  pauseDuration: number
) => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setCurrentText(skills.join(' • '));
      return;
    }

    const currentSkill = skills[currentSkillIndex] || '';

    const timeout = setTimeout(
      () => {
        if (isPaused) {
          setIsPaused(false);
          setIsDeleting(true);
          return;
        }

        if (isDeleting) {
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentSkillIndex(prev => (prev + 1) % skills.length);
          }
        } else {
          if (currentText.length < currentSkill.length) {
            setCurrentText(currentSkill.slice(0, currentText.length + 1));
          } else {
            setIsPaused(true);
          }
        }
      },
      isPaused ? pauseDuration : isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    isDeleting,
    isPaused,
    currentSkillIndex,
    skills,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return currentText;
};

export const TypingAnimation = ({
  skills,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className = '',
}: TypingAnimationProps) => {
  const currentText = useTypingEffect(skills, typingSpeed, deletingSpeed, pauseDuration);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className='flex min-h-[1.2em] items-center bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text font-mono text-2xl text-transparent sm:text-3xl lg:text-4xl'>
        <span
          className='inline-block'
          aria-live='polite'
          aria-label={`Current skill: ${currentText}`}
        >
          {currentText}
        </span>
        <motion.span
          className='ml-1 inline-block h-8 w-0.5 bg-gradient-to-b from-blue-400 to-purple-400 sm:h-10 lg:h-12'
          animate={{
            opacity: [0, 0, 1, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatDelay: 0,
            ease: 'linear',
          }}
          aria-hidden='true'
        />
      </div>
    </div>
  );
};

interface ParallaxElementProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export const ParallaxElement = ({
  children,
  offset = 50,
  className = '',
}: ParallaxElementProps) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, offset]);
  const springY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div className={className} style={{ y: springY }}>
      {children}
    </motion.div>
  );
};

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeInView = ({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
}: FadeInViewProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
};

interface ScaleOnHoverProps {
  children: React.ReactNode;
  scale?: number;
  className?: string;
}

export const ScaleOnHover = ({ children, scale = 1.05, className = '' }: ScaleOnHoverProps) => {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale,
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
      whileTap={{
        scale: scale * 0.95,
        transition: { duration: 0.1 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default TypingAnimation;
