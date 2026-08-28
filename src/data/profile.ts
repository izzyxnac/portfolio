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
  id: 'issam-profile',
  name: 'Issam NACIRI',
  title: 'AI Engineer & Full Stack Developer',
  tagline: 'Industrial AI & Secure MLOps Specialist',
  bio: `I am an AI Engineer specializing in Industrial Scaling, MLOps, and Secure On-Premise Solutions. 
I have extensive experience architecting production-grade AI pipelines, from air-gapped LLM infrastructures to high-performance quantized NLP systems. 
Currently working at a Moroccan Government Agency (confidential), I lead the development of secure, scalable AI solutions for critical administrative operations.`,
  location: 'Rabat, Morocco',
  // Obfuscated email: izzyxnac@gmail.com
  email: 'aXp6eXhuYWNAZ21haWwuY29t',
  github: 'https://github.com/izzyxnac',
  linkedin: 'https://www.linkedin.com/in/issam-naciri-49609288/',
  profileImage: {
    url: '/images/profile/izzyxnac.png',
    alt: 'Issam NACIRI - AI Engineer',
    width: 400,
    height: 400,
    placeholder: '/images/profile/placeholder.svg',
  },
  availability: 'available',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date(),
};

// Professional Journey Milestones (MERGED with original)
export const journeyMilestones: JourneyMilestone[] = [
  {
    id: 'milestone-1',
    year: '2022',
    title: 'Python Developer',
    description: `Developed automated personnel assignment optimization using Mixed-Integer Programming (MIP) at a Moroccan Government Agency (confidential).`,
    location: 'Rabat, Morocco',
    type: 'career',
    importance: 'high',
    tags: ['Python', 'MIP', 'Optimization'],
    order: 1,
  },
  {
    id: 'milestone-edu-1',
    year: '2023 - 2024',
    title: "Bachelor's Degree",
    description: 'Information Systems Engineering at SUPMTI Rabat.',
    location: 'Rabat, Morocco',
    type: 'education',
    importance: 'medium',
    tags: ['Information Systems', 'Engineering'],
    order: 2,
  },
  {
    id: 'milestone-2',
    year: '2023',
    title: 'Full Stack Developer',
    description: `Architected a national platform for administrative requests using microservices and secure RBAC systems at a Moroccan Government Agency (confidential).`,
    location: 'Rabat, Morocco',
    type: 'career',
    importance: 'high',
    tags: ['Microservices', 'Node.js', 'RBAC'],
    order: 3,
  },
  {
    id: 'milestone-edu-2',
    year: '2024 - 2026',
    title: 'Engineering Degree',
    description: 'Computer Engineering and Data Science at SUPMTI Rabat (Expected 2026).',
    location: 'Rabat, Morocco',
    type: 'education',
    importance: 'high',
    tags: ['Data Science', 'Computer Engineering'],
    order: 4,
  },
  {
    id: 'milestone-3',
    year: '2024 - 2025',
    title: 'AI Developer / MLOps',
    description: `Deployed production AI solutions for text classification with automated drift detection and retraining at a Moroccan Government Agency (confidential).`,
    location: 'Rabat, Morocco',
    type: 'career',
    importance: 'high',
    tags: ['MLOps', 'NLP', 'Docker', 'FastAPI'],
    order: 5,
  },
  {
    id: 'milestone-4',
    year: '2025',
    title: 'AI Engineer / LLMs',
    description: `Lead engineer for secure on-premise LLM integration and RAG pipelines at a Moroccan Government Agency (confidential).`,
    location: 'Rabat, Morocco',
    type: 'career',
    importance: 'high',
    tags: ['LLMs', 'RAG', 'On-Premise AI'],
    order: 6,
  },
  {
    id: 'milestone-5',
    year: '2026',
    title: 'AI Engineer / NotationAI Scale-up',
    description: `Lead the industrial scaling of an automated evaluation system, transitioning from prototype to a high-performance production-grade AI pipeline at a Moroccan Government Agency (confidential).`,
    location: 'Rabat, Morocco',
    type: 'career',
    importance: 'high',
    tags: ['Industrial AI', 'Quantization', 'Scaling'],
    order: 7,
  },
];

// Key Achievements (MERGED with original)
export const keyAchievements: Achievement[] = [
  {
    id: 'achievement-1',
    title: 'Industrial AI Scaling',
    description: `Successfully scaled an AI evaluation prototype into a high-performance production system using INT8 quantization and ONNX Runtime.`,
    category: 'technical',
    metrics: '<100ms Inference',
    icon: '🚀',
    date: new Date('2026-03-01'),
    featured: true,
  },
  {
    id: 'achievement-2',
    title: 'Air-Gapped LLM Infrastructure',
    description: `Deployed secure on-premise LLM and RAG solutions in fully air-gapped environments without external cloud dependencies.`,
    category: 'technical',
    metrics: '100% On-Premise',
    icon: '🔒',
    date: new Date('2025-05-01'),
    featured: true,
  },
  {
    id: 'achievement-3',
    title: 'Deep Bio-Chaotic Steganography',
    description: `Developed state-of-the-art VAE-GAN watermarking with bio-chaotic encryption for medical images, achieving >51dB PSNR.`,
    category: 'technical',
    metrics: 'PhD Collaboration',
    icon: '🧬',
    date: new Date('2026-01-01'),
    featured: true,
  },
  {
    id: 'achievement-4',
    title: 'National Management Platform',
    description: `Developed a national platform for administrative requests with microservices architecture and RBAC, handling large-scale distributed data.`,
    category: 'innovation',
    metrics: 'National Scale',
    icon: '🌐',
    date: new Date('2023-10-01'),
    featured: false,
  },
  {
    id: 'achievement-5',
    title: 'Optimization Model (MIP)',
    description: `Implemented Mixed-Integer Programming models to solve large-scale personnel assignment problems.`,
    category: 'technical',
    metrics: 'Optimization',
    icon: '⚙️',
    date: new Date('2022-12-01'),
    featured: false,
  },
];

// Timeline Events (MERGED with original)
export const timelineEvents: TimelineEvent[] = [
  {
    id: 'event-1',
    date: new Date('2022-09-01'),
    title: 'Python Developer Role',
    description: 'Started career in optimization and mathematical modeling.',
    type: 'milestone',
    importance: 'medium',
  },
  {
    id: 'event-2',
    date: new Date('2023-12-01'),
    title: 'Full Stack Transition',
    description: 'Lead developer for national-scale administrative platforms.',
    type: 'milestone',
    importance: 'high',
  },
  {
    id: 'event-3',
    date: new Date('2024-06-01'),
    title: 'AI/ML Specialization',
    description: 'Focused on NLP, Transformers, and MLOps industrialization.',
    type: 'milestone',
    importance: 'high',
  },
  {
    id: 'event-4',
    date: new Date('2025-02-01'),
    title: 'Lead AI Engineer Role',
    description: 'Spearheading secure on-premise AI and LLM initiatives.',
    type: 'milestone',
    importance: 'high',
  },
  {
    id: 'event-5',
    date: new Date('2026-01-01'),
    title: 'NotationAI Industrial Scale-up',
    description: 'Orchestrating the transition to high-performance production AI.',
    type: 'milestone',
    importance: 'high',
  },
];

// Complete Professional Journey
export const professionalJourney: ProfessionalJourney = {
  id: 'issam-journey',
  profileId: 'issam-profile',
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
