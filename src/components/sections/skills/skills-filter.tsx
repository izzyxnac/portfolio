import { SkillCategory } from '@/lib/types/models';

interface SkillsFilterProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  categories: SkillCategory[];
}

const skillLevels: { value: string; label: string; color: string }[] = [
  { value: 'all', label: 'All Skills', color: 'bg-gray-100 text-gray-800' },
  { value: 'expert', label: 'Expert', color: 'bg-green-100 text-green-800' },
  { value: 'advanced', label: 'Advanced', color: 'bg-blue-100 text-blue-800' },
  { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'beginner', label: 'Beginner', color: 'bg-gray-100 text-gray-600' },
];

export const SkillsFilter = ({ currentFilter, onFilterChange, categories }: SkillsFilterProps) => {
  const getSkillCount = (level: string): number => {
    if (level === 'all') {
      return categories.reduce((acc, cat) => acc + cat.skills.length, 0);
    }
    return categories.reduce(
      (acc, cat) => acc + cat.skills.filter(skill => skill.level === level).length,
      0
    );
  };

  return (
    <div className='mb-8 flex flex-wrap justify-center gap-2'>
      {skillLevels.map(level => {
        const count = getSkillCount(level.value);
        const isActive = currentFilter === level.value;

        return (
          <button
            key={level.value}
            onClick={() => onFilterChange(level.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-gray-900 ${
              isActive
                ? 'scale-105 transform bg-blue-600 text-white shadow-lg'
                : `${level.color} hover:scale-105 hover:shadow-md dark:bg-gray-700 dark:text-gray-200`
            } `}
            aria-pressed={isActive}
            aria-label={`Filter by ${level.label} (${count} skills)`}
          >
            {level.label}
            <span className='ml-2 text-xs opacity-75'>({count})</span>
          </button>
        );
      })}
    </div>
  );
};
