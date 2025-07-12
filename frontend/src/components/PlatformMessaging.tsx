import React, { useState } from 'react';
import {
  FaEnvelope,
  FaUsers,
  FaBroadcastTower,
  FaPaperPlane,
  FaInbox,
  FaOutbox,
  FaDraft,
  FaTrash,
  FaEye,
  FaReply,
  FaClock,
  FaUser,
  FaFilter,
  FaSearch,
  FaBullhorn,
  FaExclamationTriangle
} from './Icons';

export interface PlatformMessage {
  id: string;
  type: 'announcement' | 'warning' | 'newsletter' | 'personal' | 'system';
  subject: string;
  content: string;
  sender: {
    id: string;
    username: string;
    role: string;
  };
  recipients: {
    type: 'all' | 'role' | 'individual' | 'group';
    targets: string[];
    count: number;
  };
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'sent' | 'scheduled';
  sentAt?: string;
  scheduledFor?: string;
  readCount: number;
  deliveryStatus: {
    sent: number;
    delivered: number;
    read: number;
    failed: number;
  };
  attachments?: {
    name: string;
    url: string;
    size: number;
  }[];
}

interface PlatformMessagingProps {
  messages: PlatformMessage[];
  onSendMessage: (message: Omit<PlatformMessage, 'id' | 'sentAt' | 'deliveryStatus'>) => void;
  onDeleteMessage: (messageId: string) => void;
  onScheduleMessage: (messageId: string, scheduledFor: string) => void;
}

