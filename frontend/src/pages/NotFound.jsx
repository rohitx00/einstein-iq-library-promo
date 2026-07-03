import { NavLink } from 'react-router-dom';
import { PageTransitionWrapper } from '../components/PageTransitionWrapper';
import { Button } from '../components/Button';

const NotFound = () => {
  return (
    <PageTransitionWrapper>
      <div className="bg-[var(--color-bg-base)] min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-8xl md:text-9xl font-bold font-heading text-[var(--color-primary)] mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-heading font-semibold text-[var(--color-primary)] mb-6">Page Not Found</h2>
        <p className="text-[var(--color-text-secondary)] mb-8 max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <NavLink to="/">
          <Button size="lg" className="bg-[var(--color-accent)] text-white hover:bg-[#b5952f]">
            Return to Home
          </Button>
        </NavLink>
      </div>
    </PageTransitionWrapper>
  );
};

export default NotFound;
