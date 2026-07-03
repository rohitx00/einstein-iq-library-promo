import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Upload, Trash2, Image as ImageIcon } from 'lucide-react';

const initialGallery = [
  { id: 1, url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d', title: 'Main Reading Room', category: 'Study Areas' },
  { id: 2, url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f', title: 'Silent Zone', category: 'Study Areas' },
  { id: 3, url: 'https://images.unsplash.com/photo-1497366216548-37526070297c', title: 'Conference Room', category: 'Meeting Rooms' },
  { id: 4, url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d', title: 'Coffee Lounge', category: 'Amenities' },
];

export const GalleryManagement = () => {
  const [images, setImages] = useState(initialGallery);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      const newImages = files.map((file, index) => ({
        id: Date.now() + index,
        url: URL.createObjectURL(file),
        title: file.name.split('.')[0], // Use filename as default title
        category: 'Uncategorized',
      }));
      
      setImages([...newImages, ...images]);
      setIsUploading(false);
      toast.success(`${files.length} image(s) uploaded successfully`);
    }, 1500);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      setImages(images.filter(img => img.id !== id));
      toast.success('Image deleted');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gallery Management</h1>
          <p className="text-slate-500 mt-1">Upload and manage images for the library gallery.</p>
        </div>
        
        <label className="bg-slate-900 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors cursor-pointer">
          <Upload size={18} /> 
          {isUploading ? 'Uploading...' : 'Upload Images'}
          <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div key={img.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group">
            <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
              <img src={img.url} alt={img.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={() => handleDelete(img.id)}
                  className="bg-white text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors shadow-lg"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <input 
                type="text" 
                defaultValue={img.title} 
                className="font-medium text-slate-900 w-full focus:outline-none focus:ring-2 focus:ring-slate-900 rounded px-1 -mx-1"
                onBlur={(e) => {
                  toast.success('Title updated');
                }}
              />
              <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                <ImageIcon size={14} />
                <select className="bg-transparent focus:outline-none cursor-pointer hover:text-slate-700">
                  <option>Study Areas</option>
                  <option>Meeting Rooms</option>
                  <option>Amenities</option>
                  <option>Uncategorized</option>
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
