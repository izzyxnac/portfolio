// Data Model Types
// This file contains TypeScript types for data models used throughout the application

// Base model interface
export interface BaseModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Project model
export interface Project extends BaseModel {
  title: string;
  description: string;
  longDescription?: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  technologies: Technology[];
  category: ProjectCategory;
  images: ProjectImage[];
  demoUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  startDate: Date;
  endDate?: Date;
  client?: string;
  testimonial?: Testimonial;
  metrics?: ProjectMetrics;
}

export interface ProjectImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  order: number;
}

export interface ProjectMetrics {
  performanceImprovement?: string;
  userGrowth?: string;
  costSavings?: string;
  timeToMarket?: string;
  customMetrics?: Record<string, string>;
}

export type ProjectCategory =
  | 'web-development'
  | 'ai-ml'
  | 'data-analysis'
  | 'automation'
  | 'mobile'
  | 'consulting';

// Technology/Skill model
export interface Technology {
  id: string;
  name: string;
  category: TechnologyCategory;
  proficiency: 1 | 2 | 3 | 4 | 5; // 1 = Beginner, 5 = Expert
  yearsOfExperience: number;
  icon?: string;
  color?: string;
  description?: string;
}

export type TechnologyCategory =
  | 'programming-languages'
  | 'frameworks'
  | 'databases'
  | 'cloud-platforms'
  | 'ai-ml-tools'
  | 'devops'
  | 'design-tools';

// Blog post model
export interface BlogPost extends BaseModel {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  publishedAt?: Date;
  readingTime: number;
  tags: Tag[];
  category: BlogCategory;
  author: Author;
  seo: SEOData;
  images: BlogImage[];
  relatedPosts?: string[]; // Array of post IDs
}

export interface BlogImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

export type BlogCategory =
  | 'ai-ml'
  | 'web-development'
  | 'data-science'
  | 'tutorials'
  | 'industry-insights'
  | 'personal';

export interface Tag {
  id: string;
  name: string;
  slug: string;
  color?: string;
}

// Author model
export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  email: string;
  website?: string;
  social: SocialLinks;
}

// Testimonial model
export interface Testimonial extends BaseModel {
  content: string;
  author: string;
  position: string;
  company: string;
  avatar?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  projectId?: string;
  featured: boolean;
}

// Contact/Lead model
export interface Contact extends BaseModel {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  status: 'new' | 'responded' | 'closed';
  source: 'contact-form' | 'newsletter' | 'project-inquiry';
}

// Social links
export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  website?: string;
  youtube?: string;
  medium?: string;
}

// SEO data
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

// Analytics data
export interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  averageSessionDuration: number;
  topPages: PageAnalytics[];
  topReferrers: ReferrerAnalytics[];
}

export interface PageAnalytics {
  path: string;
  views: number;
  uniqueViews: number;
}

export interface ReferrerAnalytics {
  source: string;
  visits: number;
  percentage: number;
}
