import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Mail, Phone, Calendar, Trash2, CheckCircle, Clock } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export const MessagesManagement = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('all');

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const response = await api.get('/messages');
      return response.data.data;
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const response = await api.put(`/messages/${id}`, { status });
      return response.data;
    },
    onSuccess: () => {
      toast.success('Message status updated');
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to update message')
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/messages/${id}`);
    },
    onSuccess: () => {
      toast.success('Message deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to delete message')
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleUpdateStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'unread' ? 'read' : 'unread';
    updateMutation.mutate({ id, status: newStatus });
  };

  const filteredMessages = messages.filter((msg) => {
    if (filter === 'all') return true;
    return msg.status === filter;
  });

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
          <h1 className="text-2xl font-bold text-slate-900">Contact Messages</h1>
          <p className="text-slate-500 mt-1">Manage inquiries and booking requests.</p>
        </div>
        
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
        >
          <option value="all">All Messages</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </select>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Sender Info</th>
                <th className="px-6 py-4">Request Type</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredMessages.map((msg) => (
                <tr key={msg.id} className={`transition-colors ${msg.status === 'unread' ? 'bg-blue-50/50 hover:bg-blue-50' : 'hover:bg-slate-50'}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-medium text-slate-900">{msg.name}</p>
                    <div className="flex flex-col gap-0.5 mt-1">
                      <span className="text-xs text-slate-500 flex items-center gap-1"><Mail size={12} /> {msg.email}</span>
                      {msg.phone && <span className="text-xs text-slate-500 flex items-center gap-1"><Phone size={12} /> {msg.phone}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="capitalize font-medium text-slate-700">{msg.requestType}</span>
                    {msg.plan && <span className="block text-xs text-slate-500 mt-1">Plan: {msg.plan}</span>}
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate">
                    {msg.message || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => handleUpdateStatus(msg.id, msg.status)}
                      disabled={updateMutation.isPending}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors border ${
                        msg.status === 'unread' 
                          ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' 
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {msg.status === 'unread' ? <Clock size={12} /> : <CheckCircle size={12} />}
                      {msg.status === 'unread' ? 'Mark Read' : 'Read'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDelete(msg.id)} 
                      disabled={deleteMutation.isPending}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded disabled:opacity-50 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredMessages.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500">No messages found matching the filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
