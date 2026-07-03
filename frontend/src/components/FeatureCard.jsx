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
      className="glass p-8 rounded-2xl flex flex-col gap-6 hover:-translate-y-2 transition-transform duration-300 group"
    >
      <div className="w-14 h-14 rounded-xl bg-[#172a45] flex items-center justify-center group-hover:bg-[#f5f5dc] transition-colors duration-300">
        <IconComponent className="text-[#f5f5dc] group-hover:text-[#0a192f] transition-colors duration-300" size={28} />
      </div>
      <div>
        <h3 className="text-xl font-heading font-semibold text-[#f5f5dc] mb-3">{title}</h3>
        <p className="text-[#a0aec0] leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};
