import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const variants = {
  primary: 'bg-[var(--color-accent)] text-[var(--color-surface)] hover:bg-[var(--color-accent)]',
  secondary: 'bg-[var(--color-hover)] text-[var(--color-primary)] hover:bg-[var(--color-border)]',
  outline: 'border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-accent)] hover:text-[var(--color-surface)]',
  ghost: 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-white/5',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const Button = forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children, 
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
