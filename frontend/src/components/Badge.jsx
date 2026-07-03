import { cn } from '../utils/cn';

export const Badge = ({ children, className }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
        'bg-white text-black border border-gray-200 shadow-sm',
        className
      )}
    >
      {children}
    </span>
  );
};
