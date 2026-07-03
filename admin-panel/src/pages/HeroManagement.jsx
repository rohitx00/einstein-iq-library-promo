import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { Save, Image as ImageIcon, Upload } from 'lucide-react';

const heroSchema = z.object({
  headline: z.string().min(1, 'Headline is required'),
  subtitle: z.string().min(1, 'Subtitle is required'),
  primaryCtaText: z.string().min(1, 'Primary CTA text is required'),
  primaryCtaLink: z.string().min(1, 'Primary CTA link is required'),
  secondaryCtaText: z.string().min(1, 'Secondary CTA text is required'),
  secondaryCtaLink: z.string().min(1, 'Secondary CTA link is required'),
});

export const HeroManagement = () => {
  const [imagePreview, setImagePreview] = useState('https://images.unsplash.com/photo-1507842217343-583bb7270b66');
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      headline: 'The Premium Space For Deep Focus.',
      subtitle: 'Elevate your academic and professional journey in an environment designed for absolute concentration and success.',
      primaryCtaText: 'Explore Memberships',
      primaryCtaLink: '/membership',
      secondaryCtaText: 'Discover Our Story',
      secondaryCtaLink: '/about',
    }
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const onSubmit = async (data) => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Saved Hero Data:', data);
        toast.success('Hero section updated successfully');
        resolve();
      }, 1000);
    });
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Hero Section Management</h1>
        <p className="text-slate-500 mt-1">Update the main landing area of your website.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-8">
          
          {/* Image Upload Section */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <ImageIcon size={20} className="text-slate-500" /> Background Image
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative w-full sm:w-64 h-40 rounded-xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300 group">
                {imagePreview ? (
                  <img src={imagePreview} alt="Hero Preview" className="w-full h-full object-cover" />
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
                  <li>High resolution (1920x1080 minimum)</li>
                  <li>Max file size: 5MB</li>
                  <li>Format: JPG, PNG, WebP</li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Text Content */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Text Content</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Headline</label>
                <input
                  {...register('headline')}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                />
                {errors.headline && <p className="text-red-500 text-sm mt-1">{errors.headline.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle / Description</label>
                <textarea
                  {...register('subtitle')}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all resize-none"
                />
                {errors.subtitle && <p className="text-red-500 text-sm mt-1">{errors.subtitle.message}</p>}
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Call to Actions */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Call to Action Buttons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h3 className="font-medium text-slate-800 text-sm">Primary Button (Solid)</h3>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Button Text</label>
                  <input {...register('primaryCtaText')} className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Destination URL</label>
                  <input {...register('primaryCtaLink')} className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm" />
                </div>
              </div>

              <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h3 className="font-medium text-slate-800 text-sm">Secondary Button (Outline)</h3>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Button Text</label>
                  <input {...register('secondaryCtaText')} className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Destination URL</label>
                  <input {...register('secondaryCtaLink')} className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2 font-medium disabled:opacity-70"
            >
              <Save size={18} />
              {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
