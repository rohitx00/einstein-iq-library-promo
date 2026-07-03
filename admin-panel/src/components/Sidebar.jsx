import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Image, 
  Info, 
  Star, 
  BookOpen, 
  FileText, 
  HelpCircle, 
  Phone, 
  MessageSquare, 
  Settings, 
  LogOut,
  Coffee
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs) => twMerge(clsx(inputs));

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'Hero Section', icon: Image, path: '/hero' },
  { label: 'About', icon: Info, path: '/about' },
  { label: 'Facilities', icon: Coffee, path: '/facilities' },
  { label: 'Membership Plans', icon: BookOpen, path: '/plans' },
  { label: 'Gallery', icon: Image, path: '/gallery' },
  { label: 'Testimonials', icon: Star, path: '/testimonials' },
  { label: 'Library Rules', icon: FileText, path: '/rules' },
  { label: 'FAQs', icon: HelpCircle, path: '/faqs' },
  { label: 'Contact Info', icon: Phone, path: '/contact-info' },
  { label: 'Messages', icon: MessageSquare, path: '/messages' },
  { label: 'Settings', icon: Settings, path: '/settings' },
];

export const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed top-0 left-0 h-screen bg-slate-900 text-slate-300 w-64 flex flex-col transition-transform duration-300 z-50 overflow-y-auto",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-yellow-500 flex items-center justify-center">
              <BookOpen className="text-slate-900" size={20} />
            </div>
            <span className="font-bold text-xl text-white">Einstein IQ</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium text-sm",
                isActive 
                  ? "bg-slate-800 text-white" 
                  : "hover:bg-slate-800/50 hover:text-white"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-slate-800">
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-left text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};
