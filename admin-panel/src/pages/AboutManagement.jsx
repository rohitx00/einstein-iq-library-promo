import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { Save, Image as ImageIcon, Upload } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

const aboutSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  mission: z.string().min(1, 'Mission statement is required'),
  vision: z.string().min(1, 'Vision statement is required'),
});

export const AboutManagement = () => {
  const queryClient = useQueryClient();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const { data: aboutData, isLoading } = useQuery({
    queryKey: ['about'],
    queryFn: async () => {
      const response = await api.get('/about');
      return response.data.data;
    }
  });
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(aboutSchema)
  });

  useEffect(() => {
    if (aboutData) {
      reset(aboutData);
      setImagePreview(aboutData.imageUrl);
    }
  }, [aboutData, reset]);

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await api.put('/about', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success('About section updated successfully');
      queryClient.invalidateQueries({ queryKey: ['about'] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update about section');
    }
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    if (imageFile) {
      formData.append('image', imageFile);
    }
    mutation.mutate(formData);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">About Section Management</h1>
        <p className="text-slate-500 mt-1">Manage the library's story, mission, and vision.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-8">
          
          {/* Text Content */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Core Information</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Section Title</label>
                <input
                  {...register('title')}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Main Description</label>
                <textarea
                  {...register('description')}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all resize-none"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Our Mission</label>
              <textarea
                {...register('mission')}
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all resize-none"
              />
              {errors.mission && <p className="text-red-500 text-sm mt-1">{errors.mission.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Our Vision</label>
              <textarea
                {...register('vision')}
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all resize-none"
              />
              {errors.vision && <p className="text-red-500 text-sm mt-1">{errors.vision.message}</p>}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Image Upload Section */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <ImageIcon size={20} className="text-slate-500" /> About Us Image
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative w-full sm:w-64 h-64 rounded-xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300 group">
                {imagePreview ? (
                  <img src={imagePreview} alt="About Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">No image</div>
                )}
                <label className="absolute inset-0 bg-slate-900/50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Upload size={24} className="mb-2" />
                  <span className="text-sm font-medium">Change Image</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              </div>
              <div className="flex-1 text-sm text-slate-500">
                <p className="font-medium text-slate-700 mb-1">Upload Requirements:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Portrait or Square aspect ratio recommended</li>
                  <li>Max file size: 5MB</li>
                  <li>Format: JPG, PNG, WebP</li>
                </ul>
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
