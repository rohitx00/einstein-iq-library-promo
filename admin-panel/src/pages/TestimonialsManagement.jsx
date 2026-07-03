import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { Plus, Edit2, Trash2, Save, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

const testimonialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  occupation: z.string().min(1, 'Occupation is required'),
  rating: z.number().min(1).max(5),
  review: z.string().min(10, 'Review must be at least 10 characters'),
});

export const TestimonialsManagement = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const response = await api.get('/testimonials');
      return response.data.data;
    }
  });

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(testimonialSchema),
  });

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post('/testimonials', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success('Testimonial added successfully');
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      closeModal();
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to add testimonial')
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await api.put(`/testimonials/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success('Testimonial updated successfully');
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      closeModal();
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to update testimonial')
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/testimonials/${id}`);
    },
    onSuccess: () => {
      toast.success('Testimonial deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to delete testimonial')
  });

  const openModal = (t = null) => {
    if (t) {
      setEditingId(t.id);
      setValue('name', t.name);
      setValue('occupation', t.occupation);
      setValue('rating', t.rating);
      setValue('review', t.review);
      setValue('imageUrl', t.imageUrl || '');
    } else {
      setEditingId(null);
      reset({ name: '', occupation: '', rating: 5, review: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
    const fileInput = document.getElementById('testimonial-image');
    if (fileInput) fileInput.value = '';
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('occupation', data.occupation);
    formData.append('rating', data.rating);
    formData.append('review', data.review);
    
    const fileInput = document.getElementById('testimonial-image');
    if (fileInput && fileInput.files[0]) {
      formData.append('image', fileInput.files[0]);
    }

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Testimonials</h1>
          <p className="text-slate-500 mt-1">Manage user reviews and feedback shown on the site.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-slate-900 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
        >
          <Plus size={18} /> Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
              <img src={t.imageUrl || 'https://via.placeholder.com/150'} alt={t.name} className="w-12 h-12 rounded-full object-cover bg-slate-100" />
              <div>
                <h3 className="font-bold text-slate-900">{t.name}</h3>
                <p className="text-xs text-slate-500">{t.occupation}</p>
              </div>
            </div>
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={i < t.rating ? "text-yellow-500 fill-yellow-500" : "text-slate-200"} />
              ))}
            </div>
            <p className="text-sm text-slate-600 italic flex-grow mb-6">"{t.review}"</p>
            
            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
              <button onClick={() => openModal(t)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                <Edit2 size={16} />
              </button>
              <button onClick={() => handleDelete(t.id)} disabled={deleteMutation.isPending} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded disabled:opacity-50">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            No testimonials found.
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
                <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                    <input {...register('name')} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Occupation</label>
                    <input {...register('occupation')} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900" />
                    {errors.occupation && <p className="text-red-500 text-xs mt-1">{errors.occupation.message}</p>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Rating (1-5)</label>
                  <input type="number" {...register('rating', { valueAsNumber: true })} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900" />
                  {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Review</label>
                  <textarea {...register('review')} rows={4} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 resize-none" />
                  {errors.review && <p className="text-red-500 text-xs mt-1">{errors.review.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Profile Photo (Optional)</label>
                  <input id="testimonial-image" type="file" accept="image/*" className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 bg-white" />
                  <p className="text-xs text-slate-500 mt-1">Leave empty to keep existing image</p>
                </div>

                <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-slate-100">
                  <button type="button" onClick={closeModal} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 flex items-center gap-2 font-medium transition-colors disabled:opacity-70">
                    <Save size={16} /> {isSubmitting ? 'Saving...' : 'Save Testimonial'}
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
