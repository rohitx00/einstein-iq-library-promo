import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { Badge } from './Badge';

export const SectionTitle = ({ badge, title, description, align = 'center', className }) => {
  return (
    <div className={cn(
      'flex flex-col mb-16',
      align === 'center' ? 'items-center text-center' : 'items-start text-left',
      className
    )}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-4"
        >
          <Badge>{badge}</Badge>
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl font-bold font-heading mb-6 tracking-tight text-[var(--color-primary)]"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[var(--color-text-secondary)] max-w-2xl"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};
