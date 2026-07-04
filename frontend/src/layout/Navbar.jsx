import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigationLinks } from '../data/mockData';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav py-4 shadow-md' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="bg-[var(--color-accent)] text-[var(--color-surface)] p-2 rounded-lg group-hover:bg-[var(--color-accent)] transition-colors">
            <BookOpen size={24} />
          </div>
          <span className="font-heading font-bold text-xl tracking-wide text-[var(--color-primary)]">
            Einstein IQ Library
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-[var(--color-primary)] ${
                  isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <NavLink
            to="/membership"
            className="px-6 py-2.5 rounded-full bg-[var(--color-accent)] text-[var(--color-surface)] font-medium text-sm hover:bg-[var(--color-accent)] transition-colors"
          >
            Join Now
          </NavLink>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-[var(--color-primary)] p-2"
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Fullscreen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[72px] bg-[var(--color-primary)] z-40 flex flex-col p-6 border-t border-white/10"
          >
            <nav className="flex flex-col gap-6 mt-8">
              {navigationLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-2xl font-heading font-medium transition-colors ${
                      isActive ? 'text-[var(--color-accent)]' : 'text-gray-400 hover:text-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <NavLink
                to="/membership"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-8 px-6 py-4 rounded-xl bg-[var(--color-accent)] text-[var(--color-surface)] font-medium text-lg text-center active:scale-95 transition-transform"
              >
                Become a Member
              </NavLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