const PlatformMessaging: React.FC<PlatformMessagingProps> = ({
  messages,
  onSendMessage,
  onDeleteMessage,
  onScheduleMessage
}) => {
  const [activeTab, setActiveTab] = useState<'compose' | 'sent' | 'drafts' | 'scheduled'>('compose');
  const [messageType, setMessageType] = useState<'announcement' | 'warning' | 'newsletter' | 'personal'>('announcement');
  const [recipientType, setRecipientType] = useState<'all' | 'role' | 'individual'>('all');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [scheduleDate, setScheduleDate] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const roles = [
    { id: 'admin', name: 'Administrators', count: 3 },
    { id: 'moderator', name: 'Moderators', count: 8 },
    { id: 'user', name: 'Regular Users', count: 1247 }
  ];

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'announcement': return <FaBullhorn style={{ color: '#007bff' }} />;
      case 'warning': return <FaExclamationTriangle style={{ color: '#dc3545' }} />;
      case 'newsletter': return <FaEnvelope style={{ color: '#28a745' }} />;
      case 'personal': return <FaUser style={{ color: '#6f42c1' }} />;
      case 'system': return <FaBroadcastTower style={{ color: '#fd7e14' }} />;
      default: return <FaEnvelope />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#dc3545';
      case 'high': return '#fd7e14';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return '#28a745';
      case 'draft': return '#6c757d';
      case 'scheduled': return '#17a2b8';
      default: return '#6c757d';
    }
  };

  const handleSendMessage = (isDraft: boolean = false) => {
    if (!subject.trim() || !content.trim()) return;

    const recipientCount = recipientType === 'all' ? 1250 : 
                          recipientType === 'role' ? selectedRoles.reduce((acc, roleId) => {
                            const role = roles.find(r => r.id === roleId);
                            return acc + (role?.count || 0);
                          }, 0) : selectedUsers.length;

    const newMessage: Omit<PlatformMessage, 'id' | 'sentAt' | 'deliveryStatus'> = {
      type: messageType,
      subject,
      content,
      sender: {
        id: 'current-user',
        username: 'Admin',
        role: 'admin'
      },
      recipients: {
        type: recipientType,
        targets: recipientType === 'role' ? selectedRoles : 
                recipientType === 'individual' ? selectedUsers : ['all'],
        count: recipientCount
      },
      priority,
      status: isDraft ? 'draft' : scheduleDate ? 'scheduled' : 'sent',
      scheduledFor: scheduleDate || undefined,
      readCount: 0
    };

    onSendMessage(newMessage);
    
    // Reset form
    setSubject('');
    setContent('');
    setSelectedRoles([]);
    setSelectedUsers([]);
    setScheduleDate('');
    setPriority('medium');
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || message.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getTabMessages = () => {
    switch (activeTab) {
      case 'sent':
        return filteredMessages.filter(m => m.status === 'sent');
      case 'drafts':
        return filteredMessages.filter(m => m.status === 'draft');
      case 'scheduled':
        return filteredMessages.filter(m => m.status === 'scheduled');
      default:
        return [];
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
        <FaBroadcastTower style={{ fontSize: '2.5rem', marginBottom: '1rem' }} />
        <h2 style={{ margin: 0, fontWeight: '600' }}>Platform Messaging</h2>
        <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
          Send announcements and messages to users
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #e9ecef',
        background: '#f8f9fa'
      }}>
        {[
          { id: 'compose', label: 'Compose', icon: <FaPaperPlane /> },
          { id: 'sent', label: 'Sent', icon: <FaOutbox /> },
          { id: 'drafts', label: 'Drafts', icon: <FaDraft /> },
          { id: 'scheduled', label: 'Scheduled', icon: <FaClock /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              flex: 1,
              padding: '1rem 1.5rem',
              border: 'none',
              background: activeTab === tab.id ? 'white' : 'transparent',
              color: activeTab === tab.id ? '#667eea' : '#6c757d',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              borderBottom: activeTab === tab.id ? '2px solid #667eea' : 'none',
              transition: 'all 0.3s ease'
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Compose Tab */}
      {activeTab === 'compose' && (
        <div style={{ padding: '2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Message Type
              </label>
              <select
                value={messageType}
                onChange={(e) => setMessageType(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ced4da',
                  borderRadius: '8px',
                  fontSize: '0.9rem'
                }}
              >
                <option value="announcement">📢 Announcement</option>
                <option value="warning">⚠️ Warning</option>
                <option value="newsletter">📧 Newsletter</option>
                <option value="personal">👤 Personal</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Recipients
              </label>
              <select
                value={recipientType}
                onChange={(e) => setRecipientType(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ced4da',
                  borderRadius: '8px',
                  fontSize: '0.9rem'
                }}
              >
                <option value="all">👥 All Users</option>
                <option value="role">🏷️ By Role</option>
                <option value="individual">👤 Individual Users</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ced4da',
                  borderRadius: '8px',
                  fontSize: '0.9rem'
                }}
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🟠 High</option>
                <option value="urgent">🔴 Urgent</option>
              </select>
            </div>
          </div>

          {/* Role Selection */}
          {recipientType === 'role' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Select Roles
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '0.5rem'
              }}>
                {roles.map(role => (
                  <label
                    key={role.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem',
                      border: `2px solid ${selectedRoles.includes(role.id) ? '#667eea' : '#e9ecef'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: selectedRoles.includes(role.id) ? '#f0f4ff' : 'white',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedRoles.includes(role.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRoles([...selectedRoles, role.id]);
                        } else {
                          setSelectedRoles(selectedRoles.filter(r => r !== role.id));
                        }
                      }}
                      style={{ margin: 0 }}
                    />
                    <span style={{ fontWeight: '500' }}>{role.name}</span>
                    <span style={{
                      background: '#6c757d',
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '10px',
                      fontSize: '0.7rem',
                      marginLeft: 'auto'
                    }}>
                      {role.count}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Subject
            </label>
            <input
              type="text"
              placeholder="Enter message subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ced4da',
                borderRadius: '8px',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Message Content
            </label>
            <textarea
              placeholder="Enter your message content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                width: '100%',
                minHeight: '200px',
                padding: '0.75rem',
                border: '1px solid #ced4da',
                borderRadius: '8px',
                fontSize: '0.9rem',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Schedule Send (Optional)
            </label>
            <input
              type="datetime-local"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              style={{
                padding: '0.75rem',
                border: '1px solid #ced4da',
                borderRadius: '8px',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end'
          }}>
            <button
              onClick={() => handleSendMessage(true)}
              disabled={!subject.trim() || !content.trim()}
              style={{
                padding: '0.75rem 1.5rem',
                border: '1px solid #6c757d',
                borderRadius: '8px',
                background: 'white',
                color: '#6c757d',
                cursor: subject.trim() && content.trim() ? 'pointer' : 'not-allowed',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <FaDraft />
              Save Draft
            </button>
            
            <button
              onClick={() => handleSendMessage(false)}
              disabled={!subject.trim() || !content.trim()}
              style={{
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderRadius: '8px',
                background: subject.trim() && content.trim() ? 
                  (scheduleDate ? '#17a2b8' : '#667eea') : '#6c757d',
                color: 'white',
                cursor: subject.trim() && content.trim() ? 'pointer' : 'not-allowed',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {scheduleDate ? <FaClock /> : <FaPaperPlane />}
              {scheduleDate ? 'Schedule Send' : 'Send Now'}
            </button>
          </div>
        </div>
      )}

      {/* Message List Tabs */}
      {(activeTab === 'sent' || activeTab === 'drafts' || activeTab === 'scheduled') && (
        <div>
          {/* Search and Filter */}
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid #e9ecef',
            background: '#f8f9fa'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '1rem',
              alignItems: 'end'
            }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Search Messages
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
                    placeholder="Search by subject or content..."
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
              
              <div style={{
                color: '#6c757d',
                fontSize: '0.9rem',
                textAlign: 'center'
              }}>
                {getTabMessages().length} messages
              </div>
            </div>
          </div>

          {/* Messages List */}
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {getTabMessages().length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '3rem',
                color: '#6c757d'
              }}>
                <FaInbox style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }} />
                <h4 style={{ marginBottom: '0.5rem' }}>No messages found</h4>
                <p style={{ margin: 0 }}>
                  {activeTab === 'sent' ? 'You haven\'t sent any messages yet.' :
                   activeTab === 'drafts' ? 'No draft messages saved.' :
                   'No scheduled messages.'}
                </p>
              </div>
            ) : (
              <div style={{ padding: '0.5rem' }}>
                {getTabMessages().map((message) => (
                  <div
                    key={message.id}
                    style={{
                      border: '1px solid #e9ecef',
                      borderLeft: `4px solid ${getPriorityColor(message.priority)}`,
                      borderRadius: '8px',
                      margin: '0.5rem',
                      padding: '1.5rem',
                      background: 'white',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {getMessageTypeIcon(message.type)}
                        <div>
                          <h4 style={{
                            margin: 0,
                            fontSize: '1.1rem',
                            color: '#2c3e50'
                          }}>
                            {message.subject}
                          </h4>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            marginTop: '0.25rem'
                          }}>
                            <span style={{
                              fontSize: '0.85rem',
                              color: '#6c757d'
                            }}>
                              To: {message.recipients.count} recipients
                            </span>
                            {message.sentAt && (
                              <span style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                fontSize: '0.85rem',
                                color: '#6c757d'
                              }}>
                                <FaClock />
                                {new Date(message.sentAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '15px',
                          fontSize: '0.8rem',
                          fontWeight: '500',
                          background: getPriorityColor(message.priority),
                          color: 'white'
                        }}>
                          {message.priority.toUpperCase()}
                        </span>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '15px',
                          fontSize: '0.8rem',
                          fontWeight: '500',
                          background: getStatusColor(message.status),
                          color: 'white'
                        }}>
                          {message.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div style={{
                      background: '#f8f9fa',
                      padding: '1rem',
                      borderRadius: '8px',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        fontSize: '0.9rem',
                        lineHeight: '1.5',
                        color: '#2c3e50'
                      }}>
                        {message.content.length > 200 
                          ? `${message.content.substring(0, 200)}...` 
                          : message.content}
                      </div>
                    </div>

                    {message.status === 'sent' && (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                        gap: '1rem',
                        padding: '1rem',
                        background: '#e3f2fd',
                        borderRadius: '8px'
                      }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            color: '#1976d2'
                          }}>
                            {message.deliveryStatus.sent}
                          </div>
                          <div style={{
                            fontSize: '0.8rem',
                            color: '#1976d2'
                          }}>
                            Sent
                          </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            color: '#388e3c'
                          }}>
                            {message.deliveryStatus.delivered}
                          </div>
                          <div style={{
                            fontSize: '0.8rem',
                            color: '#388e3c'
                          }}>
                            Delivered
                          </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            color: '#f57c00'
                          }}>
                            {message.deliveryStatus.read}
                          </div>
                          <div style={{
                            fontSize: '0.8rem',
                            color: '#f57c00'
                          }}>
                            Read
                          </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            color: '#d32f2f'
                          }}>
                            {message.deliveryStatus.failed}
                          </div>
                          <div style={{
                            fontSize: '0.8rem',
                            color: '#d32f2f'
                          }}>
                            Failed
                          </div>
                        </div>
                      </div>
                    )}

                    <div style={{
                      display: 'flex',
                      gap: '0.5rem',
                      marginTop: '1rem',
                      justifyContent: 'flex-end'
                    }}>
                      <button
                        onClick={() => onDeleteMessage(message.id)}
                        style={{
                          padding: '0.5rem 1rem',
                          border: '1px solid #dc3545',
                          borderRadius: '6px',
                          background: 'white',
                          color: '#dc3545',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformMessaging;
