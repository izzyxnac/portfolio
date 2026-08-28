'use client';

import { HeroSection } from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import { SkillsSection } from '@/components/sections/skills/skills-section';
import { heroData, profileData } from '@/data';
import { skillsData } from '@/data/skills';

export function HomePage() {
  const handleViewProjects = () => {
    window.location.href = '/projects';
  };

  const handleGetInTouch = () => {
    window.location.href = '/contact';
  };

  return (
    <>
      <HeroSection
        {...heroData}
        githubUrl={profileData.profile.github}
        linkedinUrl={profileData.profile.linkedin}
        onViewProjects={handleViewProjects}
        onGetInTouch={handleGetInTouch}
        animated={true}
      />
      <AboutSection profileData={profileData} />
      <SkillsSection skillsData={skillsData} />
    </>
  );
}
