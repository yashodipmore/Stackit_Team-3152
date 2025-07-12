import React, { useState } from 'react';
import { Shield, Users, MessageSquare, Flag, TrendingUp, Ban, Check, X } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Total Users',
      value: '1,247',
      icon: <Users className="w-6 h-6" />,
      change: '+12%',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Swaps',
      value: '89',
      icon: <TrendingUp className="w-6 h-6" />,
      change: '+8%',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Questions',
      value: '456',
      icon: <MessageSquare className="w-6 h-6" />,
      change: '+15%',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Reports',
      value: '12',
      icon: <Flag className="w-6 h-6" />,
      change: '-5%',
      color: 'from-red-500 to-red-600'
    }
  ];

  const reportedContent = [
    {
      id: '1',
      type: 'question',
      title: 'Inappropriate question about hacking',
      author: 'suspicious_user',
      reportedBy: 'john_doe',
      reason: 'Inappropriate content',
      createdAt: '2024-01-20T10:30:00Z'
    },
    {
      id: '2',
      type: 'profile',
      title: 'Fake skills listed in profile',
      author: 'fake_expert',
      reportedBy: 'jane_smith',
      reason: 'Misleading information',
      createdAt: '2024-01-20T09:15:00Z'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'users', label: 'Users', icon: <Users className="w-5 h-5" /> },
    { id: 'content', label: 'Content Moderation', icon: <Flag className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Shield className="w-8 h-8 text-blue-600 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage users, content, and platform operations
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                            {stat.title}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {stat.value}
                          </p>
                          <p className={`text-sm ${
                            stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stat.change} from last month
                          </p>
                        </div>
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} text-white`}>
                          {stat.icon}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        New user registration: <strong>alex_newbie</strong>
                      </span>
                      <span className="text-xs text-gray-400">2 min ago</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        New skill swap completed between <strong>sarah_designer</strong> and <strong>mike_python</strong>
                      </span>
                      <span className="text-xs text-gray-400">5 min ago</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Content reported by <strong>john_doe</strong>
                      </span>
                      <span className="text-xs text-gray-400">10 min ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Reported Content
                  </h3>
                  <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-sm rounded-full">
                    {reportedContent.length} pending
                  </span>
                </div>

                <div className="space-y-4">
                  {reportedContent.map((report) => (
                    <div
                      key={report.id}
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              report.type === 'question' 
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                                : 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                            }`}>
                              {report.type}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(report.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                            {report.title}
                          </h4>
                          
                          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                            <p><strong>Author:</strong> {report.author}</p>
                            <p><strong>Reported by:</strong> {report.reportedBy}</p>
                            <p><strong>Reason:</strong> {report.reason}</p>
                          </div>
                        </div>

                        <div className="flex space-x-2 ml-4">
                          <button className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                            <Check className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            <Ban className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    User Management
                  </h3>
                  <button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                    Broadcast Message
                  </button>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                  <p className="text-gray-600 dark:text-gray-400">
                    User management features including user search, profile editing, and account status management will be implemented here.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Platform Analytics
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                      Skill Swap Trends
                    </h4>
                    <div className="h-48 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center">
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Chart.js integration placeholder
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                      User Activity
                    </h4>
                    <div className="h-48 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center">
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Analytics visualization placeholder
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;