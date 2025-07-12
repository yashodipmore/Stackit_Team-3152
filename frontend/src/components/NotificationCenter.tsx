import React, { useState, useEffect } from 'react';
import { 
  FaBell, 
  FaCheck, 
  FaTimes, 
  FaUser, 
  FaClock, 
  FaQuestionCircle, 
  FaComments,
  FaThumbsUp,
  FaFilter,
  FaTrash
} from './Icons';

export interface NotificationItem {
  id: string;
  type: 'answer' | 'vote' | 'accept' | 'comment' | 'mention';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  questionId?: string;
  answerId?: string;
  fromUser?: {
    id: string;
    username: string;
    avatar?: string;
  };
  priority: 'low' | 'medium' | 'high';
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onClearAll
}) => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | NotificationItem['type']>('all');

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const getNotificationIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'answer':
        return <FaComments style={{ color: '#007bff' }} />;
      case 'vote':
        return <FaThumbsUp style={{ color: '#28a745' }} />;
      case 'accept':
        return <FaCheck style={{ color: '#28a745' }} />;
      case 'comment':
        return <FaComments style={{ color: '#6f42c1' }} />;
      case 'mention':
        return <FaUser style={{ color: '#fd7e14' }} />;
      default:
        return <FaBell style={{ color: '#6c757d' }} />;
    }
  };

  const getPriorityColor = (priority: NotificationItem['priority']) => {
    switch (priority) {
      case 'high':
        return '#dc3545';
      case 'medium':
        return '#ffc107';
      case 'low':
        return '#28a745';
      default:
        return '#6c757d';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread' && notification.isRead) return false;
    if (filter === 'read' && !notification.isRead) return false;
    if (typeFilter !== 'all' && notification.type !== typeFilter) return false;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingTop: '2rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FaBell style={{ fontSize: '1.5rem' }} />
            <h3 style={{ margin: 0, fontWeight: '600' }}>Notifications</h3>
            {unreadCount > 0 && (
              <span style={{
                background: '#dc3545',
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                {unreadCount} new
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1.2rem',
              padding: '0.5rem',
              borderRadius: '50%',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <FaTimes />
          </button>
        </div>

        {/* Controls */}
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid #e9ecef',
          background: '#f8f9fa'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['all', 'unread', 'read'].map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption as any)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '20px',
                    background: filter === filterOption 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                      : 'white',
                    color: filter === filterOption ? 'white' : '#495057',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    textTransform: 'capitalize',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {filterOption}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {unreadCount > 0 && (
                <button
                  onClick={onMarkAllAsRead}
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid #28a745',
                    borderRadius: '6px',
                    background: 'none',
                    color: '#28a745',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <FaCheck />
                  Mark all read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={onClearAll}
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid #dc3545',
                    borderRadius: '6px',
                    background: 'none',
                    color: '#dc3545',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <FaTrash />
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Type Filter */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['all', 'answer', 'vote', 'accept', 'comment', 'mention'].map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type as any)}
                style={{
                  padding: '0.25rem 0.75rem',
                  border: '1px solid #e9ecef',
                  borderRadius: '15px',
                  background: typeFilter === type ? '#667eea' : 'white',
                  color: typeFilter === type ? 'white' : '#6c757d',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  textTransform: 'capitalize',
                  transition: 'all 0.3s ease'
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          maxHeight: '400px'
        }}>
          {filteredNotifications.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem 2rem',
              color: '#6c757d'
            }}>
              <FaBell style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }} />
              <h4 style={{ marginBottom: '0.5rem' }}>No notifications</h4>
              <p style={{ margin: 0 }}>
                {filter === 'unread' ? 'All caught up!' : 'You have no notifications yet.'}
              </p>
            </div>
          ) : (
            <div style={{ padding: '0.5rem' }}>
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  style={{
                    display: 'flex',
                    padding: '1rem',
                    marginBottom: '0.5rem',
                    background: notification.isRead ? 'white' : 'linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%)',
                    borderRadius: '8px',
                    border: `1px solid ${notification.isRead ? '#e9ecef' : '#c7d2fe'}`,
                    borderLeft: `4px solid ${getPriorityColor(notification.priority)}`,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onClick={() => !notification.isRead && onMarkAsRead(notification.id)}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#f8f9fa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '1rem',
                    flexShrink: 0
                  }}>
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '0.5rem'
                    }}>
                      <h5 style={{
                        margin: 0,
                        fontSize: '0.95rem',
                        fontWeight: notification.isRead ? '500' : '600',
                        color: notification.isRead ? '#495057' : '#2c3e50'
                      }}>
                        {notification.title}
                      </h5>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{
                          fontSize: '0.8rem',
                          color: '#6c757d',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}>
                          <FaClock />
                          {getTimeAgo(notification.createdAt)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(notification.id);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#dc3545',
                            cursor: 'pointer',
                            padding: '0.25rem',
                            borderRadius: '4px',
                            fontSize: '0.8rem'
                          }}
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>

                    <p style={{
                      margin: 0,
                      fontSize: '0.9rem',
                      color: '#6c757d',
                      lineHeight: '1.4'
                    }}>
                      {notification.message}
                    </p>

                    {notification.fromUser && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginTop: '0.5rem',
                        fontSize: '0.8rem',
                        color: '#6c757d'
                      }}>
                        <FaUser />
                        <span>from {notification.fromUser.username}</span>
                      </div>
                    )}

                    {!notification.isRead && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onMarkAsRead(notification.id);
                        }}
                        style={{
                          marginTop: '0.5rem',
                          padding: '0.25rem 0.75rem',
                          border: '1px solid #667eea',
                          borderRadius: '15px',
                          background: 'none',
                          color: '#667eea',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        <FaCheck />
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
