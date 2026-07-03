import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from '../layout/Layout';

// Lazy load pages for performance
const Home = lazy(() => import('../pages/Home'));
// const About = lazy(() => import('../pages/About'));
// const Features = lazy(() => import('../pages/Features'));
// const Membership = lazy(() => import('../pages/Membership'));
// const Gallery = lazy(() => import('../pages/Gallery'));
// const Rules = lazy(() => import('../pages/Rules'));
// const Contact = lazy(() => import('../pages/Contact'));
// const NotFound = lazy(() => import('../pages/NotFound'));

// Temporary Loading Spinner
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-[var(--color-secondary)] border-t-[#f5f5dc] rounded-full animate-spin"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="about" element={<About />} /> */}
          {/* <Route path="features" element={<Features />} /> */}
          {/* <Route path="membership" element={<Membership />} /> */}
          {/* <Route path="gallery" element={<Gallery />} /> */}
          {/* <Route path="rules" element={<Rules />} /> */}
          {/* <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
