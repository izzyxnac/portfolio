// Component Prop Types
// This file contains TypeScript types for React component props

import { ReactNode } from 'react';
import { Project, BlogPost, Technology, Testimonial } from './models';

// Base component props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Layout component props
export interface HeaderProps extends BaseComponentProps {
  absolute?: boolean;
}

export interface FooterProps extends BaseComponentProps {
  minimal?: boolean;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  external?: boolean;
  icon?: string;
}

export interface NavigationProps extends BaseComponentProps {
  items: NavigationItem[];
  height?: string;
}

export interface MobileMenuProps extends BaseComponentProps {
  isOpen: boolean;
  onToggle: () => void;
  items: NavigationItem[];
}

// Section component props
export interface HeroSectionProps extends BaseComponentProps {
  title: string;
  subtitle?: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundImage?: string;
  animated?: boolean;
}

export interface ProjectsSectionProps extends BaseComponentProps {
  projects: Project[];
  title?: string;
  description?: string;
  showAll?: boolean;
  featured?: boolean;
}

export interface ProjectCardProps extends BaseComponentProps {
  project: Project;
  variant?: 'default' | 'featured' | 'minimal';
  showMetrics?: boolean;
}

export interface SkillsSectionProps extends BaseComponentProps {
  skills: Technology[];
  title?: string;
  description?: string;
  grouped?: boolean;
}

export interface SkillItemProps extends BaseComponentProps {
  skill: Technology;
  showProficiency?: boolean;
  variant?: 'card' | 'badge' | 'minimal';
}

export interface BlogSectionProps extends BaseComponentProps {
  posts: BlogPost[];
  title?: string;
  description?: string;
  showAll?: boolean;
  featured?: boolean;
}

export interface BlogCardProps extends BaseComponentProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'minimal';
  showExcerpt?: boolean;
}

export interface TestimonialsSectionProps extends BaseComponentProps {
  testimonials: Testimonial[];
  title?: string;
  description?: string;
  carousel?: boolean;
}

export interface TestimonialCardProps extends BaseComponentProps {
  testimonial: Testimonial;
  variant?: 'default' | 'minimal';
  showRating?: boolean;
}

// Form component props
export interface ContactFormProps extends BaseComponentProps {
  onSubmit: (data: ContactFormData) => void | Promise<void>;
  loading?: boolean;
  success?: boolean;
  error?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}

export interface NewsletterFormProps extends BaseComponentProps {
  onSubmit: (data: NewsletterFormData) => void | Promise<void>;
  loading?: boolean;
  success?: boolean;
  error?: string;
  inline?: boolean;
}

export interface NewsletterFormData {
  email: string;
  firstName?: string;
}

// UI component props
export interface ButtonProps extends BaseComponentProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export interface CardProps extends BaseComponentProps {
  title?: string;
  description?: string;
  image?: string;
  href?: string;
  variant?: 'default' | 'elevated' | 'outlined';
}

export interface ModalProps extends BaseComponentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Loading and feedback component props
export interface LoadingSpinnerProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export interface SkeletonProps extends BaseComponentProps {
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
}

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// SEO component props
export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: Record<string, unknown>;
}

// Animation component props
export interface AnimationProps extends BaseComponentProps {
  animation?: 'fadeIn' | 'slideIn' | 'scaleIn' | 'bounceIn';
  duration?: number;
  delay?: number;
  trigger?: 'viewport' | 'hover' | 'click';
}
