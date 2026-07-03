import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock initial data
const initialFacilities = [
  { id: 1, title: 'High-Speed Wi-Fi', description: 'Enterprise-grade internet connectivity.', icon: 'wifi', order: 1 },
  { id: 2, title: 'Ergonomic Seating', description: 'Premium chairs designed for long hours.', icon: 'wind', order: 2 },
  { id: 3, title: 'Silent Zones', description: 'Strictly monitored noise-free areas.', icon: 'shield', order: 3 },
  { id: 4, title: 'Coffee Bar', description: 'Unlimited premium coffee and tea.', icon: 'coffee', order: 4 },
];

const facilitySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  icon: z.string().min(1, 'Icon name is required'),
  order: z.number().min(1, 'Order must be positive'),
});

export const FacilitiesManagement = () => {
  const [facilities, setFacilities] = useState(initialFacilities);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(facilitySchema),
  });

  const openModal = (facility = null) => {
    if (facility) {
      setEditingId(facility.id);
      setValue('title', facility.title);
      setValue('description', facility.description);
      setValue('icon', facility.icon);
      setValue('order', facility.order);
    } else {
      setEditingId(null);
      reset({ title: '', description: '', icon: '', order: facilities.length + 1 });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = (data) => {
    if (editingId) {
      setFacilities(facilities.map(f => f.id === editingId ? { ...data, id: editingId } : f));
      toast.success('Facility updated');
    } else {
      setFacilities([...facilities, { ...data, id: Date.now() }]);
      toast.success('Facility added');
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this facility?')) {
      setFacilities(facilities.filter(f => f.id !== id));
      toast.success('Facility deleted');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Facilities Management</h1>
          <p className="text-slate-500 mt-1">Manage the amenities shown on the website.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-slate-900 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
        >
          <Plus size={18} /> Add Facility
        </button>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Icon</th>
                <th className="px-6 py-4">Title & Description</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {facilities.sort((a, b) => a.order - b.order).map((facility) => (
                <tr key={facility.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium">{facility.order}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-slate-100 rounded text-slate-600 font-mono text-xs">{facility.icon}</span>
                  </td>
                  <td className="px-6 py-4 max-w-xs sm:max-w-md">
                    <p className="font-medium text-slate-900">{facility.title}</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{facility.description}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => openModal(facility)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(facility.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {facilities.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-500">No facilities found. Add one to get started.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Facility' : 'Add Facility'}</h3>
                <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                  <input {...register('title')} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900" />
                  {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea {...register('description')} rows={3} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 resize-none" />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Icon Name</label>
                    <input {...register('icon')} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900" placeholder="e.g. wifi, coffee" />
                    {errors.icon && <p className="text-red-500 text-xs mt-1">{errors.icon.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Display Order</label>
                    <input type="number" {...register('order', { valueAsNumber: true })} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900" />
                    {errors.order && <p className="text-red-500 text-xs mt-1">{errors.order.message}</p>}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-slate-100">
                  <button type="button" onClick={closeModal} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 flex items-center gap-2 font-medium transition-colors">
                    <Save size={16} /> Save Facility
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
