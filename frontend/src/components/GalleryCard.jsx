import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export const GalleryCard = ({ url, alt, span, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={cn(
        'relative overflow-hidden rounded-2xl group cursor-pointer',
        span
      )}
    >
      <div className="absolute inset-0 bg-[#0a192f]/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
      <img
        src={url}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
    </motion.div>
  );
};
