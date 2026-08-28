import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact | Issam NACIRI',
  description:
    'Get in touch with Issam NACIRI for AI/ML collaborations, Secure On-Premise Solutions, or professional inquiries.',
};

export default function ContactPage() {
  return <ContactClient />;
}
