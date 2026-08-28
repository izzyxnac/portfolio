export const projectsData = [
  {
    id: 1,
    title: 'NotationAI — Industrial AI Scoring System',
    description:
      'Architected a production-grade, two-stage AI pipeline for automated evaluation processing in an air-gapped intranet. Features a fairness filter using LLMs for semantic refactoring and a high-performance quantized CamemBERTav2 engine for real-time inference on CPU.',
    technologies: ['Python', 'CamemBERTav2', 'ONNX Runtime', 'FastAPI', 'React', 'Docker', 'DVC'],
    github: 'https://github.com/izzyxnac',
    demo: '#',
    image: '/images/projects/notation-ai.png',
    featured: true,
  },
  {
    id: 2,
    title: 'Secure On-Premise LLM Infrastructure',
    description:
      'Integrated Large Language Models into a private intranet environment using local inference engines (Ollama) and n8n orchestration. Built secure RAG pipelines with PostgreSQL VectorDB for document summarization and judicial assistance without cloud exposure.',
    technologies: ['Ollama', 'n8n', 'PostgreSQL', 'VectorDB', 'Docker', 'Prompt Engineering'],
    github: 'https://github.com/izzyxnac',
    demo: '#',
    image: '/images/projects/secure-ai.png',
    featured: true,
  },
  {
    id: 3,
    title: 'MIW — Bio-Chaotic Medical Steganography',
    description:
      'Developed a VAE-GAN-based medical image watermarking system for PhD research. Implemented bio-chaotic encryption for secure payload embedding, achieving high PSNR (>51dB) and low BER on industrial GPU hardening runs (RTX 5090).',
    technologies: ['PyTorch', 'VAE-GAN', 'ONNX', 'Hydra', 'Docker', 'Medical Imaging'],
    github: 'https://github.com/izzyxnac',
    demo: '#',
    image: '/images/projects/miw.png',
  },
  {
    id: 4,
    title: 'P.P.A — Training Management Platform',
    description:
      'Full-stack platform for HACCP/Qualiopi-compliant training organizations in France. Features automated registration flows, funding management, QCM scoring, and email notifications. Built with Next.js 15+ and PostgreSQL.',
    technologies: ['Next.js', 'TypeScript', 'Drizzle ORM', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    github: 'https://github.com/izzyxnac',
    demo: 'https://ppa-formation.fr',
  },
  {
    id: 5,
    title: 'GestAut — Real-Time Gesture Recognition',
    description:
      'High-performance gesture detection platform using YOLO11 and YOLOv8 models. Built with a FastAPI microservices backend for GPU inference and a React frontend for real-time webcam interaction.',
    technologies: ['Python', 'YOLO11', 'YOLOv8', 'FastAPI', 'React', 'PyTorch', 'CUDA'],
    github: 'https://github.com/izzyxnac',
    demo: '#',
    image: '/images/projects/gestaut.png',
  },
  {
    id: 6,
    title: 'NLP MLOps Spam Detection System',
    description:
      'End-to-end MLOps pipeline for French text classification. Includes DVC-tracked data versioning, ONNX optimization for CPU inference, and Prometheus-based monitoring for model drift detection.',
    technologies: ['Python', 'CamemBERTav2', 'DVC', 'FastAPI', 'Kubernetes', 'Prometheus'],
    github: 'https://github.com/izzyxnac',
    demo: '#',
    image: '/images/projects/spam-detection.png',
  },
  {
    id: 7,
    title: 'National Administrative Platform',
    description:
      'Led the development of a national platform for managing administrative requests using a microservices architecture. Implemented secure RBAC systems, Node.js/Express backends, and Alfresco API integration for document management.',
    technologies: ['Node.js', 'Express', 'SQL Server', 'Alfresco API', 'Microservices', 'RBAC'],
    github: 'https://github.com/izzyxnac',
    demo: '#',
    image: '/images/projects/admin-platform.png',
  },
  {
    id: 8,
    title: 'Personnel Assignment Optimization (MIP)',
    description:
      'Designed and implemented automated personnel assignment models using Mixed-Integer Programming (MIP). Solved complex combinatorial optimization problems with PySCIPOpt, significantly reducing manual scheduling overhead.',
    technologies: ['Python', 'PySCIPOpt', 'Optimization', 'MIP', 'Pandas', 'Tkinter'],
    github: 'https://github.com/izzyxnac',
    demo: '#',
    image: '/images/projects/optimization.png',
  },
  {
    id: 9,
    title: 'GPU-Accelerated Face Recognition',
    description:
      'Face detection and recognition system using InsightFace (ResNet100). Features real-time inference on ONNX Runtime GPU and a desktop client for person registration with 512-dim embeddings.',
    technologies: ['InsightFace', 'ONNX Runtime', 'CUDA', 'FastAPI', 'Tkinter', 'SQLite'],
    github: 'https://github.com/izzyxnac',
    demo: '#',
    image: '/images/projects/face-recognition.png',
  },
  {
    id: 10,
    title: 'Bodycame — Secure VMS with Geolocation',
    description:
      'Video Management System for body camera footage featuring homography-based geolocation mapping. Implements AES-256 encryption, RBAC, and secure audit logging for standalone Windows deployment.',
    technologies: ['Python', 'OpenCV', 'Tkinter', 'SQLite', 'Pydantic', 'AES-256'],
    github: 'https://github.com/izzyxnac',
    demo: '#',
    image: '/images/projects/bodycame.png',
  },
  {
    id: 11,
    title: 'Explainable AI Bank Fraud Detection',
    description:
      'XAI-focused fraud detection system using a 7-dimensional feature engineering pipeline. Achieved high Precision (0.90) while ensuring full model traceability for financial regulatory compliance.',
    technologies: ['Python', 'scikit-learn', 'Explainable AI', 'Pandas', 'Jupyter'],
    github: 'https://github.com/izzyxnac',
    demo: '#',
    image: '/images/projects/bank-fraud.png',
  },
  {
    id: 12,
    title: 'Sorec — Equine Image Analysis Dashboard',
    description:
      'Computer vision pipeline for horse marking identification. Features HSV color segmentation, morphological cleanup, and an automated 2x2 analysis dashboard for veterinary reporting.',
    technologies: ['Python', 'OpenCV', 'NumPy', 'Computer Vision', 'Matplotlib'],
    github: 'https://github.com/izzyxnac',
    demo: '#',
    image: '/images/projects/sorec.png',
  },
];
