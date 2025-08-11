// components/AdminDashboard.tsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api'; 
import { 
  Settings, 
  Users, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Eye,
  Calendar,
  TrendingUp,
  Loader2,
  Search,
  Filter
} from 'lucide-react';

interface QuestionnaireSummary {
    id: number;
    user: { username: string };
    status: string;
    submitted_at: string;
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return { 
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: Clock,
          text: 'Pending Review'
        };
      case 'reviewed':
        return { 
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle,
          text: 'Reviewed'
        };
      case 'approved':
        return { 
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: CheckCircle,
          text: 'Approved'
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: AlertTriangle,
          text: status.charAt(0).toUpperCase() + status.slice(1)
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${config.color}`}>
      <Icon className="h-4 w-4" />
      {config.text}
    </span>
  );
};

const StatCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle: string;
  gradient: string;
}> = ({ icon, title, value, subtitle, gradient }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className={`bg-gradient-to-r ${gradient} p-6`}>
      <div className="flex items-center justify-between text-white">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          <p className="text-white/70 text-sm mt-1">{subtitle}</p>
        </div>
        <div className="bg-white/20 rounded-2xl p-3">
          {icon}
        </div>
      </div>
    </div>
  </div>
);

export const AdminDashboard: React.FC = () => {
    const [pending, setPending] = useState<QuestionnaireSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        const fetchPending = async () => {
            try {
                const res = await api.getPendingReviews();
                const summaryData = res.data.map((q: any) => ({
                    id: q.id,
                    user: { username: q.personal_info.contact || `User ${q.id}` }, 
                    status: q.status,
                    submitted_at: q.submitted_at
                }));
                setPending(summaryData);
            } catch (err) {
                setError('Failed to fetch pending reviews. You may not have admin privileges.');
            } finally {
                setLoading(false);
            }
        };

        fetchPending();
    }, []);

    const filteredSubmissions = pending.filter(submission => {
        const matchesSearch = submission.user.username.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || submission.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: pending.length,
        pending: pending.filter(q => q.status.toLowerCase() === 'pending').length,
        reviewed: pending.filter(q => q.status.toLowerCase() === 'reviewed').length,
        recent: pending.filter(q => {
            const submittedDate = new Date(q.submitted_at);
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            return submittedDate >= yesterday;
        }).length
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5F9F5] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 text-[#4C7B4C] animate-spin mx-auto mb-4" />
                    <p className="text-lg text-gray-600">Loading admin dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#F5F9F5] flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center border border-red-200">
                    <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F9F5] py-8 px-4">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] p-8 text-white">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-white/20 rounded-2xl p-3">
                                <Settings className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                                <p className="text-white/90">Manage health questionnaire submissions</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        icon={<FileText className="h-6 w-6" />}
                        title="Total Submissions"
                        value={stats.total}
                        subtitle="All time"
                        gradient="from-blue-500 to-blue-600"
                    />
                    <StatCard
                        icon={<Clock className="h-6 w-6" />}
                        title="Pending Reviews"
                        value={stats.pending}
                        subtitle="Awaiting review"
                        gradient="from-yellow-500 to-yellow-600"
                    />
                    <StatCard
                        icon={<CheckCircle className="h-6 w-6" />}
                        title="Reviewed"
                        value={stats.reviewed}
                        subtitle="Completed"
                        gradient="from-green-500 to-green-600"
                    />
                    <StatCard
                        icon={<TrendingUp className="h-6 w-6" />}
                        title="Recent (24h)"
                        value={stats.recent}
                        subtitle="New submissions"
                        gradient="from-purple-500 to-purple-600"
                    />
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-[#F5F9F5]">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#4C7B4C] to-[#5a8a5a] shadow-lg">
                                    <Users className="h-6 w-6 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Pending Reviews</h2>
                            </div>
                            
                            {/* Search and Filter */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by user..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C7B4C] focus:border-transparent w-full sm:w-64"
                                    />
                                </div>
                                <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="pl-10 pr-8 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C7B4C] focus:border-transparent appearance-none bg-white"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="reviewed">Reviewed</option>
                                        <option value="approved">Approved</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        {filteredSubmissions.length > 0 ? (
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-700">User</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Submitted</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredSubmissions.map((q) => (
                                        <tr key={q.id} className="hover:bg-gray-50 transition-colors duration-200">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-[#4C7B4C] to-[#5a8a5a] rounded-full flex items-center justify-center">
                                                        <Users className="h-5 w-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{q.user.username}</p>
                                                        <p className="text-sm text-gray-500">ID: {q.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <StatusBadge status={q.status} />
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Calendar className="h-4 w-4" />
                                                    <span className="font-medium">
                                                        {new Date(q.submitted_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(q.submitted_at).toLocaleTimeString()}
                                                </p>
                                            </td>
                                            <td className="py-4 px-6">
                                                <Link
                                                    to={`/admin/review/${q.id}`}
                                                    className="inline-flex items-center gap-2 bg-[#4C7B4C] text-white px-4 py-2 rounded-xl font-medium hover:bg-[#5a8a5a] transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                    Review
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center py-16">
                                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <FileText className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Submissions Found</h3>
                                <p className="text-gray-600">
                                    {searchTerm || statusFilter !== 'all' 
                                        ? 'No submissions match your current filters.' 
                                        : 'No submissions are currently pending review.'
                                    }
                                </p>
                                {(searchTerm || statusFilter !== 'all') && (
                                    <button
                                        onClick={() => {
                                            setSearchTerm('');
                                            setStatusFilter('all');
                                        }}
                                        className="mt-4 text-[#4C7B4C] hover:text-[#5a8a5a] font-medium"
                                    >
                                        Clear filters
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};