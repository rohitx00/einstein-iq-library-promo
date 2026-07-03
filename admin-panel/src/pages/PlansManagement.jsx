import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { Plus, Edit2, Trash2, Save, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialPlans = [
  { id: 1, name: 'Daily Pass', price: '₹299', duration: 'per day', features: 'High-Speed Wi-Fi, Open Seating, Coffee/Tea Access', recommended: false, order: 1 },
  { id: 2, title: 'Monthly Pro', price: '₹2,499', duration: 'per month', features: '24/7 Access, Reserved Desk, Locker Included, High-Speed Wi-Fi', recommended: true, order: 2 },
];

const planSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.string().min(1, 'Price is required'),
  duration: z.string().min(1, 'Duration is required'),
  features: z.string().min(1, 'Features are required (comma separated)'),
  recommended: z.boolean(),
  order: z.number().min(1, 'Order must be positive'),
});

export const PlansManagement = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(planSchema),
  });

  const openModal = (plan = null) => {
    if (plan) {
      setEditingId(plan.id);
      setValue('name', plan.name || plan.title);
      setValue('price', plan.price);
      setValue('duration', plan.duration);
      setValue('features', plan.features);
      setValue('recommended', plan.recommended);
      setValue('order', plan.order);
    } else {
      setEditingId(null);
      reset({ name: '', price: '', duration: 'per month', features: '', recommended: false, order: plans.length + 1 });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = (data) => {
    if (editingId) {
      setPlans(plans.map(p => p.id === editingId ? { ...data, id: editingId } : p));
      toast.success('Plan updated');
    } else {
      setPlans([...plans, { ...data, id: Date.now() }]);
      toast.success('Plan added');
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      setPlans(plans.filter(p => p.id !== id));
      toast.success('Plan deleted');
    }
  };

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
              {plans.sort((a, b) => a.order - b.order).map((plan) => (
                <tr key={plan.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{plan.name || plan.title}</span>
                      {plan.recommended && <Star size={14} className="text-yellow-500 fill-yellow-500" />}
                    </div>
                    <span className="text-xs text-slate-500">Order: {plan.order}</span>
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
                      <button onClick={() => handleDelete(plan.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
                    <label className="block text-sm font-medium text-slate-700 mb-1">Plan Name</label>
                    <input {...register('name')} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Display Order</label>
                    <input type="number" {...register('order', { valueAsNumber: true })} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900" />
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
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Features (comma separated)</label>
                  <textarea {...register('features')} rows={3} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 resize-none" placeholder="Feature 1, Feature 2, Feature 3" />
                  {errors.features && <p className="text-red-500 text-xs mt-1">{errors.features.message}</p>}
                </div>

                <label className="flex items-center gap-2 cursor-pointer pt-2">
                  <input type="checkbox" {...register('recommended')} className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-4 h-4" />
                  <span className="text-sm font-medium text-slate-700">Mark as Recommended Plan</span>
                </label>

                <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-slate-100">
                  <button type="button" onClick={closeModal} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 flex items-center gap-2 font-medium transition-colors">
                    <Save size={16} /> Save Plan
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
