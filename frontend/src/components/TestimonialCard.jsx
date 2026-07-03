import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export const TestimonialCard = ({ name, occupation, review, image, rating }) => {
  return (
    <div className="glass p-8 rounded-3xl h-full flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-14 h-14 rounded-full object-cover border-2 border-[var(--color-secondary)]"
        />
        <div>
          <h4 className="font-heading font-bold text-[var(--color-primary)]">{name}</h4>
          <p className="text-sm text-[var(--color-text-secondary)]">{occupation}</p>
        </div>
      </div>
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? 'fill-[var(--color-accent)] text-[var(--color-primary)]' : 'text-[var(--color-border)]'}
          />
        ))}
      </div>
      <p className="text-[var(--color-text-secondary)] leading-relaxed italic flex-grow">"{review}"</p>
    </div>
  );
};
