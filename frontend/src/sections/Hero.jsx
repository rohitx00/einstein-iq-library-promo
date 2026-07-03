import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '../components/Button';
import { Container } from '../components/Container';

export const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    // GSAP Animation for complex reveal
    const ctx = gsap.context(() => {
      gsap.from('.hero-word', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-[var(--color-primary)]">
      {/* Background Image Parallax */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/80 via-[var(--color-primary)]/60 to-[var(--color-bg-base)] z-10" />
        <img 
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000" 
          alt="Premium Library"
          className="w-full h-full object-cover scale-110"
        />
      </motion.div>

      <Container className="relative z-20 pt-20">
        <div className="max-w-4xl" ref={textRef}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8 uppercase tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
            Redefining Your Workspace
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-white leading-[1.1] tracking-tight mb-8 overflow-hidden">
            <div className="flex flex-wrap gap-x-4">
              <span className="hero-word">The</span>
              <span className="hero-word">Premium</span>
              <span className="hero-word">Space</span>
            </div>
            <div className="flex flex-wrap gap-x-4 text-[var(--color-accent)]">
              <span className="hero-word">For</span>
              <span className="hero-word">Deep</span>
              <span className="hero-word">Focus.</span>
            </div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-2xl text-gray-300 max-w-2xl mb-12 leading-relaxed"
          >
            Elevate your academic and professional journey in a silent, air-conditioned environment designed for unparalleled productivity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <NavLink to="/membership">
              <Button size="lg" className="w-full sm:w-auto gap-2 bg-[var(--color-accent)] text-white hover:bg-[#b5952f]">
                Explore Memberships <ArrowRight size={20} />
              </Button>
            </NavLink>
            <NavLink to="/about">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/5 backdrop-blur-sm">
                Discover Our Story
              </Button>
            </NavLink>
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/70"
      >
        <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
};
