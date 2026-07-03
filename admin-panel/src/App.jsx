import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AdminLayout } from './layouts/AdminLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { HeroManagement } from './pages/HeroManagement';
import { AboutManagement } from './pages/AboutManagement';
import { FacilitiesManagement } from './pages/FacilitiesManagement';
import { PlansManagement } from './pages/PlansManagement';
import { GalleryManagement } from './pages/GalleryManagement';
import { TestimonialsManagement } from './pages/TestimonialsManagement';
import { RulesManagement } from './pages/RulesManagement';
import { FaqsManagement } from './pages/FaqsManagement';
import { MessagesManagement } from './pages/MessagesManagement';
import { ContactInfoManagement } from './pages/ContactInfoManagement';

// Placeholder components for routing
const Placeholder = ({ title }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
    <h2 className="text-xl font-bold text-slate-900 mb-4">{title} Management</h2>
    <p className="text-slate-500">This page is under construction.</p>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="hero" element={<HeroManagement />} />
            <Route path="about" element={<AboutManagement />} />
            <Route path="facilities" element={<FacilitiesManagement />} />
            <Route path="plans" element={<PlansManagement />} />
            <Route path="gallery" element={<GalleryManagement />} />
            <Route path="testimonials" element={<TestimonialsManagement />} />
            <Route path="rules" element={<RulesManagement />} />
            <Route path="faqs" element={<FaqsManagement />} />
            <Route path="contact-info" element={<ContactInfoManagement />} />
            <Route path="messages" element={<MessagesManagement />} />
            <Route path="settings" element={<Placeholder title="Settings" />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
