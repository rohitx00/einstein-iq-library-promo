import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const variants = {
  primary: 'bg-[#f5f5dc] text-[#0a192f] hover:bg-[#e8e8d0]',
  secondary: 'bg-[#2d3748] text-[#f5f5dc] hover:bg-[#4a5568]',
  outline: 'border-2 border-[#f5f5dc] text-[#f5f5dc] hover:bg-[#f5f5dc] hover:text-[#0a192f]',
  ghost: 'text-[#a0aec0] hover:text-[#f5f5dc] hover:bg-white/5',
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
