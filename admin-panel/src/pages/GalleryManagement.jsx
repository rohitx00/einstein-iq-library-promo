import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export const GalleryManagement = () => {
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState(false);

  const { data: images = [], isLoading } = useQuery({
    queryKey: ['gallery'],
    queryFn: async () => {
      const response = await api.get('/gallery');
      return response.data.data;
    }
  });

  const uploadMutation = useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('title', file.name.split('.')[0]);
      formData.append('category', 'Uncategorized');
      
      const response = await api.post('/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    },
    // Removed onSuccess invalidation here to prevent spamming GET requests during loop
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to upload image')
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await api.put(`/gallery/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Image details updated');
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to update image')
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/gallery/${id}`);
    },
    onSuccess: () => {
      toast.success('Image deleted');
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to delete image')
  });

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    let successCount = 0;
    
    for (const file of files) {
      try {
        await uploadMutation.mutateAsync(file);
        successCount++;
      } catch (error) {
        // error handled in mutation
      }
    }
    
    setIsUploading(false);
    if (successCount > 0) {
      toast.success(`${successCount} image(s) uploaded successfully`);
      // Invalidate query ONCE after all uploads are complete
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
    }
    // reset file input
    e.target.value = '';
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleUpdate = (id, field, value) => {
    const image = images.find(img => img.id === id);
    if (image && image[field] !== value) {
      updateMutation.mutate({ id, data: { [field]: value } });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gallery Management</h1>
          <p className="text-slate-500 mt-1">Upload and manage images for the library gallery.</p>
        </div>
        
        <label className={`bg-slate-900 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors ${isUploading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}>
          <Upload size={18} /> 
          {isUploading ? 'Uploading...' : 'Upload Images'}
          <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div key={img.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group">
            <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
              <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              
              {/* Always visible delete button in top-right */}
              <button 
                onClick={() => handleDelete(img.id)}
                disabled={deleteMutation.isPending}
                className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-red-600 p-2 rounded-full hover:bg-red-50 hover:text-red-700 transition-colors shadow-md disabled:opacity-50 z-10"
                title="Delete image"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="p-4">
              <input 
                type="text" 
                defaultValue={img.title} 
                className="font-medium text-slate-900 w-full focus:outline-none focus:ring-2 focus:ring-slate-900 rounded px-1 -mx-1"
                onBlur={(e) => handleUpdate(img.id, 'title', e.target.value)}
              />
              <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                <ImageIcon size={14} />
                <select 
                  className="bg-transparent focus:outline-none cursor-pointer hover:text-slate-700 w-full"
                  defaultValue={img.category}
                  onChange={(e) => handleUpdate(img.id, 'category', e.target.value)}
                >
                  <option value="Study Areas">Study Areas</option>
                  <option value="Meeting Rooms">Meeting Rooms</option>
                  <option value="Amenities">Amenities</option>
                  <option value="Uncategorized">Uncategorized</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {images.length === 0 && (
        <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
          <ImageIcon size={48} className="text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-1">No images found</h3>
          <p className="text-slate-500 mb-4">Upload some images to showcase your library.</p>
          <label className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-colors cursor-pointer">
            Select Files
            <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
      )}
    </div>
  );
};
