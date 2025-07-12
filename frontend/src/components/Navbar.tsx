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
  FaSignInAlt,
  FaChartLine,
  FaShieldAlt
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
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <FaBell style={{ fontSize: '18px', color: '#666' }} />
                    {unreadCount > 0 && (
                      <span style={{
                        position: 'absolute',
                        top: '2px',
                        right: '2px',
                        background: 'linear-gradient(135deg, #dc3545 0%, #e74c3c 100%)',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: '600',
                        padding: '2px 6px',
                        borderRadius: '10px',
                        minWidth: '16px',
                        textAlign: 'center',
                        lineHeight: '1.2',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                      }}>
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </span>
                    )}
                  </button>
                  
                  {showNotifications && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: '0',
                      background: 'white',
                      borderRadius: '12px',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                      width: '320px',
                      maxHeight: '400px',
                      overflow: 'hidden',
                      border: '1px solid #e9ecef',
                      zIndex: 1000
                    }}>
                      <div style={{
                        padding: '1rem 1.5rem',
                        borderBottom: '1px solid #e9ecef',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <h4 style={{ margin: 0, fontWeight: '600' }}>Notifications</h4>
                        <Link
                          to="/notifications"
                          onClick={() => setShowNotifications(false)}
                          style={{
                            color: 'white',
                            textDecoration: 'none',
                            fontSize: '0.9rem',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '15px',
                            background: 'rgba(255, 255, 255, 0.2)',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                        >
                          View All
                        </Link>
                      </div>
                      
                      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {notifications.length === 0 ? (
                          <div style={{
                            padding: '2rem',
                            textAlign: 'center',
                            color: '#6c757d'
                          }}>
                            <FaBell style={{ fontSize: '2rem', marginBottom: '1rem', opacity: 0.5 }} />
                            <p style={{ margin: 0 }}>No notifications yet</p>
                          </div>
                        ) : (
                          notifications.slice(0, 5).map((notification) => (
                            <div
                              key={notification.id}
                              style={{
                                padding: '1rem 1.5rem',
                                borderBottom: '1px solid #f8f9fa',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s',
                                background: notification.isRead ? 'white' : '#f8f9ff'
                              }}
                              onClick={() => handleNotificationClick(notification)}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = notification.isRead ? 'white' : '#f8f9ff'}
                            >
                              <div style={{
                                fontWeight: notification.isRead ? '400' : '600',
                                fontSize: '0.9rem',
                                marginBottom: '0.25rem',
                                color: '#2c3e50'
                              }}>
                                {notification.title}
                              </div>
                              <div style={{
                                fontSize: '0.8rem',
                                color: '#6c757d',
                                marginBottom: '0.25rem'
                              }}>
                                {notification.message}
                              </div>
                              <div style={{
                                fontSize: '0.75rem',
                                color: '#adb5bd',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                              }}>
                                <span>{new Date(notification.createdAt).toLocaleDateString()}</span>
                                {!notification.isRead && (
                                  <span style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: '#dc3545'
                                  }} />
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                      
                      {notifications.length > 5 && (
                        <div style={{
                          padding: '0.75rem 1.5rem',
                          background: '#f8f9fa',
                          textAlign: 'center'
                        }}>
                          <Link
                            to="/notifications"
                            onClick={() => setShowNotifications(false)}
                            style={{
                              color: '#667eea',
                              textDecoration: 'none',
                              fontSize: '0.9rem',
                              fontWeight: '500'
                            }}
                          >
                            View {notifications.length - 5} more notifications
                          </Link>
                        </div>
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

                <Link to="/analytics" className="btn btn-outline btn-sm" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginRight: '8px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  textDecoration: 'none'
                }}>
                  <FaChartLine />
                  Analytics
                </Link>

                {user.id === 'demo' && ( // Only show admin link for demo user (or check proper admin role)
                  <Link to="/admin" className="btn btn-outline btn-sm" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginRight: '8px',
                    background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                    color: 'white',
                    border: 'none',
                    textDecoration: 'none'
                  }}>
                    <FaShieldAlt />
                    Admin
                  </Link>
                )}
                
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
