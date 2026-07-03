import { NavLink } from 'react-router-dom';
import { BookOpen, MapPin, Phone, Mail } from 'lucide-react';
import { navigationLinks, socialLinks } from '../data/mockData';
import { FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';

const iconMap = {
  instagram: <FiInstagram />,
  twitter: <FiTwitter />,
  facebook: <FiFacebook />,
};

const Footer = () => {
  return (
    <footer className="bg-[var(--color-primary)] pt-16 pb-8 border-t border-[var(--color-secondary)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <NavLink to="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-[var(--color-accent)] text-white p-2 rounded-lg">
                <BookOpen size={24} />
              </div>
              <span className="font-heading font-bold text-xl tracking-wide text-[var(--color-surface)]">
                Einstein IQ
              </span>
            </NavLink>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
              A premium study space designed for deep focus, academic excellence, and undisturbed productivity.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="w-10 h-10 rounded-full bg-[var(--color-secondary)] text-[var(--color-surface)] flex items-center justify-center hover:bg-[var(--color-accent)] hover:text-white transition-colors"
                  aria-label={link.name}
                >
                  {iconMap[link.icon]}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[var(--color-surface)] font-heading font-semibold text-lg">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              {navigationLinks.slice(1, 5).map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className="text-[var(--color-text-secondary)] text-sm hover:text-[var(--color-accent)] transition-colors w-fit"
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[var(--color-surface)] font-heading font-semibold text-lg">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:+1234567890" className="flex items-center gap-3 text-[var(--color-text-secondary)] text-sm hover:text-[var(--color-accent)] transition-colors group">
                <Phone size={16} className="text-[var(--color-accent)] group-hover:scale-110 transition-transform" />
                +1 (234) 567-890
              </a>
              <a href="mailto:hello@einsteiniq.com" className="flex items-center gap-3 text-[var(--color-text-secondary)] text-sm hover:text-[var(--color-accent)] transition-colors group">
                <Mail size={16} className="text-[var(--color-accent)] group-hover:scale-110 transition-transform" />
                hello@einsteiniq.com
              </a>
              <div className="flex items-start gap-3 text-[var(--color-text-secondary)] text-sm leading-relaxed">
                <MapPin size={16} className="text-[var(--color-accent)] mt-1 shrink-0" />
                <span>123 Academic Avenue, Knowledge District, City 10001</span>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[var(--color-surface)] font-heading font-semibold text-lg">Working Hours</h4>
            <div className="flex flex-col gap-2 text-[var(--color-text-secondary)] text-sm">
              <div className="flex justify-between border-b border-[var(--color-secondary)] pb-2">
                <span>Mon - Fri:</span>
                <span className="text-[var(--color-surface)]">6:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-[var(--color-secondary)] pb-2">
                <span>Saturday:</span>
                <span className="text-[var(--color-surface)]">6:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between pb-2">
                <span>Sunday:</span>
                <span className="text-[var(--color-surface)]">8:00 AM - 10:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--color-secondary)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--color-text-secondary)] text-xs">
            &copy; {new Date().getFullYear()} Einstein IQ Library. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-[var(--color-text-secondary)]">
            <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
