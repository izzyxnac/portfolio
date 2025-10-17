'use client';

import { useState, useRef } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { BaseComponentProps } from '@/lib/types/components';

export interface SearchProps extends BaseComponentProps {
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

function SearchInput({
  query,
  onQueryChange,
  onClear,
  onKeyDown,
  placeholder,
  disabled,
  autoFocus,
  isFocused,
  onFocus,
  onBlur,
  inputRef,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  onClear: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  placeholder: string;
  disabled: boolean;
  autoFocus: boolean;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  return (
    <div className='relative'>
      <SearchIcon
        size={20}
        className='text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 transform'
        aria-hidden='true'
      />

      <input
        ref={inputRef}
        type='search'
        value={query}
        onChange={e => onQueryChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        className={`bg-background border-border text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border py-2 pr-10 pl-10 transition-colors focus:border-transparent focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${isFocused ? 'ring-ring ring-2' : ''} `}
        aria-label='Search'
      />

      {query && (
        <button
          type='button'
          onClick={onClear}
          className='text-muted-foreground hover:text-foreground focus:ring-ring absolute top-1/2 right-3 -translate-y-1/2 transform rounded-sm p-1 transition-colors focus:ring-2 focus:outline-none'
          aria-label='Clear search'
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export function Search({
  placeholder = 'Search...',
  disabled = false,
  autoFocus = false,
  className = '',
  ...props
}: SearchProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Future: implement search functionality
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div className={`relative ${className}`} {...props}>
      <form onSubmit={handleSubmit} role='search'>
        <SearchInput
          query={query}
          onQueryChange={setQuery}
          onClear={handleClear}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          isFocused={isFocused}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          inputRef={inputRef}
        />
      </form>

      {/* Future: Search results dropdown will go here */}
      <div className='sr-only' aria-live='polite' aria-atomic='true'>
        {query ? `Searching for: ${query}` : ''}
      </div>
    </div>
  );
}
