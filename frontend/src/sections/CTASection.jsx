import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../components/Container';
import { Button } from '../components/Button';

export const CTASection = () => {
  return (
    <Container className="bg-[var(--color-primary)] py-24 md:py-32 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[var(--color-accent)]/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#f5f5dc]/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="text-4xl md:text-6xl font-bold font-heading text-white mb-6"
        >
          Ready to Transform Your <span className="text-[var(--color-accent)]">Focus?</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl leading-relaxed"
        >
          Join a community of dedicated professionals and students. Secure your spot at Einstein IQ Library today and experience true productivity.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.2 }}
        >
          <NavLink to="/membership">
            <Button size="lg" className="gap-2 bg-[var(--color-accent)] text-white hover:bg-[#b5952f] text-lg px-8 py-6 h-auto shadow-xl hover:shadow-[var(--color-accent)]/20 transition-all hover:-translate-y-1">
              Join Now <ArrowRight size={24} />
            </Button>
          </NavLink>
        </motion.div>
      </div>
    </Container>
  );
};
