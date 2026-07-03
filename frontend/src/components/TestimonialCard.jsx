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
          className="w-14 h-14 rounded-full object-cover border-2 border-[#172a45]"
        />
        <div>
          <h4 className="font-heading font-bold text-[#f5f5dc]">{name}</h4>
          <p className="text-sm text-[#a0aec0]">{occupation}</p>
        </div>
      </div>
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? 'fill-[#f5f5dc] text-[#f5f5dc]' : 'text-[#2d3748]'}
          />
        ))}
      </div>
      <p className="text-[#a0aec0] leading-relaxed italic flex-grow">"{review}"</p>
    </div>
  );
};
