import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import UserManagement, { ExtendedUser, UserRole } from '../components/UserManagement';
import ContentModeration, { ContentReport } from '../components/ContentModeration';
import PlatformMessaging, { PlatformMessage } from '../components/PlatformMessaging';
import {
  FaUsers,
  FaFlag,
  FaBroadcastTower,
  FaChartLine,
  FaCog,
  FaShieldAlt,
  FaUser,
  FaCrown,
  FaExclamationTriangle,
  FaEnvelope,
  FaCheck,
  FaTimes
} from '../components/Icons';

const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'moderation' | 'messaging' | 'settings'>('overview');

  // Mock data - in real app, this would come from API
  const [users, setUsers] = useState<ExtendedUser[]>([
    {
      id: 'demo',
      username: 'Demo User',
      email: 'demo@stackit.com',
      avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=667eea&color=fff&size=80',
      role: {
        id: 'user',
        name: 'User',
        permissions: ['post_questions', 'post_answers', 'vote', 'comment'],
        color: '#007bff',
        icon: React.createElement(FaUser)
      },
      status: 'active',
      createdAt: '2025-01-10T10:00:00Z',
      lastActivity: '2025-07-12T08:30:00Z',
      questionsCount: 5,
      answersCount: 12,
      reputation: 245,
      warnings: 0
    },
    {
      id: '1',
      username: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=f48024&color=fff&size=80',
      role: {
        id: 'moderator',
        name: 'Moderator',
        permissions: ['moderate_content', 'manage_reports', 'warn_users'],
        color: '#28a745',
        icon: React.createElement(FaShieldAlt)
      },
      status: 'active',
      createdAt: '2024-12-15T14:30:00Z',
      lastActivity: '2025-07-12T09:15:00Z',
      questionsCount: 3,
      answersCount: 28,
      reputation: 567,
      warnings: 0
    },
    {
      id: '2',
      username: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=28a745&color=fff&size=80',
      role: {
        id: 'admin',
        name: 'Administrator',
        permissions: ['manage_users', 'moderate_content', 'platform_settings', 'view_analytics'],
        color: '#dc3545',
        icon: React.createElement(FaCrown)
      },
      status: 'active',
      createdAt: '2024-11-01T08:15:00Z',
      lastActivity: '2025-07-12T10:45:00Z',
      questionsCount: 8,
      answersCount: 45,
      reputation: 1234,
      warnings: 0
    },
    {
      id: '3',
      username: 'Banned User',
      email: 'banned@example.com',
      role: {
        id: 'user',
        name: 'User',
        permissions: ['post_questions', 'post_answers', 'vote', 'comment'],
        color: '#007bff',
        icon: React.createElement(FaUser)
      },
      status: 'banned',
      createdAt: '2025-06-01T16:45:00Z',
      lastActivity: '2025-07-10T14:20:00Z',
      questionsCount: 2,
      answersCount: 1,
      reputation: 15,
      warnings: 3
    }
  ]);

  const [reports, setReports] = useState<ContentReport[]>([
    {
      id: '1',
      type: 'answer',
      contentId: 'answer-123',
      content: {
        text: 'This is spam content that violates our community guidelines and should be removed immediately.',
        author: {
          id: '4',
          username: 'SpamUser',
          avatar: 'https://ui-avatars.com/api/?name=Spam+User&background=dc3545&color=fff&size=40'
        },
        createdAt: '2025-07-11T15:30:00Z'
      },
      reporter: {
        id: '2',
        username: 'Jane Smith'
      },
      reason: 'This content appears to be spam and is not relevant to the question.',
      category: 'spam',
      status: 'pending',
      priority: 'high',
      reportedAt: '2025-07-12T09:15:00Z'
    },
    {
      id: '2',
      type: 'question',
      contentId: 'question-456',
      content: {
        title: 'Inappropriate Question Title',
        text: 'This question contains inappropriate content that makes users uncomfortable.',
        author: {
          id: '5',
          username: 'ProblematicUser'
        },
        createdAt: '2025-07-10T18:45:00Z'
      },
      reporter: {
        id: '1',
        username: 'John Doe'
      },
      reason: 'Contains inappropriate language and content.',
      category: 'inappropriate',
      status: 'reviewing',
      priority: 'medium',
      assignedModerator: '1',
      reportedAt: '2025-07-11T10:30:00Z'
    }
  ]);

  const [messages, setMessages] = useState<PlatformMessage[]>([
    {
      id: '1',
      type: 'announcement',
      subject: 'Platform Maintenance Scheduled',
      content: 'We will be performing scheduled maintenance on July 15th from 2:00 AM to 4:00 AM UTC. During this time, the platform may be temporarily unavailable.',
      sender: {
        id: 'admin',
        username: 'System Admin',
        role: 'admin'
      },
      recipients: {
        type: 'all',
        targets: ['all'],
        count: 1250
      },
      priority: 'high',
      status: 'sent',
      sentAt: '2025-07-10T12:00:00Z',
      readCount: 892,
      deliveryStatus: {
        sent: 1250,
        delivered: 1248,
        read: 892,
        failed: 2
      }
    },
    {
      id: '2',
      type: 'warning',
      subject: 'Community Guidelines Reminder',
      content: 'This is a reminder to follow our community guidelines. Recent violations have been increasing, and we want to maintain a respectful environment for all users.',
      sender: {
        id: 'admin',
        username: 'Moderation Team',
        role: 'admin'
      },
      recipients: {
        type: 'role',
        targets: ['user'],
        count: 1200
      },
      priority: 'medium',
      status: 'scheduled',
      scheduledFor: '2025-07-13T10:00:00Z',
      readCount: 0,
      deliveryStatus: {
        sent: 0,
        delivered: 0,
        read: 0,
        failed: 0
      }
    }
  ]);

  // Event handlers
  const handleUpdateUser = (updatedUser: ExtendedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
  };

  const handleBanUser = (userId: string, reason: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: 'banned' as const, warnings: user.warnings + 1 }
        : user
    ));
    console.log(`User ${userId} banned for: ${reason}`);
  };

  const handleUnbanUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: 'active' as const }
        : user
    ));
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleSendMessage = (userId: string, message: string) => {
    console.log(`Message sent to user ${userId}: ${message}`);
  };

  const handleResolveReport = (reportId: string, action: 'approve' | 'remove' | 'warn', notes?: string) => {
    setReports(reports.map(report => 
      report.id === reportId 
        ? { 
            ...report, 
            status: 'resolved' as const, 
            resolvedAt: new Date().toISOString(),
            moderatorNotes: notes
          }
        : report
    ));
    console.log(`Report ${reportId} resolved with action: ${action}`);
  };

  const handleDismissReport = (reportId: string, notes?: string) => {
    setReports(reports.map(report => 
      report.id === reportId 
        ? { 
            ...report, 
            status: 'dismissed' as const, 
            resolvedAt: new Date().toISOString(),
            moderatorNotes: notes
          }
        : report
    ));
  };

  const handleAssignModerator = (reportId: string, moderatorId: string) => {
    setReports(reports.map(report => 
      report.id === reportId 
        ? { ...report, assignedModerator: moderatorId, status: 'reviewing' as const }
        : report
    ));
  };

  const handleSendPlatformMessage = (message: Omit<PlatformMessage, 'id' | 'sentAt' | 'deliveryStatus'>) => {
    const newMessage: PlatformMessage = {
      ...message,
      id: Date.now().toString(),
      sentAt: message.status === 'sent' ? new Date().toISOString() : undefined,
      deliveryStatus: {
        sent: message.status === 'sent' ? message.recipients.count : 0,
        delivered: message.status === 'sent' ? Math.floor(message.recipients.count * 0.95) : 0,
        read: 0,
        failed: message.status === 'sent' ? Math.floor(message.recipients.count * 0.05) : 0
      }
    };
    setMessages([newMessage, ...messages]);
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter(message => message.id !== messageId));
  };

  const handleScheduleMessage = (messageId: string, scheduledFor: string) => {
    setMessages(messages.map(message => 
      message.id === messageId 
        ? { ...message, scheduledFor, status: 'scheduled' as const }
        : message
    ));
  };

  // Check if user has admin permissions
  if (!user || user.id !== 'demo') { // In real app, check proper admin role
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <FaShieldAlt style={{ fontSize: '3rem', color: '#dc3545' }} />
        <h2 style={{ color: '#dc3545' }}>Access Denied</h2>
        <p style={{ color: '#6c757d' }}>You don't have permission to access the admin dashboard.</p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh',
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <h1 style={{
            margin: '0 0 0.5rem 0',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2.5rem',
            fontWeight: '700'
          }}>
            Admin Dashboard
          </h1>
          <p style={{
            margin: 0,
            color: '#6c757d',
            fontSize: '1.1rem'
          }}>
            Manage users, moderate content, and oversee platform operations
          </p>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '2rem',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {[
              { id: 'overview', label: 'Overview', icon: <FaChartLine /> },
              { id: 'users', label: 'User Management', icon: <FaUsers /> },
              { id: 'moderation', label: 'Content Moderation', icon: <FaFlag /> },
              { id: 'messaging', label: 'Platform Messaging', icon: <FaBroadcastTower /> },
              { id: 'settings', label: 'Settings', icon: <FaCog /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '1rem 1.5rem',
                  border: 'none',
                  borderRadius: '8px',
                  background: activeTab === tab.id
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'transparent',
                  color: activeTab === tab.id ? 'white' : '#6c757d',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease'
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {/* Stats Cards */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e9ecef'
            }}>
              <FaUsers style={{ fontSize: '2.5rem', color: '#667eea', marginBottom: '1rem' }} />
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#2c3e50',
                marginBottom: '0.5rem'
              }}>
                {users.length}
              </div>
              <div style={{
                color: '#6c757d',
                fontSize: '1rem',
                fontWeight: '500'
              }}>
                Total Users
              </div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e9ecef'
            }}>
              <FaFlag style={{ fontSize: '2.5rem', color: '#e74c3c', marginBottom: '1rem' }} />
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#2c3e50',
                marginBottom: '0.5rem'
              }}>
                {reports.filter(r => r.status === 'pending').length}
              </div>
              <div style={{
                color: '#6c757d',
                fontSize: '1rem',
                fontWeight: '500'
              }}>
                Pending Reports
              </div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e9ecef'
            }}>
              <FaEnvelope style={{ fontSize: '2.5rem', color: '#28a745', marginBottom: '1rem' }} />
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#2c3e50',
                marginBottom: '0.5rem'
              }}>
                {messages.filter(m => m.status === 'sent').length}
              </div>
              <div style={{
                color: '#6c757d',
                fontSize: '1rem',
                fontWeight: '500'
              }}>
                Messages Sent
              </div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e9ecef'
            }}>
              <FaExclamationTriangle style={{ fontSize: '2.5rem', color: '#ffc107', marginBottom: '1rem' }} />
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#2c3e50',
                marginBottom: '0.5rem'
              }}>
                {users.filter(u => u.status === 'banned').length}
              </div>
              <div style={{
                color: '#6c757d',
                fontSize: '1rem',
                fontWeight: '500'
              }}>
                Banned Users
              </div>
            </div>

            {/* Recent Activity */}
            <div style={{
              gridColumn: '1 / -1',
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ margin: '0 0 1.5rem 0', color: '#2c3e50' }}>Recent Activity</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { icon: <FaFlag style={{ color: '#e74c3c' }} />, text: 'New spam report received', time: '2 hours ago' },
                  { icon: <FaUsers style={{ color: '#667eea' }} />, text: 'New user registered', time: '4 hours ago' },
                  { icon: <FaEnvelope style={{ color: '#28a745' }} />, text: 'Platform announcement sent', time: '1 day ago' },
                  { icon: <FaExclamationTriangle style={{ color: '#ffc107' }} />, text: 'User warning issued', time: '2 days ago' }
                ].map((activity, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      background: '#f8f9fa',
                      borderRadius: '8px'
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem'
                    }}>
                      {activity.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '500', color: '#2c3e50' }}>
                        {activity.text}
                      </div>
                    </div>
                    <div style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <UserManagement
            users={users}
            onUpdateUser={handleUpdateUser}
            onBanUser={handleBanUser}
            onUnbanUser={handleUnbanUser}
            onDeleteUser={handleDeleteUser}
            onSendMessage={handleSendMessage}
          />
        )}

        {activeTab === 'moderation' && (
          <ContentModeration
            reports={reports}
            onResolveReport={handleResolveReport}
            onDismissReport={handleDismissReport}
            onAssignModerator={handleAssignModerator}
          />
        )}

        {activeTab === 'messaging' && (
          <PlatformMessaging
            messages={messages}
            onSendMessage={handleSendPlatformMessage}
            onDeleteMessage={handleDeleteMessage}
            onScheduleMessage={handleScheduleMessage}
          />
        )}

        {activeTab === 'settings' && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <FaCog style={{ fontSize: '3rem', color: '#6c757d', marginBottom: '1rem' }} />
            <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>Platform Settings</h3>
            <p style={{ color: '#6c757d', margin: 0 }}>
              Platform configuration and settings will be available here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
