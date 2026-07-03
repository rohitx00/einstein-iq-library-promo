import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { Plus, Edit2, Trash2, Save, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

const planSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  price: z.string().min(1, 'Price is required'),
  duration: z.string().min(1, 'Duration is required'),
  features: z.string().min(1, 'Features are required (comma separated)'),
  isFeatured: z.boolean(),
  displayOrder: z.number().min(1, 'Order must be positive'),
});

export const PlansManagement = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const { data: plans = [], isLoading } = useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      const response = await api.get('/plans');
      return response.data.data;
    }
  });

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(planSchema),
  });

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post('/plans', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Plan added successfully');
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      closeModal();
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to add plan')
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await api.put(`/plans/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Plan updated successfully');
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      closeModal();
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to update plan')
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/plans/${id}`);
    },
    onSuccess: () => {
      toast.success('Plan deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['plans'] });
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to delete plan')
  });

  const openModal = (plan = null) => {
    if (plan) {
      setEditingId(plan.id);
      setValue('title', plan.title);
      setValue('price', plan.price);
      setValue('duration', plan.duration);
      setValue('features', plan.features);
      setValue('isFeatured', plan.isFeatured);
      setValue('displayOrder', plan.displayOrder);
    } else {
      setEditingId(null);
      reset({ title: '', price: '', duration: 'per month', features: '', isFeatured: false, displayOrder: plans.length + 1 });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = (data) => {
    if (editingId) {
      updateMutation.mutate({ id: editingId, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
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
          <h1 className="text-2xl font-bold text-slate-900">Membership Plans</h1>
          <p className="text-slate-500 mt-1">Manage pricing and subscription options.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-slate-900 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
        >
          <Plus size={18} /> Add Plan
        </button>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Plan Details</th>
                <th className="px-6 py-4">Pricing</th>
                <th className="px-6 py-4">Features</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {plans.sort((a, b) => a.displayOrder - b.displayOrder).map((plan) => (
                <tr key={plan.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{plan.title}</span>
                      {plan.isFeatured && <Star size={14} className="text-yellow-500 fill-yellow-500" />}
                    </div>
                    <span className="text-xs text-slate-500">Order: {plan.displayOrder}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-slate-900">{plan.price}</span>
                    <span className="text-xs text-slate-500 ml-1">/ {plan.duration}</span>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="text-xs text-slate-600 truncate">{plan.features}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openModal(plan)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(plan.id)} disabled={deleteMutation.isPending} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded disabled:opacity-50">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {plans.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-500">No plans found. Add one to get started.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Plan' : 'Add Plan'}</h3>
                <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Plan Title</label>
                    <input {...register('title')} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900" />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Display Order</label>
                    <input type="number" {...register('displayOrder', { valueAsNumber: true })} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900" />
                    {errors.displayOrder && <p className="text-red-500 text-xs mt-1">{errors.displayOrder.message}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Price (e.g. ₹299)</label>
                    <input {...register('price')} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900" />
                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Duration (e.g. per month)</label>
                    <input {...register('duration')} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900" />
                    {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Features (comma separated)</label>
                  <textarea {...register('features')} rows={3} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 resize-none" placeholder="Feature 1, Feature 2, Feature 3" />
                  {errors.features && <p className="text-red-500 text-xs mt-1">{errors.features.message}</p>}
                </div>

                <label className="flex items-center gap-2 cursor-pointer pt-2">
                  <input type="checkbox" {...register('isFeatured')} className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-4 h-4" />
                  <span className="text-sm font-medium text-slate-700">Mark as Recommended Plan</span>
                </label>

                <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-slate-100">
                  <button type="button" onClick={closeModal} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 flex items-center gap-2 font-medium transition-colors disabled:opacity-70">
                    <Save size={16} /> {isSubmitting ? 'Saving...' : 'Save Plan'}
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
