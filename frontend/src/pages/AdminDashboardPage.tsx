import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import api from '../api/api';
import { toast } from 'react-toastify';

interface AdminStats {
  totalQuestions: number;
  totalAnswers: number;
  totalUsers: number;
  recentQuestions: any[];
  recentUsers: any[];
}

const AdminDashboardPage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && isAdmin()) {
      fetchAdminStats();
    }
  }, [user]);

  const isAdmin = () => {
    // This would be determined by a role field in the user object
    // For now, we'll assume any logged-in user can access admin
    return user && user.email; // Replace with actual admin check
  };

  const fetchAdminStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data);
    } catch (error: any) {
      toast.error('Failed to load admin stats');
      console.error('Admin stats error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner text="Checking permissions..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    return (
      <div className="container">
        <div className="error">
          <h2>Access Denied</h2>
          <p>You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner text="Loading admin dashboard..." />;
  }

  return (
    <div className="container">
      <div style={{ margin: '2rem 0' }}>
        <h1>Admin Dashboard</h1>
        
        {stats && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', margin: '2rem 0' }}>
              <div className="card text-center">
                <h3>{stats.totalQuestions}</h3>
                <p>Total Questions</p>
              </div>
              <div className="card text-center">
                <h3>{stats.totalAnswers}</h3>
                <p>Total Answers</p>
              </div>
              <div className="card text-center">
                <h3>{stats.totalUsers}</h3>
                <p>Total Users</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
              <div className="card">
                <h3>Recent Questions</h3>
                {stats.recentQuestions.length > 0 ? (
                  <div>
                    {stats.recentQuestions.map((question: any) => (
                      <div key={question.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
                        <div style={{ fontWeight: 'bold' }}>{question.title}</div>
                        <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>
                          by {question.author.username} • {new Date(question.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No recent questions</p>
                )}
              </div>

              <div className="card">
                <h3>Recent Users</h3>
                {stats.recentUsers.length > 0 ? (
                  <div>
                    {stats.recentUsers.map((user: any) => (
                      <div key={user.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
                        <div style={{ fontWeight: 'bold' }}>{user.username}</div>
                        <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>
                          {user.email} • Joined {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No recent users</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
