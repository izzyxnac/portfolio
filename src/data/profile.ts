import {
  PersonalProfile,
  ProfessionalJourney,
  JourneyMilestone,
  Achievement,
  TimelineEvent,
} from '@/lib/types/models';

import { config } from '@/lib/constants';

// Personal Profile Data
export const personalProfile: PersonalProfile = {
  id: 'oxcodexo-profile',
  name: 'oxcodexo',
  title: 'AI/ML Developer & Enterprise Solutions Architect',
  tagline: 'Bridging Enterprise Software with Cutting-Edge AI/ML',
  bio: `Passionate AI/ML developer with a unique journey from traditional enterprise 
software development to cutting-edge artificial intelligence. I specialize in building 
scalable machine learning systems, intelligent automation, and data-driven solutions 
that transform business operations. My approach combines deep technical expertise with 
practical business understanding, ensuring AI implementations deliver real value.`,
  location: 'Remote • Global',
  email: config.site.author.email,
  profileImage: {
    url: '/images/profile/oxcodexo.png',
    alt: 'oxcodexo - AI/ML Developer & Enterprise Solutions Architect',
    width: 400,
    height: 400,
    placeholder: '/images/profile/placeholder.svg',
  },
  availability: 'available',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date(),
};

// Professional Journey Milestones
export const journeyMilestones: JourneyMilestone[] = [
  {
    id: 'milestone-1',
    year: '2018',
    title: 'Computer Science Foundation',
    description: `Started my journey in computer science, building strong fundamentals 
in algorithms, data structures, and software engineering principles.`,
    location: 'University',
    type: 'education',
    importance: 'high',
    tags: ['Computer Science', 'Algorithms', 'Programming'],
    order: 1,
  },
  {
    id: 'milestone-2',
    year: '2020',
    title: 'Enterprise Software Development',
    description: `Entered the enterprise software world, developing large-scale 
applications and learning the intricacies of business-critical systems.`,
    location: 'Enterprise',
    type: 'career',
    importance: 'high',
    tags: ['Enterprise Software', 'Full-Stack', 'System Architecture'],
    order: 2,
  },
  {
    id: 'milestone-3',
    year: '2022',
    title: 'AI/ML Specialization',
    description: `Pivoted to AI/ML development, combining enterprise experience with 
machine learning to create intelligent business solutions.`,
    location: 'AI/ML Industry',
    type: 'career',
    importance: 'high',
    tags: ['Machine Learning', 'AI Integration', 'Data Science'],
    order: 3,
  },
  {
    id: 'milestone-4',
    year: '2023',
    title: 'Advanced AI Certifications',
    description: `Earned multiple AI/ML certifications and specialized in LLM 
integration, RAG systems, and enterprise AI deployment.`,
    type: 'certification',
    importance: 'medium',
    tags: ['LLM', 'RAG', 'AI Deployment', 'Certifications'],
    order: 4,
  },
  {
    id: 'milestone-5',
    year: '2024',
    title: 'AI Solutions Architecture',
    description: `Now leading AI transformation projects, designing end-to-end 
machine learning pipelines and intelligent automation systems.`,
    location: 'Global Remote',
    type: 'achievement',
    importance: 'high',
    tags: ['AI Architecture', 'ML Pipelines', 'Leadership'],
    order: 5,
  },
];

// Key Achievements
export const keyAchievements: Achievement[] = [
  {
    id: 'achievement-1',
    title: 'Enterprise AI Integration',
    description: `Successfully integrated AI/ML capabilities into legacy enterprise 
systems, improving operational efficiency by 40% and reducing manual processing time.`,
    category: 'technical',
    metrics: '40% efficiency improvement',
    icon: '🤖',
    date: new Date('2024-06-01'),
    featured: true,
  },
  {
    id: 'achievement-2',
    title: 'RAG System Implementation',
    description: `Designed and deployed production-ready RAG systems for document 
processing and intelligent search, handling 10M+ queries monthly.`,
    category: 'technical',
    metrics: '10M+ monthly queries',
    icon: '🔍',
    date: new Date('2024-03-01'),
    featured: true,
  },
  {
    id: 'achievement-3',
    title: 'ML Pipeline Architecture',
    description: `Built scalable ML pipelines using modern MLOps practices, reducing 
model deployment time from weeks to hours.`,
    category: 'innovation',
    metrics: '95% deployment time reduction',
    icon: '⚡',
    date: new Date('2024-01-01'),
    featured: true,
  },
  {
    id: 'achievement-4',
    title: 'Open Source Contributions',
    description: `Active contributor to AI/ML open source projects with 500+ GitHub 
stars and contributions to major ML frameworks.`,
    category: 'recognition',
    metrics: '500+ GitHub stars',
    icon: '⭐',
    date: new Date('2023-12-01'),
    featured: false,
  },
  {
    id: 'achievement-5',
    title: 'Technical Leadership',
    description: `Led cross-functional teams in AI adoption, mentoring developers 
and establishing best practices for ML development.`,
    category: 'leadership',
    metrics: '15+ team members mentored',
    icon: '👥',
    date: new Date('2024-08-01'),
    featured: false,
  },
  {
    id: 'achievement-6',
    title: 'Industry Recognition',
    description: `Featured speaker at AI/ML conferences and published technical 
articles on enterprise AI implementation strategies.`,
    category: 'recognition',
    metrics: '5+ conference talks',
    icon: '🎤',
    date: new Date('2024-05-01'),
    featured: false,
  },
];

// Timeline Events
export const timelineEvents: TimelineEvent[] = [
  {
    id: 'event-1',
    date: new Date('2018-09-01'),
    title: 'Started Computer Science Journey',
    description: 'Began formal education in computer science and programming',
    type: 'milestone',
    importance: 'high',
  },
  {
    id: 'event-2',
    date: new Date('2020-06-01'),
    title: 'First Enterprise Role',
    description: 'Joined enterprise software development team',
    type: 'milestone',
    importance: 'high',
  },
  {
    id: 'event-3',
    date: new Date('2022-03-01'),
    title: 'AI/ML Transition',
    description: 'Pivoted career focus to AI/ML development',
    type: 'milestone',
    importance: 'high',
  },
  {
    id: 'event-4',
    date: new Date('2023-01-01'),
    title: 'Advanced Certifications',
    description: 'Completed multiple AI/ML certifications',
    type: 'achievement',
    importance: 'medium',
  },
  {
    id: 'event-5',
    date: new Date('2024-01-01'),
    title: 'Solutions Architecture',
    description: 'Advanced to AI solutions architecture role',
    type: 'milestone',
    importance: 'high',
  },
];

// Complete Professional Journey
export const professionalJourney: ProfessionalJourney = {
  id: 'oxcodexo-journey',
  profileId: 'oxcodexo-profile',
  milestones: journeyMilestones,
  achievements: keyAchievements,
  timeline: timelineEvents,
};

// Combined Profile Data
export const profileData = {
  profile: personalProfile,
  journey: professionalJourney,
  milestones: journeyMilestones,
  achievements: keyAchievements,
  timeline: timelineEvents,
};
