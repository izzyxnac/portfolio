/**
 * Shared validation schemas using Zod
 * For use with React Hook Form and server-side validation
 */

import { z } from "zod";

// Common validation patterns
export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must be less than 50 characters")
  .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces");

export const phoneSchema = z
  .string()
  .regex(/^\+?[\d\s\-\(\)]+$/, "Please enter a valid phone number")
  .optional();

export const urlSchema = z
  .string()
  .url("Please enter a valid URL")
  .optional()
  .or(z.literal(""));

// Contact form validation schema
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
  phone: phoneSchema,
});

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: emailSchema,
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(30, "First name must be less than 30 characters")
    .optional(),
});

// Project submission schema (for potential client projects)
export const projectSubmissionSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  company: z
    .string()
    .max(100, "Company name must be less than 100 characters")
    .optional(),
  projectType: z.enum([
    "web-development",
    "ai-ml-consulting",
    "data-analysis",
    "automation",
    "other"
  ]),
  budget: z.enum([
    "under-5k",
    "5k-15k",
    "15k-50k",
    "50k-plus",
    "discuss"
  ]),
  timeline: z.enum([
    "asap",
    "1-month",
    "3-months",
    "6-months",
    "flexible"
  ]),
  description: z
    .string()
    .min(20, "Project description must be at least 20 characters")
    .max(2000, "Project description must be less than 2000 characters"),
  website: urlSchema,
});

// Blog comment schema (if comments are implemented)
export const commentSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  website: urlSchema,
  content: z
    .string()
    .min(5, "Comment must be at least 5 characters")
    .max(500, "Comment must be less than 500 characters"),
});

// Search schema
export const searchSchema = z.object({
  query: z
    .string()
    .min(1, "Search query is required")
    .max(100, "Search query must be less than 100 characters"),
  category: z.enum(["all", "projects", "blog", "skills"]).optional(),
});

// Type exports for use in components
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;
export type ProjectSubmissionData = z.infer<typeof projectSubmissionSchema>;
export type CommentData = z.infer<typeof commentSchema>;
export type SearchData = z.infer<typeof searchSchema>;

// Validation helper functions
export const validateEmail = (email: string): boolean => {
  try {
    emailSchema.parse(email);
    return true;
  } catch {
    return false;
  }
};

export const validateUrl = (url: string): boolean => {
  try {
    urlSchema.parse(url);
    return true;
  } catch {
    return false;
  }
};

// Form validation error formatter
export const formatValidationErrors = (errors: z.ZodError) => {
  if (!errors.issues || !Array.isArray(errors.issues)) {
    return {};
  }
  
  return errors.issues.reduce((acc: Record<string, string>, issue: z.ZodIssue) => {
    const path = issue.path.join(".");
    acc[path] = issue.message;
    return acc;
  }, {} as Record<string, string>);
};
