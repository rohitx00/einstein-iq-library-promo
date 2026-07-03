import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Layout from '../layout/Layout';

// Lazy load pages for performance
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Membership = lazy(() => import('../pages/Membership'));
const Gallery = lazy(() => import('../pages/Gallery'));
const Rules = lazy(() => import('../pages/Rules'));
const FAQ = lazy(() => import('../pages/FAQ'));
const Contact = lazy(() => import('../pages/Contact'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Temporary Loading Spinner
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-[var(--color-accent)] rounded-full animate-spin"></div>
  </div>
);

const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="membership" element={<Membership />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="rules" element={<Rules />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

export default AppRoutes;
