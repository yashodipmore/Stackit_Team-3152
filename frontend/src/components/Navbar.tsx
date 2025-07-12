import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../hooks/useNotifications';
import SearchComponent from './SearchComponent';
import { 
  FaStackOverflow, 
  FaBell, 
  FaUser, 
  FaSignOutAlt, 
  FaSignInAlt
} from './Icons';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery, filter, setFilter }) => {
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    setShowNotifications(false);
    if (notification.questionId) {
      navigate(`/question/${notification.questionId}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getUserInitials = (username: string) => {
    return username.split(' ').map(name => name[0]).join('').toUpperCase();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-left">
            <Link to="/" className="logo">
              <FaStackOverflow style={{ marginRight: '8px', color: '#f48024' }} />
              StackIt
            </Link>
            <SearchComponent
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filter={filter}
              onFilterChange={setFilter}
              placeholder="Search questions..."
            />
          </div>

          <div className="navbar-right">
            {user ? (
              <>
                <div className="notification-container" ref={notificationRef}>
                  <button
                    className="notification-bell"
                    onClick={() => setShowNotifications(!showNotifications)}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      cursor: 'pointer',
                      position: 'relative',
                      padding: '8px',
                      borderRadius: '6px',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <FaBell style={{ fontSize: '18px', color: '#666' }} />
                    {unreadCount > 0 && (
                      <span className="notification-badge">{unreadCount}</span>
                    )}
                  </button>
                  
                  {showNotifications && (
                    <div className="notifications-dropdown">
                      {notifications.length === 0 ? (
                        <div className="notification-item">
                          No notifications
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                            onClick={() => handleNotificationClick(notification)}
                          >
                            <div>{notification.message}</div>
                            <div style={{ fontSize: '0.8rem', color: '#6c757d', marginTop: '0.25rem' }}>
                              {new Date(notification.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>

                <div className="user-avatar" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginRight: '12px',
                  padding: '6px 12px',
                  background: '#f8f9fa',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.username} style={{ width: '24px', height: '24px', borderRadius: '50%', marginRight: '8px' }} />
                  ) : (
                    <FaUser style={{ marginRight: '8px', color: '#666' }} />
                  )}
                  {user.username}
                </div>
                
                <button onClick={handleLogout} className="btn btn-secondary btn-sm" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline btn-sm" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginRight: '8px'
                }}>
                  <FaSignInAlt />
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <FaUser />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
