import React from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { FaBell, FaThumbsUp, FaCheck, FaComments, FaUser, FaRocket } from './Icons';

const NotificationDemo: React.FC = () => {
  const { addNotification } = useNotifications();

  const triggerNotification = (type: 'answer' | 'vote' | 'accept' | 'comment' | 'mention') => {
    const notifications = {
      answer: {
        title: '🎉 New Answer!',
        message: 'Someone just answered your question about React hooks!',
        priority: 'high' as const
      },
      vote: {
        title: '👍 Vote Received!',
        message: 'Your answer got a new upvote - great job!',
        priority: 'medium' as const
      },
      accept: {
        title: '✅ Answer Accepted!',
        message: 'Your answer was marked as the accepted solution!',
        priority: 'high' as const
      },
      comment: {
        title: '💬 New Comment!',
        message: 'Someone commented on your post',
        priority: 'low' as const
      },
      mention: {
        title: '👋 You Were Mentioned!',
        message: 'Someone mentioned you in a discussion',
        priority: 'medium' as const
      }
    };

    const notification = notifications[type];
    addNotification({
      type,
      title: notification.title,
      message: notification.message,
      isRead: false,
      priority: notification.priority,
      fromUser: {
        id: '2',
        username: 'Demo User',
        avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=28a745&color=fff&size=40'
      }
    });
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'white',
      padding: '1rem',
      borderRadius: '12px',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
      border: '1px solid #e9ecef',
      zIndex: 1000,
      width: '280px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1rem',
        paddingBottom: '0.75rem',
        borderBottom: '1px solid #f8f9fa'
      }}>
        <FaRocket style={{ color: '#667eea' }} />
        <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#2c3e50' }}>
          Notification Demo
        </h4>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        <button
          onClick={() => triggerNotification('answer')}
          style={{
            padding: '0.5rem 0.75rem',
            border: 'none',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
            color: 'white',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <FaComments />
          New Answer
        </button>

        <button
          onClick={() => triggerNotification('vote')}
          style={{
            padding: '0.5rem 0.75rem',
            border: 'none',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #28a745 0%, #1e7e34 100%)',
            color: 'white',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <FaThumbsUp />
          New Vote
        </button>

        <button
          onClick={() => triggerNotification('accept')}
          style={{
            padding: '0.5rem 0.75rem',
            border: 'none',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
            color: 'white',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <FaCheck />
          Answer Accepted
        </button>

        <button
          onClick={() => triggerNotification('comment')}
          style={{
            padding: '0.5rem 0.75rem',
            border: 'none',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #6f42c1 0%, #563d7c 100%)',
            color: 'white',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <FaComments />
          New Comment
        </button>

        <button
          onClick={() => triggerNotification('mention')}
          style={{
            padding: '0.5rem 0.75rem',
            border: 'none',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #fd7e14 0%, #dc3545 100%)',
            color: 'white',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <FaUser />
          New Mention
        </button>
      </div>

      <div style={{
        fontSize: '0.7rem',
        color: '#6c757d',
        textAlign: 'center',
        marginTop: '0.75rem',
        paddingTop: '0.75rem',
        borderTop: '1px solid #f8f9fa'
      }}>
        Demo notifications for testing
      </div>
    </div>
  );
};

export default NotificationDemo;
