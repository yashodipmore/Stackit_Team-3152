import React from 'react';
import VotingAnalytics from '../components/VotingAnalytics';
import { useAuth } from '../context/AuthContext';
import { 
  FaChartLine, 
  FaUser, 
  FaQuestionCircle, 
  FaComments,
  FaThumbsUp,
  FaCalendarAlt
} from '../components/Icons';

const AnalyticsPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container" style={{ maxWidth: '800px', margin: '2rem auto', textAlign: 'center' }}>
        <div className="card" style={{
          padding: '3rem',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          border: '2px dashed #dee2e6'
        }}>
          <FaUser style={{ fontSize: '3rem', color: '#6c757d', marginBottom: '1rem' }} />
          <h2 style={{ color: '#495057', marginBottom: '1rem' }}>Login Required</h2>
          <p style={{ color: '#6c757d', marginBottom: '2rem' }}>
            Please log in to view your voting analytics and community insights.
          </p>
          <a 
            href="/login" 
            className="btn btn-primary"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              color: 'white',
              fontWeight: '600'
            }}
          >
            Log In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '1200px', margin: '2rem auto' }}>
      {/* Page Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <FaChartLine style={{ fontSize: '2.5rem' }} />
          <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '700' }}>
            Analytics Dashboard
          </h1>
        </div>
        <p style={{ margin: 0, fontSize: '1.2rem', opacity: 0.9 }}>
          Insights into your voting patterns and community engagement
        </p>
      </div>

      {/* Quick Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div className="card" style={{
          background: 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)',
          border: '1px solid #28a745',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <FaQuestionCircle style={{ fontSize: '2.5rem', color: '#28a745', marginBottom: '1rem' }} />
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#155724' }}>Your Questions</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#155724' }}>12</div>
          <div style={{ fontSize: '0.9rem', color: '#155724', opacity: 0.8 }}>Total asked</div>
        </div>

        <div className="card" style={{
          background: 'linear-gradient(135deg, #cce5ff 0%, #b3d9ff 100%)',
          border: '1px solid #007bff',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <FaComments style={{ fontSize: '2.5rem', color: '#007bff', marginBottom: '1rem' }} />
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#004085' }}>Your Answers</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#004085' }}>34</div>
          <div style={{ fontSize: '0.9rem', color: '#004085', opacity: 0.8 }}>Total provided</div>
        </div>

        <div className="card" style={{
          background: 'linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)',
          border: '1px solid #ffc107',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <FaThumbsUp style={{ fontSize: '2.5rem', color: '#856404', marginBottom: '1rem' }} />
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#856404' }}>Reputation</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#856404' }}>1,247</div>
          <div style={{ fontSize: '0.9rem', color: '#856404', opacity: 0.8 }}>Total points</div>
        </div>

        <div className="card" style={{
          background: 'linear-gradient(135deg, #e2e3e5 0%, #d1d3d4 100%)',
          border: '1px solid #6c757d',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <FaCalendarAlt style={{ fontSize: '2.5rem', color: '#495057', marginBottom: '1rem' }} />
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#495057' }}>Member Since</h3>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#495057' }}>
            {new Date().getFullYear() - 1}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#495057', opacity: 0.8 }}>Years active</div>
        </div>
      </div>

      {/* Main Analytics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '2rem'
      }}>
        {/* Personal Voting Analytics */}
        <VotingAnalytics 
          userId={user.id}
          showUserStats={true}
        />

        {/* Community Analytics */}
        <div>
          <h2 style={{ 
            color: '#2c3e50', 
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <FaChartLine style={{ color: '#667eea' }} />
            Community Overview
          </h2>
          <VotingAnalytics showUserStats={false} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 style={{ 
          marginBottom: '1.5rem', 
          color: '#2c3e50',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <FaCalendarAlt style={{ color: '#667eea' }} />
          Recent Activity
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { action: 'Upvoted', target: 'How to use React hooks effectively?', time: '2 hours ago', type: 'question' },
            { action: 'Answered', target: 'TypeScript vs JavaScript for large projects', time: '5 hours ago', type: 'answer' },
            { action: 'Asked', target: 'Best practices for API error handling', time: '1 day ago', type: 'question' },
            { action: 'Upvoted', target: 'Great explanation about React performance...', time: '2 days ago', type: 'answer' }
          ].map((activity, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              background: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: activity.action === 'Upvoted' 
                  ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
                  : activity.action === 'Answered'
                    ? 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                {activity.action === 'Upvoted' ? <FaThumbsUp /> :
                 activity.action === 'Answered' ? <FaComments /> :
                 <FaQuestionCircle />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', color: '#2c3e50', marginBottom: '0.25rem' }}>
                  {activity.action} {activity.type}
                </div>
                <div style={{ color: '#495057', marginBottom: '0.25rem' }}>
                  {activity.target}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>
                  {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
