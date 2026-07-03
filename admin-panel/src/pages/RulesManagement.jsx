import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { Plus, Edit2, Trash2, Save, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

const ruleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  icon: z.string().optional().or(z.literal('')),
  displayOrder: z.number().min(1, 'Order must be positive'),
});

export const RulesManagement = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const { data: rules = [], isLoading } = useQuery({
    queryKey: ['rules'],
    queryFn: async () => {
      const response = await api.get('/rules');
      return response.data.data;
    }
  });

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(ruleSchema),
  });

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post('/rules', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Rule added successfully');
      queryClient.invalidateQueries({ queryKey: ['rules'] });
      closeModal();
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to add rule')
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await api.put(`/rules/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Rule updated successfully');
      queryClient.invalidateQueries({ queryKey: ['rules'] });
      closeModal();
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to update rule')
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/rules/${id}`);
    },
    onSuccess: () => {
      toast.success('Rule deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['rules'] });
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to delete rule')
  });

  const openModal = (rule = null) => {
    if (rule) {
      setEditingId(rule.id);
      setValue('title', rule.title);
      setValue('description', rule.description);
      setValue('icon', rule.icon || '');
      setValue('displayOrder', rule.displayOrder);
    } else {
      setEditingId(null);
      reset({ title: '', description: '', icon: '', displayOrder: rules.length + 1 });
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
    if (window.confirm('Are you sure you want to delete this rule?')) {
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
          <h1 className="text-2xl font-bold text-slate-900">Library Rules</h1>
          <p className="text-slate-500 mt-1">Manage rules and guidelines for members.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-slate-900 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
        >
          <Plus size={18} /> Add Rule
        </button>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Rule Title & Description</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rules.sort((a, b) => a.displayOrder - b.displayOrder).map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium">{rule.displayOrder}</td>
                  <td className="px-6 py-4 max-w-lg">
                    <p className="font-medium text-slate-900 flex items-center gap-2">
                      <Info size={16} className="text-slate-400" />
                      {rule.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 pl-6">{rule.description}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openModal(rule)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(rule.id)} disabled={deleteMutation.isPending} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded disabled:opacity-50">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {rules.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-8 text-center text-slate-500">No rules found. Add one to get started.</td>
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
                <h3 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Rule' : 'Add Rule'}</h3>
                <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Rule Title</label>
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
                    <label className="block text-sm font-medium text-slate-700 mb-1">Icon (Optional)</label>
                    <input {...register('icon')} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900" placeholder="lucide icon name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Display Order</label>
                    <input type="number" {...register('displayOrder', { valueAsNumber: true })} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900" />
                    {errors.displayOrder && <p className="text-red-500 text-xs mt-1">{errors.displayOrder.message}</p>}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-slate-100">
                  <button type="button" onClick={closeModal} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 flex items-center gap-2 font-medium transition-colors disabled:opacity-70">
                    <Save size={16} /> {isSubmitting ? 'Saving...' : 'Save Rule'}
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
