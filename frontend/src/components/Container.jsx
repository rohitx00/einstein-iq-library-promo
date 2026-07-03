import { cn } from '../utils/cn';

export const Container = ({ children, className, id }) => {
  return (
    <section id={id} className={cn('w-full py-20 px-6', className)}>
      <div className="max-w-7xl mx-auto w-full">
        {children}
      </div>
    </section>
  );
};
