import React, { useState, useEffect } from 'react';
import { FaChartLine, FaThumbsUp, FaThumbsDown, FaUsers, FaCalendarAlt, FaTrophy } from './Icons';

interface VotingAnalyticsProps {
  questionId?: string;
  userId?: string;
  showUserStats?: boolean;
}

interface VotingStats {
  totalVotes: number;
  upvotes: number;
  downvotes: number;
  votingTrend: Array<{ date: string; votes: number }>;
  topVotedContent: Array<{ id: string; title: string; votes: number; type: 'question' | 'answer' }>;
  userVotingActivity: {
    questionsVoted: number;
    answersVoted: number;
    upvotesGiven: number;
    downvotesGiven: number;
  };
}

const VotingAnalytics: React.FC<VotingAnalyticsProps> = ({ 
  questionId, 
  userId, 
  showUserStats = false 
}) => {
  const [stats, setStats] = useState<VotingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'trends' | 'leaderboard'>('overview');

  useEffect(() => {
    // Mock data - in real app, this would fetch from API
    const mockStats: VotingStats = {
      totalVotes: 1247,
      upvotes: 892,
      downvotes: 355,
      votingTrend: [
        { date: '2025-07-06', votes: 45 },
        { date: '2025-07-07', votes: 67 },
        { date: '2025-07-08', votes: 89 },
        { date: '2025-07-09', votes: 123 },
        { date: '2025-07-10', votes: 156 },
        { date: '2025-07-11', votes: 189 },
        { date: '2025-07-12', votes: 234 }
      ],
      topVotedContent: [
        { id: '1', title: 'How to use React hooks effectively?', votes: 45, type: 'question' },
        { id: '2', title: 'TypeScript vs JavaScript for large projects', votes: 32, type: 'question' },
        { id: '3', title: 'Best practices for React hooks...', votes: 28, type: 'answer' }
      ],
      userVotingActivity: {
        questionsVoted: 23,
        answersVoted: 45,
        upvotesGiven: 62,
        downvotesGiven: 6
      }
    };

    setTimeout(() => {
      setStats(mockStats);
      setLoading(false);
    }, 500);
  }, [questionId, userId]);

  if (loading) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #e9ecef'
      }}>
        <div style={{ color: '#6c757d' }}>Loading analytics...</div>
      </div>
    );
  }

  if (!stats) return null;

  const voteRatio = stats.totalVotes > 0 ? (stats.upvotes / stats.totalVotes) * 100 : 0;

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      border: '1px solid #e9ecef',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <FaChartLine style={{ fontSize: '1.5rem' }} />
        <h3 style={{ margin: 0, fontWeight: '600' }}>
          {showUserStats ? 'Your Voting Analytics' : 'Community Voting Analytics'}
        </h3>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #e9ecef',
        background: '#f8f9fa'
      }}>
        {['overview', 'trends', 'leaderboard'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            style={{
              flex: 1,
              padding: '1rem',
              border: 'none',
              background: activeTab === tab ? 'white' : 'transparent',
              color: activeTab === tab ? '#667eea' : '#6c757d',
              fontWeight: activeTab === tab ? '600' : '400',
              cursor: 'pointer',
              textTransform: 'capitalize',
              borderBottom: activeTab === tab ? '2px solid #667eea' : 'none',
              transition: 'all 0.3s ease'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem' }}>
        {activeTab === 'overview' && (
          <div>
            {/* Key Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #28a745',
                textAlign: 'center'
              }}>
                <FaThumbsUp style={{ fontSize: '2rem', color: '#28a745', marginBottom: '0.5rem' }} />
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#155724' }}>
                  {stats.upvotes}
                </div>
                <div style={{ color: '#155724', fontSize: '0.9rem' }}>Upvotes</div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #dc3545',
                textAlign: 'center'
              }}>
                <FaThumbsDown style={{ fontSize: '2rem', color: '#dc3545', marginBottom: '0.5rem' }} />
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#721c24' }}>
                  {stats.downvotes}
                </div>
                <div style={{ color: '#721c24', fontSize: '0.9rem' }}>Downvotes</div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #cce5ff 0%, #b3d9ff 100%)',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #007bff',
                textAlign: 'center'
              }}>
                <FaUsers style={{ fontSize: '2rem', color: '#007bff', marginBottom: '0.5rem' }} />
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#004085' }}>
                  {voteRatio.toFixed(1)}%
                </div>
                <div style={{ color: '#004085', fontSize: '0.9rem' }}>Positive Ratio</div>
              </div>
            </div>

            {/* Vote Ratio Bar */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Vote Distribution</h4>
              <div style={{
                width: '100%',
                height: '20px',
                background: '#e9ecef',
                borderRadius: '10px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div style={{
                  width: `${voteRatio}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #28a745 0%, #20c997 100%)',
                  transition: 'width 0.3s ease'
                }} />
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: voteRatio > 50 ? 'white' : '#2c3e50'
                }}>
                  {voteRatio.toFixed(1)}% positive
                </div>
              </div>
            </div>

            {/* User Activity (if showUserStats) */}
            {showUserStats && (
              <div>
                <h4 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Your Voting Activity</h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '1rem'
                }}>
                  <div style={{
                    background: '#f8f9fa',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
                      {stats.userVotingActivity.questionsVoted}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>Questions Voted</div>
                  </div>
                  <div style={{
                    background: '#f8f9fa',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
                      {stats.userVotingActivity.answersVoted}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>Answers Voted</div>
                  </div>
                  <div style={{
                    background: '#f8f9fa',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#28a745' }}>
                      {stats.userVotingActivity.upvotesGiven}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>Upvotes Given</div>
                  </div>
                  <div style={{
                    background: '#f8f9fa',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#dc3545' }}>
                      {stats.userVotingActivity.downvotesGiven}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>Downvotes Given</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'trends' && (
          <div>
            <h4 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Voting Trends (Last 7 Days)</h4>
            <div style={{
              display: 'flex',
              alignItems: 'end',
              gap: '0.5rem',
              height: '200px',
              padding: '1rem',
              background: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              {stats.votingTrend.map((day, index) => {
                const maxVotes = Math.max(...stats.votingTrend.map(d => d.votes));
                const height = (day.votes / maxVotes) * 160;
                return (
                  <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '100%',
                      height: `${height}px`,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '4px 4px 0 0',
                      marginBottom: '0.5rem',
                      display: 'flex',
                      alignItems: 'end',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      paddingBottom: '0.25rem'
                    }}>
                      {day.votes}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#6c757d' }}>
                      {new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div>
            <h4 style={{ marginBottom: '1rem', color: '#2c3e50', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaTrophy style={{ color: '#ffc107' }} />
              Top Voted Content
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {stats.topVotedContent.map((item, index) => (
                <div key={item.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: index === 0 ? 'linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)' : '#f8f9fa',
                  borderRadius: '8px',
                  border: `1px solid ${index === 0 ? '#ffc107' : '#e9ecef'}`
                }}>
                  <div style={{
                    background: index === 0 ? '#ffc107' : index === 1 ? '#6c757d' : '#dc3545',
                    color: 'white',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                  }}>
                    {index + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', color: '#2c3e50', marginBottom: '0.25rem' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6c757d', textTransform: 'capitalize' }}>
                      {item.type}
                    </div>
                  </div>
                  <div style={{
                    background: 'linear-gradient(135d, #28a745 0%, #20c997 100%)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}>
                    +{item.votes}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VotingAnalytics;
