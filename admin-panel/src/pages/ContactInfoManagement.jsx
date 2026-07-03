import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { Save, Phone, Mail, MapPin, Clock, Share2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

const contactInfoSchema = z.object({
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
  workingHours: z.string().optional().or(z.literal('')),
  mapUrl: z.string().url('Invalid map URL').optional().or(z.literal('')),
  facebook: z.string().url('Invalid URL').optional().or(z.literal('')),
  instagram: z.string().url('Invalid URL').optional().or(z.literal('')),
  linkedin: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export const ContactInfoManagement = () => {
  const queryClient = useQueryClient();

  const { data: contactInfo, isLoading } = useQuery({
    queryKey: ['contactInfo'],
    queryFn: async () => {
      const response = await api.get('/contact');
      return response.data.data;
    }
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(contactInfoSchema),
  });

  useEffect(() => {
    if (contactInfo) {
      reset({
        phone: contactInfo.phone || '',
        email: contactInfo.email || '',
        address: contactInfo.address || '',
        workingHours: contactInfo.workingHours || '',
        mapUrl: contactInfo.mapUrl || '',
        facebook: contactInfo.facebook || '',
        instagram: contactInfo.instagram || '',
        linkedin: contactInfo.linkedin || '',
      });
    }
  }, [contactInfo, reset]);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.put('/contact', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Contact info updated successfully');
      queryClient.invalidateQueries({ queryKey: ['contactInfo'] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update contact info');
    }
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Contact Information</h1>
        <p className="text-slate-500 mt-1">Manage library address, phone, and social media links.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-8">
          
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Phone size={20} className="text-slate-500" /> Primary Contact Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <input
                  {...register('phone')}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                  placeholder="+91 9876543210"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                  placeholder="contact@einsteiniq.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-slate-500" /> Location & Hours
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Physical Address</label>
                <textarea
                  {...register('address')}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all resize-none"
                  placeholder="123 Library Street, Academic District..."
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Google Maps Embed URL</label>
                <input
                  {...register('mapUrl')}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                  placeholder="https://www.google.com/maps/embed?..."
                />
                {errors.mapUrl && <p className="text-red-500 text-sm mt-1">{errors.mapUrl.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
                  Working Hours <Clock size={14} className="text-slate-400" />
                </label>
                <input
                  {...register('workingHours')}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                  placeholder="Mon-Sun: 24/7"
                />
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Share2 size={20} className="text-slate-500" /> Social Media Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Instagram URL</label>
                <input
                  {...register('instagram')}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                  placeholder="https://instagram.com/..."
                />
                {errors.instagram && <p className="text-red-500 text-sm mt-1">{errors.instagram.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Facebook URL</label>
                <input
                  {...register('facebook')}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                  placeholder="https://facebook.com/..."
                />
                {errors.facebook && <p className="text-red-500 text-sm mt-1">{errors.facebook.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn URL</label>
                <input
                  {...register('linkedin')}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                  placeholder="https://linkedin.com/..."
                />
                {errors.linkedin && <p className="text-red-500 text-sm mt-1">{errors.linkedin.message}</p>}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2 font-medium disabled:opacity-70"
            >
              <Save size={18} />
              {mutation.isPending ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
