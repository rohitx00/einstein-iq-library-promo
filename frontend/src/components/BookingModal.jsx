import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './Button';

export const BookingModal = ({ isOpen, onClose, selectedPlan }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: selectedPlan || 'Standard',
    requestType: 'visit' // 'visit' or 'call'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally you would send formData to a backend here
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 transition-colors"
              >
                <X size={24} />
              </button>

              <h2 className="text-3xl font-heading font-bold text-[var(--color-primary)] mb-2">
                Book a {formData.requestType === 'visit' ? 'Visit' : 'Call'}
              </h2>
              <p className="text-gray-500 mb-6">
                Leave your details and our receptionist will confirm your booking for the {selectedPlan} plan.
              </p>

              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="bg-green-50 text-green-700 p-6 rounded-2xl text-center font-medium"
                >
                  🎉 Thank you! Your request has been received. We will contact you shortly.
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                      <input 
                        type="radio" 
                        name="requestType" 
                        value="visit" 
                        checked={formData.requestType === 'visit'}
                        onChange={(e) => setFormData({...formData, requestType: e.target.value})}
                        className="text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
                      />
                      Library Visit
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                      <input 
                        type="radio" 
                        name="requestType" 
                        value="call" 
                        checked={formData.requestType === 'call'}
                        onChange={(e) => setFormData({...formData, requestType: e.target.value})}
                        className="text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
                      />
                      Call with Receptionist
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-[var(--color-accent)] transition-all bg-gray-50/50"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-[var(--color-accent)] transition-all bg-gray-50/50"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-[var(--color-accent)] transition-all bg-gray-50/50"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Selected Plan</label>
                    <input 
                      readOnly
                      type="text" 
                      value={formData.plan}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-600 cursor-not-allowed"
                    />
                  </div>

                  <Button type="submit" className="w-full mt-4 bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90 py-4">
                    Submit Request
                  </Button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
