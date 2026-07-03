import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../utils/cn';
import { Badge } from './Badge';

export const PricingCard = ({ name, price, duration, features, recommended, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay }}
      className={cn(
        'relative flex flex-col p-8 rounded-3xl transition-transform duration-300',
        recommended 
          ? 'bg-[#172a45] border-2 border-[#f5f5dc] shadow-2xl scale-105 z-10' 
          : 'glass mt-4 mb-4'
      )}
    >
      {recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge className="bg-[#f5f5dc] text-[#0a192f] border-none font-bold">Recommended</Badge>
        </div>
      )}
      <div className="mb-8">
        <h3 className="text-2xl font-heading font-bold text-[#f5f5dc] mb-4">{name}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold text-[#f5f5dc]">{price}</span>
          <span className="text-[#a0aec0]">{duration}</span>
        </div>
      </div>
      
      <ul className="flex flex-col gap-4 mb-8 flex-grow">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <Check className="text-[#f5f5dc] mt-1 shrink-0" size={18} />
            <span className="text-[#a0aec0]">{feature}</span>
          </li>
        ))}
      </ul>

      <Button 
        variant={recommended ? 'primary' : 'outline'} 
        className="w-full"
      >
        Choose Plan
      </Button>
    </motion.div>
  );
};
