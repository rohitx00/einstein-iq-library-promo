import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '../components/Button';
import { Container } from '../components/Container';
import defaultHeroImage from '../assets/hero.png';

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

  const renderHeading = (heading) => {
    if (!heading) return null;
    const words = heading.split(' ');
    const mid = Math.ceil(words.length / 2);
    const line1 = words.slice(0, mid);
    const line2 = words.slice(mid);

    return (
      <>
        <div className="overflow-hidden">
          {line1.map((word, i) => (
            <span key={i} className="hero-word inline-block mr-3 md:mr-5">{word}</span>
          ))}
        </div>
        <div className="overflow-hidden text-[var(--color-accent)] mt-2">
          {line2.map((word, i) => (
            <span key={i} className="hero-word inline-block mr-3 md:mr-5">{word}</span>
          ))}
        </div>
      </>
    );
  };

  const bgImage = defaultHeroImage;
  const headingText = "The Premium Space For Deep Focus.";
  const subheadingText = "Elevate your academic and professional journey in an environment designed for absolute concentration and success.";

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[var(--color-primary)]">
      {/* Background Image Parallax */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-[var(--color-primary)]/60 z-10" />
        <img 
          src={bgImage} 
          alt="Premium Library"
          className="w-full h-full object-cover scale-110"
        />
      </motion.div>

      <Container className="relative z-20 h-full !py-0 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center -mt-12" ref={textRef}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex md:hidden items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium -mt-16 mb-6 uppercase tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
            Redefining Your Workspace
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-white leading-[1.1] tracking-tight mb-8 overflow-hidden text-center">
            {renderHeading(headingText)}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {subheadingText}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full"
          >
            <NavLink to="/membership">
              <Button size="lg" className="w-full sm:w-auto gap-2 bg-[var(--color-accent)] text-white hover:bg-[#b5952f]">
                Explore Memberships <ArrowRight size={20} />
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/70"
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
