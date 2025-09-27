// API Response Types
// This file contains TypeScript types for API responses and requests

// Base API response structure
export interface ApiResponse<T = unknown> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Error response structure
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Pagination structure
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}

// Contact form API types
export interface ContactFormRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}

export interface ContactFormResponse extends ApiResponse<{ id: string }> {}

// Newsletter subscription API types
export interface NewsletterSubscriptionRequest {
  email: string;
  firstName?: string;
}

export interface NewsletterSubscriptionResponse extends ApiResponse<{ subscribed: boolean }> {}

// Analytics API types
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, unknown>;
  timestamp?: string;
}

export interface AnalyticsResponse extends ApiResponse<{ tracked: boolean }> {}

// Search API types
export interface SearchRequest {
  query: string;
  category?: 'all' | 'projects' | 'blog' | 'skills';
  limit?: number;
  offset?: number;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'project' | 'blog' | 'skill';
  url: string;
  relevance: number;
}

export interface SearchResponse extends PaginatedResponse<SearchResult> {}

// Project submission API types (for potential client projects)
export interface ProjectSubmissionRequest {
  name: string;
  email: string;
  company?: string;
  projectType: 'web-development' | 'ai-ml-consulting' | 'data-analysis' | 'automation' | 'other';
  budget: 'under-5k' | '5k-15k' | '15k-50k' | '50k-plus' | 'discuss';
  timeline: 'asap' | '1-month' | '3-months' | '6-months' | 'flexible';
  description: string;
  website?: string;
}

export interface ProjectSubmissionResponse extends ApiResponse<{ id: string; status: string }> {}
