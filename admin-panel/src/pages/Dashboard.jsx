import { Users, FileImage, MessageSquare, Star, BookOpen, Coffee, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Contact Messages', value: '12', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-100' },
  { label: 'Gallery Images', value: '24', icon: FileImage, color: 'text-purple-500', bg: 'bg-purple-100' },
  { label: 'Testimonials', value: '8', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-100' },
  { label: 'Membership Plans', value: '3', icon: BookOpen, color: 'text-green-500', bg: 'bg-green-100' },
  { label: 'Facilities', value: '6', icon: Coffee, color: 'text-orange-500', bg: 'bg-orange-100' },
  { label: 'FAQs', value: '10', icon: HelpCircle, color: 'text-red-500', bg: 'bg-red-100' },
];

const recentMessages = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', subject: 'Membership Inquiry', date: '2 hours ago', status: 'Unread' },
  { id: 2, name: 'Bob Johnson', email: 'bob@example.com', subject: 'Library Tour', date: '5 hours ago', status: 'Read' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', subject: 'Pricing Question', date: '1 day ago', status: 'Read' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', subject: 'Corporate Plan', date: '2 days ago', status: 'Read' },
];

export const Dashboard = () => {
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
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
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
              {recentMessages.map((msg) => (
                <tr key={msg.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-medium text-slate-900">{msg.name}</p>
                    <p className="text-xs text-slate-500">{msg.email}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-700">{msg.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500">{msg.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      msg.status === 'Unread' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {msg.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
