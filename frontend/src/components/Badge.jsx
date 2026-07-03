import { cn } from '../utils/cn';

export const Badge = ({ children, className }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider',
        'bg-[var(--color-secondary)] text-[var(--color-primary)] border border-[var(--color-border)]',
        className
      )}
    >
      {children}
    </span>
  );
};
