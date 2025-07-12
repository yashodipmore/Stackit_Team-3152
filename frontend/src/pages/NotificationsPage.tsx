import React, { useState } from 'react';
import { useNotifications } from '../hooks/useNotifications';
import NotificationCenter from '../components/NotificationCenter';
import NotificationPreferences from '../components/NotificationPreferences';
import { FaBell, FaCog, FaSpinner } from '../components/Icons';

const NotificationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'preferences'>('notifications');
  const {
    notifications,
    preferences,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    updatePreferences,
    requestPermission,
    hasPermission
  } = useNotifications();

  const handleSavePreferences = async () => {
    // Here you would typically save to API
    console.log('Preferences saved!');
    
    // Show success message
    alert('Notification preferences saved successfully!');
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <FaSpinner style={{ 
          fontSize: '2rem', 
          color: '#667eea',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ color: '#6c757d' }}>Loading notifications...</p>
        <style>
          {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh',
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
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
            Notification Center
          </h1>
          <p style={{
            margin: 0,
            color: '#6c757d',
            fontSize: '1.1rem'
          }}>
            Stay updated with your StackIt community activity
          </p>
        </div>

        {/* Permission Request Banner */}
        {!hasPermission && 'Notification' in window && (
          <div style={{
            background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
            color: '#2d3436',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
          }}>
            <div>
              <h4 style={{ margin: '0 0 0.25rem 0' }}>Enable Browser Notifications</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
                Get instant notifications for important updates
              </p>
            </div>
            <button
              onClick={requestPermission}
              style={{
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderRadius: '6px',
                background: '#2d3436',
                color: 'white',
                cursor: 'pointer',
                fontWeight: '600',
                whiteSpace: 'nowrap'
              }}
            >
              Enable Notifications
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '2rem',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center'
          }}>
            <button
              onClick={() => setActiveTab('notifications')}
              style={{
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '8px',
                background: activeTab === 'notifications'
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'transparent',
                color: activeTab === 'notifications' ? 'white' : '#6c757d',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease'
              }}
            >
              <FaBell />
              Notifications
              {unreadCount > 0 && (
                <span style={{
                  background: '#dc3545',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  marginLeft: '0.25rem'
                }}>
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('preferences')}
              style={{
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '8px',
                background: activeTab === 'preferences'
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'transparent',
                color: activeTab === 'preferences' ? 'white' : '#6c757d',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease'
              }}
            >
              <FaCog />
              Preferences
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'notifications' && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <NotificationCenter
              isOpen={true}
              onClose={() => {}}
              notifications={notifications}
              onMarkAsRead={markAsRead}
              onMarkAllAsRead={markAllAsRead}
              onDelete={deleteNotification}
              onClearAll={clearAllNotifications}
            />
          </div>
        )}

        {activeTab === 'preferences' && (
          <NotificationPreferences
            preferences={preferences}
            onUpdatePreferences={updatePreferences}
            onSave={handleSavePreferences}
          />
        )}

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e9ecef'
          }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#667eea',
              marginBottom: '0.5rem'
            }}>
              {notifications.length}
            </div>
            <div style={{
              color: '#6c757d',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              Total Notifications
            </div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e9ecef'
          }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#dc3545',
              marginBottom: '0.5rem'
            }}>
              {unreadCount}
            </div>
            <div style={{
              color: '#6c757d',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              Unread Notifications
            </div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e9ecef'
          }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#28a745',
              marginBottom: '0.5rem'
            }}>
              {preferences.filter(p => p.frequency !== 'disabled').length}
            </div>
            <div style={{
              color: '#6c757d',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              Active Preferences
            </div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e9ecef'
          }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: hasPermission ? '#28a745' : '#ffc107',
              marginBottom: '0.5rem'
            }}>
              {hasPermission ? '✓' : '!'}
            </div>
            <div style={{
              color: '#6c757d',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              Browser Permission
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
