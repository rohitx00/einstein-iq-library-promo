import { Users, FileImage, MessageSquare, Star, BookOpen, Coffee, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const Dashboard = () => {
  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const response = await api.get('/dashboard');
      return response.data.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 bg-red-50 p-4 rounded-xl border border-red-100">
        Failed to load dashboard data. Please try again.
      </div>
    );
  }

  const stats = [
    { label: 'Contact Messages', value: dashboardData.messagesCount, icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-100' },
    { label: 'Gallery Images', value: dashboardData.galleryCount, icon: FileImage, color: 'text-purple-500', bg: 'bg-purple-100' },
    { label: 'Testimonials', value: dashboardData.testimonialsCount, icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    { label: 'Membership Plans', value: dashboardData.plansCount, icon: BookOpen, color: 'text-green-500', bg: 'bg-green-100' },
    { label: 'Facilities', value: dashboardData.facilitiesCount, icon: Coffee, color: 'text-orange-500', bg: 'bg-orange-100' },
    { label: 'FAQs', value: dashboardData.faqsCount, icon: HelpCircle, color: 'text-red-500', bg: 'bg-red-100' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back, Admin. Here is what is happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4"
          >
            <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center shrink-0`}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Messages Table */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden mt-8">
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Recent Contact Messages</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-medium">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Subject</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {dashboardData.recentMessages?.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-500">
                    No recent messages.
                  </td>
                </tr>
              ) : (
                dashboardData.recentMessages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-medium text-slate-900">{msg.name}</p>
                      <p className="text-xs text-slate-500">{msg.email}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-700 capitalize">{msg.requestType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        msg.status === 'unread' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {msg.status === 'unread' ? 'Unread' : 'Read'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
