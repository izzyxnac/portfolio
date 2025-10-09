'use client';

import { ReactNode } from 'react';

interface SkillsContainerProps {
  children: ReactNode;
  className?: string;
}

export const SkillsContainer = ({ children, className = '' }: SkillsContainerProps) => {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 ${className} `}
    >
      {children}
    </div>
  );
};
