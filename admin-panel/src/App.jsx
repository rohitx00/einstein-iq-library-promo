import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdminLayout } from './layouts/AdminLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { HeroManagement } from './pages/HeroManagement';
import { AboutManagement } from './pages/AboutManagement';
import { FacilitiesManagement } from './pages/FacilitiesManagement';
import { PlansManagement } from './pages/PlansManagement';
import { GalleryManagement } from './pages/GalleryManagement';
import { TestimonialsManagement } from './pages/TestimonialsManagement';

// Placeholder components for routing
const Placeholder = ({ title }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
    <h2 className="text-xl font-bold text-slate-900 mb-4">{title} Management</h2>
    <p className="text-slate-500">This page is under construction.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="hero" element={<HeroManagement />} />
            <Route path="about" element={<AboutManagement />} />
            <Route path="facilities" element={<FacilitiesManagement />} />
            <Route path="plans" element={<PlansManagement />} />
            <Route path="gallery" element={<GalleryManagement />} />
            <Route path="testimonials" element={<TestimonialsManagement />} />
            <Route path="rules" element={<Placeholder title="Library Rules" />} />
            <Route path="faqs" element={<Placeholder title="FAQs" />} />
            <Route path="contact-info" element={<Placeholder title="Contact Info" />} />
            <Route path="messages" element={<Placeholder title="Messages" />} />
            <Route path="settings" element={<Placeholder title="Settings" />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
