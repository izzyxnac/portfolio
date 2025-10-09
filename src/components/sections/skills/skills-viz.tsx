'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SkillsData, SkillCategory } from '@/lib/types/models';
import { skillsData } from '@/data/skills';
import { SkillCategoryCard } from './skill-category-card';
import { SkillsFilter } from './skills-filter';
import { SkillsContainer } from './skills-container';
import { SkillsHeader } from './skills-header';
import { SkillsSummary } from './skills-summary';

interface SkillsVisualizationProps {
  skillsData?: SkillsData;
  interactionMode?: 'hover' | 'click' | 'auto';
  className?: string;
}

const useSkillsLogic = (data: SkillsData, interactionMode: string) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filterLevel, setFilterLevel] = useState<string>('all');

  const filteredCategories = data.categories.filter(category => {
    if (filterLevel === 'all') return true;
    return category.skills.some(skill => skill.level === filterLevel);
  });

  const sortedCategories = filteredCategories.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.order - b.order;
  });

  const handleCategorySelect = (categoryId: string) => {
    if (interactionMode === 'click') {
      setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, categoryId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCategorySelect(categoryId);
    }
  };

  return {
    selectedCategory,
    filterLevel,
    setFilterLevel,
    sortedCategories,
    handleCategorySelect,
    handleKeyDown,
  };
};

// Animation variants for the container
const getContainerVariants = () => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
});

// Skills grid component
const SkillsGrid = ({
  sortedCategories,
  selectedCategory,
  interactionMode,
  filterLevel,
  handleKeyDown,
  handleCategorySelect,
  isInView,
}: {
  sortedCategories: SkillCategory[];
  selectedCategory: string | null;
  interactionMode: 'hover' | 'click' | 'auto';
  filterLevel: string;
  handleKeyDown: (event: React.KeyboardEvent, categoryId: string) => void;
  handleCategorySelect: (categoryId: string) => void;
  isInView: boolean;
}) => (
  <motion.div
    variants={getContainerVariants()}
    initial='hidden'
    animate={isInView ? 'visible' : 'hidden'}
    className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'
    role='grid'
    aria-label='Skills categories'
  >
    {sortedCategories.map(category => (
      <motion.div
        key={category.id}
        variants={{
          hidden: { opacity: 0, y: 50, scale: 0.9 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 100,
              damping: 15,
            },
          },
        }}
        role='gridcell'
        tabIndex={0}
        onKeyDown={e => handleKeyDown(e, category.id)}
        onClick={() => handleCategorySelect(category.id)}
        className='rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-gray-900'
      >
        <SkillCategoryCard
          category={category}
          isSelected={selectedCategory === category.id}
          interactionMode={interactionMode}
          filterLevel={filterLevel}
        />
      </motion.div>
    ))}
  </motion.div>
);

export const SkillsVisualization = ({
  skillsData: customSkillsData,
  interactionMode = 'hover',
  className = '',
}: SkillsVisualizationProps) => {
  const data = customSkillsData || skillsData;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const {
    selectedCategory,
    filterLevel,
    setFilterLevel,
    sortedCategories,
    handleCategorySelect,
    handleKeyDown,
  } = useSkillsLogic(data, interactionMode);

  return (
    <section ref={ref} className={className} aria-labelledby='skills-heading'>
      <SkillsContainer>
        <SkillsHeader isInView={isInView} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='mb-8'
        >
          <SkillsFilter
            currentFilter={filterLevel}
            onFilterChange={setFilterLevel}
            categories={data.categories}
          />
        </motion.div>

        <SkillsGrid
          sortedCategories={sortedCategories}
          selectedCategory={selectedCategory}
          interactionMode={interactionMode}
          filterLevel={filterLevel}
          handleKeyDown={handleKeyDown}
          handleCategorySelect={handleCategorySelect}
          isInView={isInView}
        />

        <SkillsSummary data={data} isInView={isInView} />
      </SkillsContainer>
    </section>
  );
};
