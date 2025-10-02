import Image from 'next/image';
import { profileData } from '@/data';
import { PersonalProfile, ProfessionalJourney } from '@/lib/types/models';
import { JourneyTimeline } from './journey-timeline';
import { AchievementsList } from './achievements-list';

interface AboutSectionProps {
  profileData?: {
    profile: PersonalProfile;
    journey: ProfessionalJourney;
  };
  className?: string;
}

/**
 * AboutSection Server Component
 *
 * Displays comprehensive professional profile including:
 * - Personal introduction and bio
 * - Professional journey timeline
 * - Key achievements and metrics
 * - High-quality professional photography
 */
export default function AboutSection({
  profileData: customProfileData,
  className = '',
}: AboutSectionProps) {
  const data = customProfileData || profileData;
  const { profile, journey } = data;

  return (
    <section
      id='about'
      className={`bg-gray-50 px-4 py-20 sm:px-6 lg:px-8 dark:bg-gray-900 ${className}`}
      aria-labelledby='about-heading'
    >
      <div className='mx-auto max-w-7xl'>
        <AboutHeader profile={profile} />
        <AboutContent profile={profile} />

        {/* Professional Journey Timeline */}
        <div className='mt-20'>
          <h3 className='mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white'>
            Professional Journey
          </h3>
          <JourneyTimeline milestones={journey.milestones} />
        </div>

        {/* Key Achievements */}
        <div className='mt-20'>
          <h3 className='mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white'>
            Key Achievements
          </h3>
          <AchievementsList achievements={journey.achievements} />
        </div>
      </div>
    </section>
  );
}

function AboutHeader({ profile }: { profile: PersonalProfile }) {
  return (
    <div className='mb-16 text-center'>
      <h2
        id='about-heading'
        className='mb-6 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white'
      >
        About Me
      </h2>
      <p className='mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300'>
        {profile.tagline}
      </p>
    </div>
  );
}

function AboutContent({ profile }: { profile: PersonalProfile }) {
  return (
    <div className='grid items-start gap-16 lg:grid-cols-2'>
      <ProfileSection profile={profile} />
      <BioSection profile={profile} />
    </div>
  );
}

function ProfileSection({ profile }: { profile: PersonalProfile }) {
  return (
    <div className='space-y-8'>
      <div className='relative mx-auto h-80 w-80 lg:mx-0'>
        <div className='h-full w-full overflow-hidden rounded-full shadow-2xl'>
          <Image
            src={profile.profileImage.url}
            alt={profile.profileImage.alt}
            width={320}
            height={320}
            className='h-full w-full object-cover'
            priority
          />
        </div>
      </div>

      <div className='space-y-4 text-center lg:text-left'>
        <h3 className='text-2xl font-semibold text-gray-900 dark:text-white'>{profile.name}</h3>
        <p className='text-lg font-medium text-blue-600 dark:text-blue-400'>{profile.title}</p>
        <ContactInfo profile={profile} />
        <AvailabilityStatus availability={profile.availability} />
      </div>
    </div>
  );
}

function ContactInfo({ profile }: { profile: PersonalProfile }) {
  return (
    <div className='flex flex-col justify-center gap-4 text-gray-600 sm:flex-row lg:justify-start dark:text-gray-300'>
      <span className='flex items-center gap-2'>
        <LocationIcon />
        {profile.location}
      </span>
      <span className='flex items-center gap-2'>
        <EmailIcon />
        <a
          href={`mailto:${profile.email}`}
          className='transition-colors hover:text-blue-600 dark:hover:text-blue-400'
          aria-label={`Send email to ${profile.name}`}
        >
          {profile.email}
        </a>
      </span>
    </div>
  );
}

function AvailabilityStatus({ availability }: { availability: string }) {
  const getStatusColor = () => {
    switch (availability) {
      case 'available':
        return 'bg-green-500';
      case 'busy':
        return 'bg-yellow-500';
      default:
        return 'bg-red-500';
    }
  };

  const getStatusText = () => {
    switch (availability) {
      case 'available':
        return 'Available for new projects';
      case 'busy':
        return 'Currently busy';
      default:
        return 'Not available';
    }
  };

  return (
    <div className='flex items-center justify-center gap-2 lg:justify-start'>
      <div className={`h-3 w-3 rounded-full ${getStatusColor()}`} aria-hidden='true' />
      <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
        {getStatusText()}
      </span>
    </div>
  );
}

function BioSection({ profile }: { profile: PersonalProfile }) {
  return (
    <div className='space-y-6'>
      <h3 className='text-2xl font-semibold text-gray-900 dark:text-white'>My Journey</h3>
      <div className='prose prose-lg dark:prose-invert max-w-none'>
        <p className='leading-relaxed text-gray-700 dark:text-gray-300'>{profile.bio}</p>
      </div>
      <ApproachSection />
    </div>
  );
}

function ApproachSection() {
  return (
    <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800'>
      <h4 className='mb-3 text-lg font-semibold text-gray-900 dark:text-white'>My Approach</h4>
      <p className='text-gray-700 dark:text-gray-300'>
        I believe in bridging the gap between cutting-edge AI technology and practical business
        solutions. My approach combines deep technical expertise with real-world enterprise
        experience.
      </p>
    </div>
  );
}

function LocationIcon() {
  return (
    <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20' aria-hidden='true'>
      <path
        fillRule='evenodd'
        d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
        clipRule='evenodd'
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20' aria-hidden='true'>
      <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
      <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
    </svg>
  );
}
