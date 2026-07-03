import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { Save, User, Lock } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, 'Password must be at least 6 characters'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const SettingsManagement = () => {
  const { admin, setAdmin } = useAuth();

  const { 
    register: registerProfile, 
    handleSubmit: handleProfileSubmit, 
    formState: { errors: profileErrors } 
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: admin?.name || '',
      email: admin?.email || '',
    }
  });

  const { 
    register: registerPassword, 
    handleSubmit: handlePasswordSubmit, 
    reset: resetPasswordForm,
    formState: { errors: passwordErrors } 
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const profileMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.put('/auth/update-profile', data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success('Profile updated successfully');
      if (data.data && data.data.admin) {
        setAdmin(data.data.admin);
      }
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to update profile')
  });

  const passwordMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.put('/auth/change-password', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Password changed successfully');
      resetPasswordForm();
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to change password')
  });

  const onProfileSubmit = (data) => {
    profileMutation.mutate(data);
  };

  const onPasswordSubmit = (data) => {
    passwordMutation.mutate(data);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your admin profile and security preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Profile Settings */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <User size={20} />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Profile Settings</h2>
          </div>
          
          <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="p-6 space-y-4 flex-1 flex flex-col">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input 
                {...registerProfile('name')} 
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900" 
              />
              {profileErrors.name && <p className="text-red-500 text-xs mt-1">{profileErrors.name.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input 
                {...registerProfile('email')} 
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900" 
              />
              {profileErrors.email && <p className="text-red-500 text-xs mt-1">{profileErrors.email.message}</p>}
            </div>
            
            <div className="mt-auto pt-6">
              <button 
                type="submit" 
                disabled={profileMutation.isPending} 
                className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 flex items-center justify-center gap-2 font-medium transition-colors disabled:opacity-70"
              >
                <Save size={16} /> {profileMutation.isPending ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>
        </div>

        {/* Security Settings */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center gap-3">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <Lock size={20} />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Change Password</h2>
          </div>
          
          <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="p-6 space-y-4 flex-1 flex flex-col">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
              <input 
                type="password"
                {...registerPassword('currentPassword')} 
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900" 
              />
              {passwordErrors.currentPassword && <p className="text-red-500 text-xs mt-1">{passwordErrors.currentPassword.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
              <input 
                type="password"
                {...registerPassword('newPassword')} 
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900" 
              />
              {passwordErrors.newPassword && <p className="text-red-500 text-xs mt-1">{passwordErrors.newPassword.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
              <input 
                type="password"
                {...registerPassword('confirmPassword')} 
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900" 
              />
              {passwordErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{passwordErrors.confirmPassword.message}</p>}
            </div>
            
            <div className="mt-auto pt-6">
              <button 
                type="submit" 
                disabled={passwordMutation.isPending} 
                className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 flex items-center justify-center gap-2 font-medium transition-colors disabled:opacity-70"
              >
                <Lock size={16} /> {passwordMutation.isPending ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
