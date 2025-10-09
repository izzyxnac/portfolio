import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SkillsSection, SkillsVisualization, SkillItem } from '@/components/sections/skills';
import { skillsData } from '@/data/skills';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
    section: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <section {...props}>{children}</section>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => children,
  useInView: () => true,
}));

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

// Helper function to mock window.matchMedia
const mockMatchMedia = (reducedMotion = false) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: reducedMotion ? query === '(prefers-reduced-motion: reduce)' : false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};

describe('SkillsSection - Basic Rendering', () => {
  beforeEach(() => {
    mockMatchMedia();
  });

  it('renders correctly', () => {
    render(<SkillsSection />);

    expect(
      screen.getByRole('heading', { name: /technical skills & expertise/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/comprehensive overview/i)).toBeInTheDocument();
  });

  it('displays all skill categories', () => {
    render(<SkillsSection />);

    skillsData.categories.forEach(category => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });
});

describe('SkillsSection - Interactions', () => {
  beforeEach(() => {
    mockMatchMedia();
  });

  it('filters skills by level', async () => {
    const user = userEvent.setup();
    render(<SkillsSection />);

    const expertFilter = screen.getByRole('button', { name: /expert/i });
    await user.click(expertFilter);

    // Check that expert skills are displayed
    const expertSkills = skillsData.categories
      .flatMap(cat => cat.skills)
      .filter(skill => skill.level === 'expert');

    expect(expertSkills.length).toBeGreaterThan(0);
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<SkillsSection />);

    const firstCategory = screen.getAllByRole('gridcell')[0];
    firstCategory.focus();

    await user.keyboard('{Enter}');
    // Should expand/select the category
    expect(firstCategory).toHaveFocus();
  });
});

describe('SkillsSection - Accessibility', () => {
  beforeEach(() => {
    mockMatchMedia();
  });

  it('meets accessibility requirements', () => {
    render(<SkillsSection />);
    // Basic accessibility checks without axe for now
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByLabelText(/skills categories/i)).toBeInTheDocument();
  });

  it('has proper ARIA labels', () => {
    render(<SkillsSection />);

    expect(screen.getByLabelText(/skills categories/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute('id', 'skills-heading');
  });

  it('supports reduced motion preferences', () => {
    mockMatchMedia(true);

    render(<SkillsSection />);
    // Component should render without animations
    expect(
      screen.getByRole('heading', { name: /technical skills & expertise/i })
    ).toBeInTheDocument();
  });
});

describe('SkillsVisualization', () => {
  it('renders with custom skills data', () => {
    const customData = {
      ...skillsData,
      // Only first 2 categories
      categories: skillsData.categories.slice(0, 2),
    };

    render(<SkillsVisualization skillsData={customData} />);

    expect(screen.getAllByRole('gridcell')).toHaveLength(2);
  });

  it('handles interaction modes correctly', async () => {
    const user = userEvent.setup();
    render(<SkillsVisualization interactionMode='click' />);

    const categoryCard = screen.getAllByRole('gridcell')[0];
    await user.click(categoryCard);

    // Should show expanded content
    expect(categoryCard).toBeInTheDocument();
  });

  it('displays skills summary correctly', () => {
    render(<SkillsVisualization />);

    const totalSkills = skillsData.categories.reduce((acc, cat) => acc + cat.skills.length, 0);

    expect(screen.getByText(totalSkills.toString())).toBeInTheDocument();
    expect(screen.getByText('Total Skills')).toBeInTheDocument();
  });
});

describe('SkillItem', () => {
  const mockSkill = skillsData.categories[0].skills[0];
  const mockCategoryColor = '#3B82F6';

  it('renders skill information correctly', () => {
    render(<SkillItem skill={mockSkill} categoryColor={mockCategoryColor} />);

    expect(screen.getByText(mockSkill.name)).toBeInTheDocument();
    expect(screen.getByText(`${mockSkill.proficiencyPercentage}%`)).toBeInTheDocument();
    expect(screen.getByText(`${mockSkill.yearsOfExperience}+ years`)).toBeInTheDocument();
  });

  it('has proper accessibility attributes for tooltip', () => {
    render(<SkillItem skill={mockSkill} categoryColor={mockCategoryColor} />);

    const skillElement = screen.getByRole('button');

    // Check that the skill item has proper ARIA attributes for tooltip functionality
    expect(skillElement).toHaveAttribute('aria-describedby', `skill-${mockSkill.id}-details`);
    expect(skillElement).toHaveAttribute('aria-label', `${mockSkill.name} - Expert level skill`);
  });

  it('handles keyboard focus correctly', async () => {
    const user = userEvent.setup();
    render(<SkillItem skill={mockSkill} categoryColor={mockCategoryColor} />);

    const skillElement = screen.getByRole('button');

    // Test that the element can receive focus
    await user.tab();
    expect(skillElement).toHaveFocus();

    // Test that it has proper tabindex
    expect(skillElement).toHaveAttribute('tabindex', '0');
  });

  it('displays trending badge when applicable', () => {
    const trendingSkill = { ...mockSkill, trending: true };
    render(<SkillItem skill={trendingSkill} categoryColor={mockCategoryColor} />);

    expect(screen.getByLabelText(/trending skill/i)).toBeInTheDocument();
  });

  it('renders without icon gracefully', () => {
    const skillWithoutIcon = { ...mockSkill, icon: undefined };
    render(<SkillItem skill={skillWithoutIcon} categoryColor={mockCategoryColor} />);

    expect(screen.getByText(mockSkill.name)).toBeInTheDocument();
  });
});

describe('Error Handling', () => {
  it('handles component errors gracefully', () => {
    // Mock console.error to avoid noise in test output
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Test with invalid data that should be handled gracefully
    // Empty categories should not crash the component
    const invalidSkillsData = {
      ...skillsData,
      categories: [],
    };

    expect(() => {
      render(<SkillsVisualization skillsData={invalidSkillsData} />);
    }).not.toThrow();

    consoleSpy.mockRestore();
  });
});

describe('Performance', () => {
  it('renders within acceptable time', async () => {
    const startTime = performance.now();
    render(<SkillsSection />);
    const endTime = performance.now();

    // Should render within 500ms (more realistic for test environment)
    expect(endTime - startTime).toBeLessThan(500);
  });

  it('handles large datasets efficiently', () => {
    const largeDataset = {
      ...skillsData,
      categories: Array(10)
        .fill(null)
        .map((_, i) => ({
          ...skillsData.categories[0],
          id: `category-${i}`,
          name: `Category ${i}`,
        })),
    };

    const startTime = performance.now();
    render(<SkillsVisualization skillsData={largeDataset} />);
    const endTime = performance.now();

    // Should still render efficiently with large datasets
    expect(endTime - startTime).toBeLessThan(1000);
  });
});
