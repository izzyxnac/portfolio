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
  // 1 = Beginner, 5 = Expert
  proficiency: 1 | 2 | 3 | 4 | 5;
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
  // Array of post IDs
  relatedPosts?: string[];
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

// Personal Profile model
export interface PersonalProfile {
  id: string;
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  profileImage: ImageAsset;
  availability: AvailabilityStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ImageAsset {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  placeholder?: string;
}

export type AvailabilityStatus = 'available' | 'busy' | 'unavailable';

// Professional Journey model
export interface ProfessionalJourney {
  id: string;
  profileId: string;
  milestones: JourneyMilestone[];
  achievements: Achievement[];
  timeline: TimelineEvent[];
}

export interface JourneyMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  location?: string;
  type: MilestoneType;
  importance: 'high' | 'medium' | 'low';
  tags: string[];
  order: number;
}

export type MilestoneType = 'education' | 'career' | 'achievement' | 'certification' | 'project';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  metrics?: string;
  icon?: string;
  date: Date;
  featured: boolean;
}

export type AchievementCategory =
  | 'technical'
  | 'leadership'
  | 'innovation'
  | 'education'
  | 'recognition';

export interface TimelineEvent {
  id: string;
  date: Date;
  title: string;
  description: string;
  type: 'milestone' | 'achievement' | 'project';
  importance: 'high' | 'medium' | 'low';
}

// Skills Data Models (Story 2.3)
export interface SkillsData {
  id: string;
  profileId: string;
  categories: SkillCategory[];
  lastUpdated: Date;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  skills: Skill[];
  order: number;
  featured: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  experience: string;
  yearsOfExperience: number;
  proficiencyPercentage: number;
  description?: string;
  icon?: string;
  relatedProjects: string[];
  certifications: string[];
  lastUsed: Date;
  trending: boolean;
}

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
