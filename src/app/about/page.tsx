import type { Metadata } from 'next';
import { profileData } from '@/data/profile';

export const metadata: Metadata = {
  title: 'About | Issam NACIRI',
  description:
    'Learn more about Issam NACIRI, a Senior AI Engineer specializing in Secure On-Premise Solutions, LLMs, and MLOps.',
};

export default function About() {
  const { profile, journey, achievements } = profileData;

  return (
    <div className='container mx-auto px-4 pt-32 pb-24'>
      {/* Introduction Section */}
      <section className='mx-auto mb-24 max-w-5xl text-center'>
        <h1 className='mb-4 text-4xl font-bold'>About Me</h1>
        <h2 className='text-primary mb-6 text-2xl font-semibold'>{profile.title}</h2>
        <p className='text-muted-foreground mb-8 text-lg leading-relaxed'>{profile.bio}</p>
        <div className='flex justify-center gap-4'>
          <a
            href={`mailto:${profile.email}`}
            className='ring-offset-background focus-visible:ring-ring bg-primary hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium !text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'
          >
            Email Me
          </a>
          <a
            href='/projects'
            className='ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'
          >
            View My Projects
          </a>
          <a
            href='https://github.com/izzyxnac'
            className='ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'
          >
            GitHub
          </a>
        </div>
      </section>

      {/* Professional Journey Timeline */}
      <section className='mx-auto mb-24 max-w-5xl'>
        <h2 className='mb-12 text-center text-3xl font-bold'>Professional Journey</h2>
        <div className='border-muted relative space-y-12 border-l pl-8'>
          {journey.milestones
            .sort((a, b) => b.order - a.order)
            .map(milestone => (
              <div key={milestone.id} className='relative'>
                <div className='bg-background border-primary absolute -left-[39px] mt-1.5 h-4 w-4 rounded-full border-2'></div>
                <time className='text-muted-foreground mb-1 block text-sm'>{milestone.year}</time>
                <h3 className='text-foreground text-xl font-bold'>{milestone.title}</h3>
                <p className='text-muted-foreground mb-2 italic'>{milestone.location}</p>
                <p className='text-card-foreground text-base leading-relaxed'>
                  {milestone.description}
                </p>
              </div>
            ))}
        </div>
      </section>

      {/* Key Achievements */}
      <section className='mx-auto max-w-5xl'>
        <h2 className='mb-12 text-center text-3xl font-bold'>Key Achievements</h2>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {achievements.map(achievement => (
            <div
              key={achievement.id}
              className='bg-card border-border hover:border-primary/50 rounded-lg border p-6 shadow-sm transition-colors duration-300'
            >
              <div className='mb-4 flex items-center gap-3'>
                <span className='text-2xl'>{achievement.icon}</span>
                <h3 className='text-lg font-semibold'>{achievement.title}</h3>
              </div>
              <p className='text-muted-foreground mb-4 text-sm'>{achievement.description}</p>
              <div className='bg-secondary text-secondary-foreground inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium'>
                {achievement.metrics}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
