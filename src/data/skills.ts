
// Skills Data Structure
// Comprehensive skills data for the portfolio skills visualization section

import { SkillsData, SkillCategory, Skill, SkillLevel } from '@/lib/types/models';

// Skills data following the defined interface
export const skillsData: SkillsData = {
  id: 'issam-skills-2026',
  profileId: 'issam-profile',
  lastUpdated: new Date('2026-05-05'),
  categories: [
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning',
      description: 'Specialized in Secure On-Premise Solutions, LLMs, and Industrial MLOps',
      icon: '🤖',
      color: '#8B5CF6',
      order: 1,
      featured: true,
      skills: [
        {
            id: 'python-ai',
            name: 'Python (AI/ML)',
            level: 'expert',
            experience: 'Extensive experience with PySCIPOpt (MIP), Pandas, and deep learning frameworks.',
            yearsOfExperience: 5,
            proficiencyPercentage: 98,
            description: 'Core language for all AI/ML and Computer Vision initiatives.',
            icon: '/icons/python.svg',
            relatedProjects: ['MIP Optimization', 'NotationAI', 'GestAut'],
            certifications: [],
            lastUsed: new Date(),
            trending: true,
        },
        {
          id: 'llms-rag',
          name: 'LLMs & RAG',
          level: 'expert',
          experience: 'Implementing secure local RAG pipelines with air-gapped on-premise infrastructure.',
          yearsOfExperience: 3,
          proficiencyPercentage: 95,
          description: 'Ollama, Open WebUI, n8n, Prompt Engineering, VectorDB (Qdrant, pgvector).',
          icon: '/icons/openai.svg',
          relatedProjects: ['Secure On-Premise AI'],
          certifications: [],
          lastUsed: new Date(),
          trending: true,
        },
         {
          id: 'mlops',
          name: 'Industrial MLOps',
          level: 'expert',
          experience: 'Automated retraining, DVC, Prometheus monitoring, and model drift detection.',
          yearsOfExperience: 3,
          proficiencyPercentage: 92,
          description: 'Ensuring production stability with CI/CD and security auditing (Trivy, pip-audit).',
          icon: '/icons/tensorflow.svg',
          relatedProjects: ['NotationAI', 'Spam Detection Pipeline'],
          certifications: [],
          lastUsed: new Date(),
          trending: true,
        },
        {
          id: 'nlp',
          name: 'NLP (CamemBERTav2)',
          level: 'expert',
          experience: 'Fine-tuning and quantizing Transformer models for French text processing.',
          yearsOfExperience: 3,
          proficiencyPercentage: 94,
          description: 'High-performance inference with ONNX Runtime and INT8 quantization.',
          icon: '/icons/pytorch.svg',
          relatedProjects: ['NotationAI', 'Spam Detection'],
          certifications: [],
          lastUsed: new Date(),
          trending: true,
        },
      ],
    },
    {
      id: 'computer-vision',
      name: 'Computer Vision',
      description: 'Real-time detection, tracking, and medical image processing',
      icon: '👁️',
      color: '#EC4899',
      order: 2,
      featured: true,
      skills: [
        {
            id: 'yolo',
            name: 'YOLOv8 / YOLO11',
            level: 'expert',
            experience: 'Real-time object detection and gesture recognition.',
            yearsOfExperience: 2,
            proficiencyPercentage: 95,
            description: 'Training and deploying high-performance vision models.',
            icon: '/icons/opencv.svg',
            relatedProjects: ['GestAut'],
            certifications: [],
            lastUsed: new Date(),
            trending: true,
        },
        {
          id: 'opencv',
          name: 'OpenCV & NumPy',
          level: 'expert',
          experience: 'Advanced image processing, homography, and HSV segmentation.',
          yearsOfExperience: 4,
          proficiencyPercentage: 92,
          description: 'Core CV library for medical and industrial applications.',
          icon: '/icons/opencv.svg',
          relatedProjects: ['Bodycame', 'Sorec'],
          certifications: [],
          lastUsed: new Date(),
          trending: false,
        },
        {
          id: 'insightface',
          name: 'Face Recognition',
          level: 'advanced',
          experience: 'InsightFace, ResNet100, and face embedding matching.',
          yearsOfExperience: 2,
          proficiencyPercentage: 88,
          description: 'GPU-accelerated face identification and registration.',
          icon: '/icons/pytorch.svg',
          relatedProjects: ['Face Recognition System'],
          certifications: [],
          lastUsed: new Date(),
          trending: true,
        },
      ],
    },
    {
      id: 'backend',
      name: 'Backend Development',
      description: 'Enterprise server-side solutions with ASP.NET Core, Node.js, and FastAPI',
      icon: '⚙️',
      color: '#10B981',
      order: 3,
      featured: true,
      skills: [
        {
            id: 'aspnet',
            name: 'ASP.NET / C#',
            level: 'expert',
            experience: 'Building enterprise-grade administrative platforms and transfer algorithms.',
            yearsOfExperience: 5,
            proficiencyPercentage: 94,
            description: 'MVC, Web API, and custom rule engines.',
            icon: '/icons/csharp.svg',
            relatedProjects: ['National Admin Platform', 'Transfer Algorithm'],
            certifications: [],
            lastUsed: new Date(),
            trending: false,
        },
        {
          id: 'fastapi',
          name: 'FastAPI',
          level: 'expert',
          experience: 'High-performance API development for AI and Computer Vision services.',
          yearsOfExperience: 3,
          proficiencyPercentage: 95,
          description: 'Async support, Pydantic validation, and GPU-accelerated inference.',
          icon: '/icons/fastapi.svg',
          relatedProjects: ['NotationAI', 'GestAut', 'Face Recognition'],
          certifications: [],
          lastUsed: new Date(),
          trending: true,
        },
        {
          id: 'nodejs',
          name: 'Node.js / Express',
          level: 'advanced',
          experience: 'Microservices architecture and Alfresco API integration.',
          yearsOfExperience: 3,
          proficiencyPercentage: 88,
          description: 'Scalable backend services and API orchestration.',
          icon: '/icons/nodejs.svg',
          relatedProjects: ['National Admin Platform'],
          certifications: [],
          lastUsed: new Date(),
          trending: false,
        },
      ],
    },
    {
      id: 'frontend',
      name: 'Frontend Development',
      description: 'Modern web architectures with Next.js 15+ and Type-safe UIs',
      icon: '🎨',
      color: '#3B82F6',
      order: 4,
      featured: true,
      skills: [
        {
          id: 'nextjs',
          name: 'Next.js 15+ (App Router)',
          level: 'expert',
          experience: 'Building high-performance SEO-optimized web platforms.',
          yearsOfExperience: 3,
          proficiencyPercentage: 95,
          description: 'Server Components, Server Actions, and modern routing.',
          icon: '/icons/nextjs.svg',
          relatedProjects: ['P.P.A'],
          certifications: [],
          lastUsed: new Date(),
          trending: true,
        },
        {
          id: 'react',
          name: 'React',
          level: 'expert',
          experience: 'Building responsive dashboards and real-time vision interfaces.',
          yearsOfExperience: 5,
          proficiencyPercentage: 92,
          description: 'Redux Toolkit, React Query, and modern hooks.',
          icon: '/icons/react.svg',
          relatedProjects: ['GestAut', 'NotationAI', 'Admin Platform'],
          certifications: [],
          lastUsed: new Date(),
          trending: true,
        },
        {
          id: 'typescript',
          name: 'TypeScript & Tailwind v4',
          level: 'expert',
          experience: 'End-to-end type safety and premium UI/UX styling.',
          yearsOfExperience: 4,
          proficiencyPercentage: 94,
          description: 'Creating high-end visual experiences and maintainable codebases.',
          icon: '/icons/typescript.svg',
          relatedProjects: ['P.P.A', 'Portfolio'],
          certifications: [],
          lastUsed: new Date(),
          trending: true,
        },
      ],
    },
    {
      id: 'infrastructure',
      name: 'Infrastructure & DevOps',
      description: 'Containerization, Kubernetes, IIS, and Secure Deployment',
      icon: '☁️',
      color: '#F59E0B',
      order: 5,
      featured: true,
      skills: [
        {
          id: 'docker-k8s',
          name: 'Docker & Kubernetes',
          level: 'expert',
          experience: 'Microservices orchestration and secure production deployment.',
          yearsOfExperience: 5,
          proficiencyPercentage: 95,
          description: 'Scaling and securing distributed AI applications.',
          icon: '/icons/docker.svg',
          relatedProjects: ['NotationAI', 'Spam Detection'],
          certifications: [],
          lastUsed: new Date(),
          trending: true,
        },
        {
          id: 'databases',
          name: 'PostgreSQL & SQL Server',
          level: 'expert',
          experience: 'Complex relational and vector data architectures.',
          yearsOfExperience: 5,
          proficiencyPercentage: 94,
          description: 'Handling large-scale distributed data for governmental platforms.',
          icon: '/icons/postgresql.svg',
          relatedProjects: ['National Admin Platform', 'P.P.A', 'Secure AI'],
          certifications: [],
          lastUsed: new Date(),
          trending: true,
        },
        {
          id: 'iis-azure',
          name: 'IIS & Azure',
          level: 'advanced',
          experience: 'Secure on-premise and cloud infrastructure management.',
          yearsOfExperience: 4,
          proficiencyPercentage: 86,
          description: 'Windows Server configuration and IaaS deployment.',
          icon: '/icons/azure.svg',
          relatedProjects: ['NextCloud on Azure', 'Strategic Platform'],
          certifications: [],
          lastUsed: new Date(),
          trending: false,
        },
        {
          id: 'git-automation',
          name: 'Git & CI/CD',
          level: 'advanced',
          experience: 'Version control, GitHub Actions, and MLOps automation.',
          yearsOfExperience: 5,
          proficiencyPercentage: 92,
          description: 'Code management and automated deployment workflows.',
          icon: '/icons/github.svg',
          relatedProjects: ['MIW', 'Spam Detection'],
          certifications: [],
          lastUsed: new Date(),
          trending: true,
        },
      ],
    },
  ],
};

// Helper functions for working with skills data
export const getSkillsByCategory = (categoryId: string): Skill[] => {
  const category = skillsData.categories.find(cat => cat.id === categoryId);
  return category?.skills || [];
};

export const getFeaturedCategories = (): SkillCategory[] => {
  return skillsData.categories.filter(category => category.featured);
};

export const getTrendingSkills = (): Skill[] => {
  return skillsData.categories.flatMap(category => category.skills).filter(skill => skill.trending);
};

export const getSkillsByLevel = (level: SkillLevel): Skill[] => {
  return skillsData.categories
    .flatMap(category => category.skills)
    .filter(skill => skill.level === level);
};

export const getRecentlyUsedSkills = (daysAgo: number = 30): Skill[] => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysAgo);

  return skillsData.categories
    .flatMap(category => category.skills)
    .filter(skill => skill.lastUsed >= cutoffDate)
    .sort((a, b) => b.lastUsed.getTime() - a.lastUsed.getTime());
};
