import type { Metadata } from 'next';
import { projectsData } from '@/data/projects';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Projects | Issam NACIRI',
  description:
    'Explore a portfolio of AI/ML projects, including LLM deployments, pipeline automations, and secure enterprise solutions.',
};

export default function Projects() {
  return (
    <div className='container mx-auto px-4 pt-32 pb-16'>
      <h1 className='mb-8 text-center text-4xl font-bold'>My Projects</h1>
      <p className='text-muted-foreground mx-auto mb-12 max-w-2xl text-center text-lg'>
        Explore my portfolio of Secure On-Premise AI solutions, MLOps implementations, and robust
        software architectures.
      </p>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {projectsData.map(project => (
          <div
            key={project.id}
            className='bg-card border-border flex flex-col overflow-hidden rounded-lg border shadow-lg transition-shadow duration-300 hover:shadow-xl'
          >
            {/* Placeholder Image */}
            <div className='bg-muted relative flex h-48 items-center justify-center'>
              <span className='text-4xl'>🚀</span>
            </div>

            <div className='flex flex-grow flex-col p-6'>
              <h2 className='mb-2 text-2xl font-semibold'>{project.title}</h2>
              <p className='text-muted-foreground mb-4 flex-grow'>{project.description}</p>

              <div className='mb-4 flex flex-wrap gap-2'>
                {project.technologies.map(tech => (
                  <span
                    key={tech}
                    className='bg-secondary text-secondary-foreground rounded-md px-2 py-1 text-sm font-medium'
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className='border-border mt-auto flex gap-4 border-t pt-4'>
                <Link
                  href={project.github}
                  className='text-primary flex items-center gap-1 font-medium hover:underline'
                >
                  GitHub ↗
                </Link>
                {/* <Link href={project.demo} 
                    className='text-primary hover:underline font-medium flex items-center gap-1'>
                  Live Demo ↗
                </Link> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
