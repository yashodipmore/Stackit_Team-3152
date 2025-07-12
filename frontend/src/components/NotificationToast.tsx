import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNotifications } from '../hooks/useNotifications';
import { FaBell, FaThumbsUp, FaCheck, FaComments, FaUser } from './Icons';

const NotificationToast: React.FC = () => {
  const { notifications } = useNotifications();

  const getIcon = (type: string) => {
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

  const showNotificationToast = (notification: any) => {
    const CustomToast = ({ closeToast }: { closeToast?: () => void }) => (
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        padding: '0.5rem'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f8f9ff 0%, #e3f2fd 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          {getIcon(notification.type)}
        </div>
        
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontWeight: '600',
            fontSize: '0.95rem',
            marginBottom: '0.25rem',
            color: '#2c3e50'
          }}>
            {notification.title}
          </div>
          <div style={{
            fontSize: '0.85rem',
            color: '#6c757d',
            lineHeight: '1.4'
          }}>
            {notification.message}
          </div>
          {notification.fromUser && (
            <div style={{
              fontSize: '0.8rem',
              color: '#adb5bd',
              marginTop: '0.25rem'
            }}>
              from {notification.fromUser.username}
            </div>
          )}
        </div>

        <button
          onClick={closeToast}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#adb5bd',
            fontSize: '1.1rem',
            padding: '0.25rem',
            borderRadius: '4px',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#6c757d'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#adb5bd'}
        >
          ×
        </button>
      </div>
    );

    // Determine toast type based on notification priority
    const toastType = notification.priority === 'high' ? 'info' 
                     : notification.priority === 'medium' ? 'default' 
                     : 'default';

    toast(<CustomToast />, {
      type: toastType,
      position: 'top-right',
      autoClose: notification.priority === 'high' ? 8000 : 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        background: 'white',
        border: '1px solid #e9ecef',
        borderRadius: '12px',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
        padding: '0.5rem'
      },
      toastId: notification.id // Prevent duplicate toasts
    });
  };

  useEffect(() => {
    // Listen for new notifications (unread ones that were just added)
    const recentNotifications = notifications.filter(notification => {
      const notificationTime = new Date(notification.createdAt);
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      return !notification.isRead && notificationTime > fiveMinutesAgo;
    });

    // Show toast for each recent notification
    recentNotifications.forEach(notification => {
      showNotificationToast(notification);
    });
  }, [notifications]);

  // This component doesn't render anything visible
  return null;
};

export default NotificationToast;
