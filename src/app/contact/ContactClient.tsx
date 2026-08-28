'use client';

import { Mail, MapPin, Briefcase } from 'lucide-react';
import { profileData } from '@/data/profile';

export default function ContactClient() {
  const { profile } = profileData;

  return (
    <div className='container mx-auto flex justify-center px-4 pt-32 pb-24'>
      <div className='w-full max-w-2xl'>
        {/* Contact Info Section */}
        <section className='bg-card/50 border-border/50 rounded-2xl border p-10 shadow-2xl backdrop-blur-xl'>
          <h1 className='mb-6 text-4xl font-bold tracking-tight'>Get in Touch</h1>
          <p className='text-muted-foreground mb-10 text-lg leading-relaxed'>
            Interested in collaborating on AI projects or have questions about Secure On-Premise
            Solutions? I&apos;d love to hear from you.
          </p>

          <div className='space-y-8'>
            <div className='flex items-start gap-5'>
              <div className='bg-primary/10 text-primary rounded-xl p-3'>
                <Mail size={24} />
              </div>
              <div className='space-y-1'>
                <h3 className='text-muted-foreground text-sm font-medium tracking-wider uppercase'>
                  Email
                </h3>
                <button
                  onClick={() => {
                    window.location.href = `mailto:${atob(profile.email)}`;
                  }}
                  className='hover:text-primary text-xl font-semibold transition-all duration-300'
                >
                  Click to send an email
                </button>
              </div>
            </div>

            <div className='flex items-start gap-5'>
              <div className='bg-primary/10 text-primary rounded-xl p-3'>
                <MapPin size={24} />
              </div>
              <div className='space-y-1'>
                <h3 className='text-muted-foreground text-sm font-medium tracking-wider uppercase'>
                  Location
                </h3>
                <p className='text-xl font-semibold'>{profile.location}</p>
              </div>
            </div>

            <div className='flex items-start gap-5'>
              <div className='bg-primary/10 text-primary rounded-xl p-3'>
                <Briefcase size={24} />
              </div>
              <div className='space-y-1'>
                <h3 className='text-muted-foreground text-sm font-medium tracking-wider uppercase'>
                  Availability
                </h3>
                <div className='flex items-center gap-2'>
                  <span className='h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' />
                  <span className='text-foreground text-lg font-medium'>
                    {profile.availability === 'available'
                      ? 'Available for new projects'
                      : 'Currently busy'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='border-border/50 mt-12 border-t pt-10'>
            <h3 className='text-muted-foreground mb-6 text-sm font-semibold tracking-widest uppercase'>
              Connect on Socials
            </h3>
            <div className='flex gap-5'>
              {profile.github && (
                <a
                  href={profile.github}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group bg-secondary hover:bg-primary relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl transition-all'
                  aria-label='GitHub Profile'
                >
                  <GitHubIcon />
                  <div className='from-primary to-primary-foreground/20 absolute inset-0 translate-y-full bg-gradient-to-br transition-transform duration-300 group-hover:translate-y-0' />
                </a>
              )}

              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group bg-secondary hover:bg-primary relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl transition-all'
                  aria-label='LinkedIn Profile'
                >
                  <LinkedInIcon />
                  <div className='from-primary to-primary-foreground/20 absolute inset-0 translate-y-full bg-gradient-to-br transition-transform duration-300 group-hover:translate-y-0' />
                </a>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function GitHubIcon() {
  return (
    <svg
      className='text-foreground z-10 h-7 w-7 transition-colors group-hover:text-white'
      fill='currentColor'
      viewBox='0 0 24 24'
      aria-hidden='true'
    >
      <path
        fillRule='evenodd'
        d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
        clipRule='evenodd'
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      className='text-foreground z-10 h-7 w-7 transition-colors group-hover:text-white'
      fill='currentColor'
      viewBox='0 0 24 24'
      aria-hidden='true'
    >
      <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
    </svg>
  );
}
