import { cn } from '../utils/cn';

export const Badge = ({ children, className }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider',
        'bg-[#172a45] text-[#f5f5dc] border border-[#2d3748]',
        className
      )}
    >
      {children}
    </span>
  );
};
