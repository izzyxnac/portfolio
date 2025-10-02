import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import AboutSection from '@/components/sections/about';
import { PersonalProfile, ProfessionalJourney } from '@/lib/types/models';

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    section: 'section',
  },
}));

// Mock Next.js Image
vi.mock('next/image', () => ({
  default: 'img',
}));

// Test Data
const mockProfile: PersonalProfile = {
  id: 'test-profile',
  name: 'Test Developer',
  title: 'AI/ML Developer',
  tagline: 'Test tagline for AI development',
  bio: 'Test bio describing the developer journey and expertise in AI/ML.',
  location: 'Remote • Global',
  email: 'test@example.com',
  profileImage: {
    url: '/test-image.jpg',
    alt: 'Test Developer Profile',
    width: 400,
    height: 400,
  },
  availability: 'available',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

const mockJourney: ProfessionalJourney = {
  id: 'test-journey',
  profileId: 'test-profile',
  milestones: [],
  achievements: [],
  timeline: [],
};

const mockProfileData = {
  profile: mockProfile,
  journey: mockJourney,
};

describe('AboutSection', () => {
  it('renders the about section', () => {
    render(<AboutSection profileData={mockProfileData} />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('displays profile information', () => {
    render(<AboutSection profileData={mockProfileData} />);
    expect(screen.getByText(mockProfile.name)).toBeInTheDocument();
    expect(screen.getByText(mockProfile.title)).toBeInTheDocument();
  });
});
