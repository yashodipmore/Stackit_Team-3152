import React, { useState, useEffect } from 'react';
import {
  FaUsers,
  FaUser,
  FaShieldAlt,
  FaBan,
  FaUnlock,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaEnvelope,
  FaCrown,
  FaCheck,
  FaTimes,
  FaEye
} from './Icons';

export interface UserRole {
  id: string;
  name: string;
  permissions: string[];
  color: string;
  icon: React.ReactNode;
}

export interface ExtendedUser {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: UserRole;
  status: 'active' | 'banned' | 'suspended';
  createdAt: string;
  lastActivity: string;
  questionsCount: number;
  answersCount: number;
  reputation: number;
  warnings: number;
}

interface UserManagementProps {
  users: ExtendedUser[];
  onUpdateUser: (user: ExtendedUser) => void;
  onBanUser: (userId: string, reason: string) => void;
  onUnbanUser: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
  onSendMessage: (userId: string, message: string) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({
  users,
  onUpdateUser,
  onBanUser,
  onUnbanUser,
  onDeleteUser,
  onSendMessage
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<ExtendedUser | null>(null);
  const [showBanDialog, setShowBanDialog] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [banReason, setBanReason] = useState('');
  const [messageContent, setMessageContent] = useState('');

  const roles: UserRole[] = [
    {
      id: 'admin',
      name: 'Administrator',
      permissions: ['manage_users', 'moderate_content', 'platform_settings', 'view_analytics'],
      color: '#dc3545',
      icon: <FaCrown />
    },
    {
      id: 'moderator',
      name: 'Moderator',
      permissions: ['moderate_content', 'manage_reports', 'warn_users'],
      color: '#28a745',
      icon: <FaShieldAlt />
    },
    {
      id: 'user',
      name: 'User',
      permissions: ['post_questions', 'post_answers', 'vote', 'comment'],
      color: '#007bff',
      icon: <FaUser />
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role.id === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#28a745';
      case 'banned': return '#dc3545';
      case 'suspended': return '#ffc107';
      default: return '#6c757d';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <FaCheck />;
      case 'banned': return <FaBan />;
      case 'suspended': return <FaTimes />;
      default: return <FaUser />;
    }
  };

  const handleBanUser = () => {
    if (selectedUser && banReason.trim()) {
      onBanUser(selectedUser.id, banReason);
      setShowBanDialog(false);
      setBanReason('');
      setSelectedUser(null);
    }
  };

  const handleSendMessage = () => {
    if (selectedUser && messageContent.trim()) {
      onSendMessage(selectedUser.id, messageContent);
      setShowMessageDialog(false);
      setMessageContent('');
      setSelectedUser(null);
    }
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <FaUsers style={{ fontSize: '2.5rem', marginBottom: '1rem' }} />
        <h2 style={{ margin: 0, fontWeight: '600' }}>User Management</h2>
        <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
          Manage users, roles, and permissions
        </p>
      </div>

      {/* Filters */}
      <div style={{
        padding: '1.5rem',
        borderBottom: '1px solid #e9ecef',
        background: '#f8f9fa'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Search Users
            </label>
            <div style={{ position: 'relative' }}>
              <FaSearch style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6c757d'
              }} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  border: '1px solid #ced4da',
                  borderRadius: '8px',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Filter by Role
            </label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ced4da',
                borderRadius: '8px',
                fontSize: '0.9rem'
              }}
            >
              <option value="all">All Roles</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Filter by Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ced4da',
                borderRadius: '8px',
                fontSize: '0.9rem'
              }}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="banned">Banned</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>
            Showing {filteredUsers.length} of {users.length} users
          </span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {roles.map(role => {
              const count = users.filter(u => u.role.id === role.id).length;
              return (
                <div
                  key={role.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.25rem 0.75rem',
                    background: role.color,
                    color: 'white',
                    borderRadius: '15px',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}
                >
                  {role.icon}
                  {count}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e9ecef' }}>
                User
              </th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e9ecef' }}>
                Role
              </th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e9ecef' }}>
                Status
              </th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e9ecef' }}>
                Activity
              </th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e9ecef' }}>
                Reputation
              </th>
              <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600', borderBottom: '1px solid #e9ecef' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr
                key={user.id}
                style={{
                  borderBottom: '1px solid #f8f9fa',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.username}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '600'
                      }}>
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div style={{ fontWeight: '600', color: '#2c3e50' }}>
                        {user.username}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                
                <td style={{ padding: '1rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.25rem 0.75rem',
                    background: user.role.color,
                    color: 'white',
                    borderRadius: '15px',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    width: 'fit-content'
                  }}>
                    {user.role.icon}
                    {user.role.name}
                  </div>
                </td>
                
                <td style={{ padding: '1rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.25rem 0.75rem',
                    background: getStatusColor(user.status),
                    color: 'white',
                    borderRadius: '15px',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    width: 'fit-content'
                  }}>
                    {getStatusIcon(user.status)}
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </div>
                </td>
                
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontSize: '0.9rem', color: '#2c3e50' }}>
                    {user.questionsCount} questions
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>
                    {user.answersCount} answers
                  </div>
                </td>
                
                <td style={{ padding: '1rem' }}>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#667eea'
                  }}>
                    {user.reputation}
                  </div>
                  {user.warnings > 0 && (
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#dc3545',
                      fontWeight: '500'
                    }}>
                      {user.warnings} warnings
                    </div>
                  )}
                </td>
                
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowMessageDialog(true);
                      }}
                      style={{
                        padding: '0.5rem',
                        border: 'none',
                        borderRadius: '6px',
                        background: '#17a2b8',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                      title="Send Message"
                    >
                      <FaEnvelope />
                    </button>
                    
                    {user.status === 'active' ? (
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowBanDialog(true);
                        }}
                        style={{
                          padding: '0.5rem',
                          border: 'none',
                          borderRadius: '6px',
                          background: '#dc3545',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                        title="Ban User"
                      >
                        <FaBan />
                      </button>
                    ) : (
                      <button
                        onClick={() => onUnbanUser(user.id)}
                        style={{
                          padding: '0.5rem',
                          border: 'none',
                          borderRadius: '6px',
                          background: '#28a745',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                        title="Unban User"
                      >
                        <FaUnlock />
                      </button>
                    )}
                    
                    <button
                      onClick={() => onDeleteUser(user.id)}
                      style={{
                        padding: '0.5rem',
                        border: 'none',
                        borderRadius: '6px',
                        background: '#6c757d',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                      title="Delete User"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ban User Dialog */}
      {showBanDialog && selectedUser && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#dc3545' }}>
              Ban User: {selectedUser.username}
            </h3>
            <p style={{ margin: '0 0 1rem 0', color: '#6c757d' }}>
              Please provide a reason for banning this user:
            </p>
            <textarea
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
              placeholder="Enter ban reason..."
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '0.75rem',
                border: '1px solid #ced4da',
                borderRadius: '8px',
                fontSize: '0.9rem',
                resize: 'vertical'
              }}
            />
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1.5rem',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => {
                  setShowBanDialog(false);
                  setBanReason('');
                  setSelectedUser(null);
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: '1px solid #6c757d',
                  borderRadius: '8px',
                  background: 'white',
                  color: '#6c757d',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleBanUser}
                disabled={!banReason.trim()}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '8px',
                  background: banReason.trim() ? '#dc3545' : '#6c757d',
                  color: 'white',
                  cursor: banReason.trim() ? 'pointer' : 'not-allowed'
                }}
              >
                Ban User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message User Dialog */}
      {showMessageDialog && selectedUser && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#667eea' }}>
              Send Message to: {selectedUser.username}
            </h3>
            <textarea
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder="Enter your message..."
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '0.75rem',
                border: '1px solid #ced4da',
                borderRadius: '8px',
                fontSize: '0.9rem',
                resize: 'vertical'
              }}
            />
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1.5rem',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => {
                  setShowMessageDialog(false);
                  setMessageContent('');
                  setSelectedUser(null);
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: '1px solid #6c757d',
                  borderRadius: '8px',
                  background: 'white',
                  color: '#6c757d',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!messageContent.trim()}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '8px',
                  background: messageContent.trim() ? '#667eea' : '#6c757d',
                  color: 'white',
                  cursor: messageContent.trim() ? 'pointer' : 'not-allowed'
                }}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
