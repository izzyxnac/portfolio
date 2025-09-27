// Utility Types
// This file contains utility TypeScript types used throughout the application

// Generic utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

// Array utility types
export type NonEmptyArray<T> = [T, ...T[]];
export type ArrayElement<T> = T extends (infer U)[] ? U : never;

// Function utility types
export type AsyncFunction<T extends unknown[], R> = (...args: T) => Promise<R>;
export type EventHandler<T = unknown> = (event: T) => void;
export type AsyncEventHandler<T = unknown> = (event: T) => Promise<void>;

// Form utility types
export type FormState<T> = {
  data: T;
  errors: Partial<Record<keyof T, string>>;
  loading: boolean;
  touched: Partial<Record<keyof T, boolean>>;
};

export type FormField<T> = {
  value: T;
  error?: string;
  touched: boolean;
  onChange: (value: T) => void;
  onBlur: () => void;
};

// API utility types
export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

export type ApiState<T> = {
  data: T | null;
  status: ApiStatus;
  error: string | null;
};

export type PaginationState = {
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
};

// Theme utility types
export type ThemeMode = 'light' | 'dark' | 'system';
export type ColorScheme = 'blue' | 'green' | 'purple' | 'orange' | 'red';

export type ThemeConfig = {
  mode: ThemeMode;
  colorScheme: ColorScheme;
  reducedMotion: boolean;
  fontSize: 'sm' | 'md' | 'lg';
};

// Animation utility types
export type AnimationDirection = 'up' | 'down' | 'left' | 'right';
export type AnimationEasing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';

export type AnimationConfig = {
  duration: number;
  delay: number;
  easing: AnimationEasing;
  direction?: AnimationDirection;
};

// Responsive utility types
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

// Search utility types
export type SearchFilters = {
  category?: string;
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  sortBy?: 'relevance' | 'date' | 'title';
  sortOrder?: 'asc' | 'desc';
};

// File utility types
export type FileType = 'image' | 'video' | 'audio' | 'document' | 'archive' | 'other';

export type FileInfo = {
  name: string;
  size: number;
  type: FileType;
  mimeType: string;
  url: string;
  lastModified: Date;
};

// Error utility types
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

export type AppError = {
  code: string;
  message: string;
  severity: ErrorSeverity;
  context?: Record<string, unknown>;
  timestamp: Date;
};

// Navigation utility types
export type RouteParams = Record<string, string>;
export type QueryParams = Record<string, string | string[] | undefined>;

export type NavigationState = {
  currentPath: string;
  previousPath?: string;
  params: RouteParams;
  query: QueryParams;
};

// Performance utility types
export type PerformanceMetric = {
  name: string;
  value: number;
  unit: 'ms' | 'bytes' | 'count' | 'percentage';
  timestamp: Date;
};

// Accessibility utility types
export type AriaRole =
  | 'button'
  | 'link'
  | 'heading'
  | 'banner'
  | 'navigation'
  | 'main'
  | 'complementary'
  | 'contentinfo'
  | 'dialog'
  | 'alertdialog'
  | 'alert'
  | 'status'
  | 'log'
  | 'marquee'
  | 'timer'
  | 'tablist'
  | 'tab'
  | 'tabpanel';

export type AriaAttributes = {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  'aria-disabled'?: boolean;
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  role?: AriaRole;
};
