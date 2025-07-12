import { useState, useEffect, useCallback } from 'react';
import type { Notification } from '../types';
import { NotificationItem } from '../components/NotificationCenter';
import { NotificationPreference } from '../components/NotificationPreferences';

interface UseNotificationsReturn {
  notifications: NotificationItem[];
  preferences: NotificationPreference[];
  unreadCount: number;
  isLoading: boolean;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;
  updatePreferences: (preferences: NotificationPreference[]) => void;
  addNotification: (notification: Omit<NotificationItem, 'id' | 'createdAt'>) => void;
  requestPermission: () => Promise<boolean>;
  hasPermission: boolean;
}

// Mock data for notifications
const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    type: 'answer',
    title: 'New Answer on Your Question',
    message: 'Someone answered your question "How to use React hooks effectively?"',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    questionId: '1',
    fromUser: {
      id: '2',
      username: 'Jane Smith',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=28a745&color=fff&size=40'
    },
    priority: 'high'
  },
  {
    id: '2',
    type: 'vote',
    title: 'Your Answer Was Upvoted',
    message: 'Your answer received 5 new upvotes',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    questionId: '2',
    answerId: '1',
    priority: 'medium'
  },
  {
    id: '3',
    type: 'accept',
    title: 'Answer Accepted!',
    message: 'Your answer was marked as the accepted solution',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    questionId: '1',
    answerId: '1',
    fromUser: {
      id: '1',
      username: 'John Doe',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=f48024&color=fff&size=40'
    },
    priority: 'high'
  },
  {
    id: '4',
    type: 'comment',
    title: 'New Comment',
    message: 'Someone commented on your answer',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    questionId: '3',
    answerId: '2',
    fromUser: {
      id: '3',
      username: 'Mike Johnson',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=dc3545&color=fff&size=40'
    },
    priority: 'low'
  },
  {
    id: '5',
    type: 'mention',
    title: 'You Were Mentioned',
    message: 'Someone mentioned you in a comment',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
    questionId: '4',
    fromUser: {
      id: '2',
      username: 'Jane Smith',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=28a745&color=fff&size=40'
    },
    priority: 'medium'
  }
];

const defaultPreferences: NotificationPreference[] = [
  {
    id: '1',
    label: 'New Answers',
    description: 'Get notified when someone answers your questions',
    type: 'answer',
    channels: { web: true, email: true, push: true },
    frequency: 'instant'
  },
  {
    id: '2',
    label: 'Vote Updates',
    description: 'Get notified when your content receives votes',
    type: 'vote',
    channels: { web: true, email: false, push: true },
    frequency: 'daily'
  },
  {
    id: '3',
    label: 'Accepted Answers',
    description: 'Get notified when your answers are accepted',
    type: 'accept',
    channels: { web: true, email: true, push: true },
    frequency: 'instant'
  },
  {
    id: '4',
    label: 'Comments',
    description: 'Get notified when someone comments on your content',
    type: 'comment',
    channels: { web: true, email: false, push: false },
    frequency: 'instant'
  },
  {
    id: '5',
    label: 'Mentions',
    description: 'Get notified when someone mentions you',
    type: 'mention',
    channels: { web: true, email: true, push: true },
    frequency: 'instant'
  },
  {
    id: '6',
    label: 'Newsletter',
    description: 'Receive weekly updates about popular content',
    type: 'newsletter',
    channels: { web: false, email: true, push: false },
    frequency: 'weekly'
  }
];

export const useNotifications = (): UseNotificationsReturn => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [preferences, setPreferences] = useState<NotificationPreference[]>(defaultPreferences);
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Load from localStorage or use mock data
        const storedNotifications = localStorage.getItem('notifications');
        const storedPreferences = localStorage.getItem('notificationPreferences');
        
        if (storedNotifications) {
          setNotifications(JSON.parse(storedNotifications));
        } else {
          setNotifications(mockNotifications);
        }
        
        if (storedPreferences) {
          setPreferences(JSON.parse(storedPreferences));
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load notifications:', error);
        setIsLoading(false);
      }
    };

    loadNotifications();
  }, []);

  // Check for notification permission
  useEffect(() => {
    if ('Notification' in window) {
      setHasPermission(Notification.permission === 'granted');
    }
  }, []);

  // Save to localStorage whenever notifications change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }
  }, [notifications, isLoading]);

  // Save preferences to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('notificationPreferences', JSON.stringify(preferences));
    }
  }, [preferences, isLoading]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const updatePreferences = useCallback((newPreferences: NotificationPreference[]) => {
    setPreferences(newPreferences);
  }, []);

  const addNotification = useCallback((notification: Omit<NotificationItem, 'id' | 'createdAt'>) => {
    const newNotification: NotificationItem = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Show browser notification if enabled and permission granted
    const preference = preferences.find(p => p.type === notification.type);
    if (
      preference?.channels.web && 
      preference?.frequency !== 'disabled' &&
      hasPermission &&
      'Notification' in window
    ) {
      try {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/favicon.ico',
          tag: notification.type
        });
      } catch (error) {
        console.error('Failed to show notification:', error);
      }
    }
  }, [preferences, hasPermission]);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      return false;
    }

    if (Notification.permission === 'granted') {
      setHasPermission(true);
      return true;
    }

    if (Notification.permission === 'denied') {
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      const granted = permission === 'granted';
      setHasPermission(granted);
      return granted;
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return false;
    }
  }, []);

  // Simulate real-time notifications (for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add a notification (5% chance every 30 seconds)
      if (Math.random() < 0.05) {
        const types: NotificationItem['type'][] = ['vote', 'comment', 'answer'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        
        const messages: Record<string, string> = {
          vote: 'Your content received a new vote!',
          comment: 'Someone commented on your post',
          answer: 'New answer on your question'
        };

        addNotification({
          type: randomType,
          title: `New ${randomType}`,
          message: messages[randomType] || 'New notification',
          isRead: false,
          priority: 'medium'
        });
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [addNotification]);

  return {
    notifications,
    preferences,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    updatePreferences,
    addNotification,
    requestPermission,
    hasPermission
  };
};
