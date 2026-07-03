import { motion } from 'framer-motion';
import { Wind, Wifi, Shield, Coffee, Clock, Lock, MapPin } from 'lucide-react';

const iconMap = {
  wind: Wind,
  wifi: Wifi,
  shield: Shield,
  coffee: Coffee,
  clock: Clock,
  lock: Lock,
  'map-pin': MapPin,
};

export const FeatureCard = ({ title, description, icon, delay = 0 }) => {
  const IconComponent = iconMap[icon] || Wind;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay }}
      className="bg-[#f5f5dc] shadow-md border border-[#e8e8d1] p-8 rounded-2xl flex flex-col gap-6 hover:-translate-y-2 transition-transform duration-300 group"
    >
      <div className="w-14 h-14 rounded-xl bg-[var(--color-secondary)] flex items-center justify-center group-hover:bg-[var(--color-accent)] transition-colors duration-300">
        <IconComponent className="text-white group-hover:text-[var(--color-surface)] transition-colors duration-300" size={28} />
      </div>
      <div>
        <h3 className="text-xl font-heading font-semibold text-[var(--color-primary)] mb-3">{title}</h3>
        <p className="text-[var(--color-text-secondary)] leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};
