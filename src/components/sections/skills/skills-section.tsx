'use client';

import { Suspense } from 'react';
import { SkillsVisualization } from './skills-viz';
import { SkillsErrorBoundary } from './skills-error-boundary';
import { SkillsLoading } from './skills-loading';
import { SkipNavigation, useReducedMotion } from './accessibility-utils';
import { SkillsData } from '@/lib/types/models';

interface SkillsSectionProps {
  skillsData?: SkillsData;
  className?: string;
}

export const SkillsSection = ({ skillsData, className = '' }: SkillsSectionProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id='skills' className={`relative ${className}`} aria-labelledby='skills-heading'>
      <SkipNavigation />

      <SkillsErrorBoundary>
        <Suspense fallback={<SkillsLoading />}>
          <div id='skills-content'>
            <SkillsVisualization
              skillsData={skillsData}
              interactionMode={prefersReducedMotion ? 'click' : 'hover'}
              className='bg-gray-50 dark:bg-gray-900'
            />
          </div>
        </Suspense>
      </SkillsErrorBoundary>
    </section>
  );
};
