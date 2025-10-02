'use client';

import { HeroSection } from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import { heroData, profileData } from '@/data';

const handleViewProjects = () => {
  // TODO: Navigate to projects page when implemented
  // Placeholder implementation - will be replaced with actual navigation
};

const handleGetInTouch = () => {
  // TODO: Navigate to contact page when implemented
  // Placeholder implementation - will be replaced with actual navigation
};

export default function Home() {
  return (
    <main>
      <HeroSection
        {...heroData}
        onViewProjects={handleViewProjects}
        onGetInTouch={handleGetInTouch}
        animated={true}
      />
      <AboutSection profileData={profileData} />
    </main>
  );
}
