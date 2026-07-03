import { BookOpen, Wifi, Wind, Shield, Coffee, Clock, Lock, MapPin } from 'lucide-react';

export const navigationLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Features', path: '/features' },
  { name: 'Membership', path: '/membership' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Rules', path: '/rules' },
  { name: 'Contact', path: '/contact' },
];

export const socialLinks = [
  { name: 'Instagram', url: '#', icon: 'instagram' },
  { name: 'Twitter', url: '#', icon: 'twitter' },
  { name: 'Facebook', url: '#', icon: 'facebook' },
];

export const statistics = [
  { id: 1, value: 1000, suffix: '+', label: 'Students Enrolled' },
  { id: 2, value: 25000, suffix: '+', label: 'Books Available' },
  { id: 3, value: 15, suffix: '+', label: 'Years of Excellence' },
  { id: 4, value: 300, suffix: '+', label: 'Dedicated Seats' },
];

export const features = [
  { id: 1, title: 'Silent Environment', description: 'A pin-drop silence zone designed for deep focus.', icon: 'wind' },
  { id: 2, title: 'High Speed WiFi', description: 'Uninterrupted 1Gbps internet for seamless research.', icon: 'wifi' },
  { id: 3, title: 'Air Conditioning', description: 'Centralized AC maintaining the perfect temperature.', icon: 'wind' },
  { id: 4, title: 'CCTV Security', description: '24/7 surveillance for your safety and peace of mind.', icon: 'shield' },
  { id: 5, title: 'Drinking Water', description: 'Purified RO water dispensers available on every floor.', icon: 'coffee' },
  { id: 6, title: 'Long Study Hours', description: 'Open early morning to late night, 365 days a year.', icon: 'clock' },
  { id: 7, title: 'Locker Facility', description: 'Secure lockers to store your books and belongings safely.', icon: 'lock' },
  { id: 8, title: 'Prime Location', description: 'Easily accessible from all major transit points in the city.', icon: 'map-pin' },
];

export const membershipPlans = [
  {
    id: 'monthly',
    name: 'Monthly Pass',
    price: '$49',
    duration: '/month',
    features: ['Access during working hours', 'High-speed WiFi', 'Standard seating', 'Cafeteria access'],
    recommended: false,
  },
  {
    id: 'quarterly',
    name: 'Quarterly Elite',
    price: '$129',
    duration: '/3 months',
    features: ['24/7 Access', 'Dedicated AC Cabin', 'Personal Locker', 'Free Coffee/Tea', 'Priority Support'],
    recommended: true,
  },
  {
    id: 'annual',
    name: 'Annual Scholar',
    price: '$399',
    duration: '/year',
    features: ['24/7 Access', 'Premium Ergonomic Chair', 'Personal Locker & Desk', 'Unlimited Coffee/Tea', 'Exclusive Events Access'],
    recommended: false,
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    occupation: 'Medical Student',
    review: 'This library provided the perfect calm and focus I needed to pass my boards. The individual cabins are an absolute lifesaver.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    rating: 5,
  },
  {
    id: 2,
    name: 'David Chen',
    occupation: 'Software Engineer',
    review: 'The WiFi is incredibly fast, and the environment is just premium. It feels like an executive lounge designed for productivity.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Davis',
    occupation: 'Freelance Writer',
    review: 'I love the aesthetic and the silence here. I get more done in 3 hours here than a whole day at a coffee shop.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
    rating: 5,
  }
];

export const galleryImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=800', alt: 'Library Main Hall', span: 'col-span-1 md:col-span-2 row-span-2' },
  { id: 2, url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800', alt: 'Study Cabins', span: 'col-span-1 row-span-1' },
  { id: 3, url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800', alt: 'Bookshelves', span: 'col-span-1 row-span-1' },
  { id: 4, url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800', alt: 'Lounge Area', span: 'col-span-1 md:col-span-2 row-span-1' },
];

export const rules = [
  { id: 1, title: 'Maintain Silence', description: 'Keep conversations to an absolute minimum to respect others focus.' },
  { id: 2, title: 'Phones on Silent', description: 'All mobile devices must be on silent. Step outside for calls.' },
  { id: 3, title: 'No Food in Main Hall', description: 'Please use the designated cafeteria for eating.' },
  { id: 4, title: 'Handle Books Carefully', description: 'Do not write on or fold pages of library materials.' },
  { id: 5, title: 'Return Books Promptly', description: 'Leave used books on the return carts, not the shelves.' },
];

export const faqs = [
  { id: 1, question: 'What are your opening hours?', answer: 'We are open from 6:00 AM to 11:00 PM, 365 days a year.' },
  { id: 2, question: 'Do you offer a trial period?', answer: 'Yes, we offer a 1-day complimentary pass for you to experience the environment.' },
  { id: 3, question: 'Are laptops allowed?', answer: 'Absolutely. We provide charging ports at every desk and high-speed WiFi.' },
  { id: 4, question: 'Is the library wheelchair accessible?', answer: 'Yes, our entire facility including restrooms is fully accessible.' },
];
