import React, { useState } from 'react';
import { FaThumbsUp, FaThumbsDown, FaChartLine } from './Icons';

interface VotingSystemProps {
  votes: number;
  onVote: (type: 'up' | 'down') => Promise<void>;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  showAnalytics?: boolean;
  userVote?: 'up' | 'down' | null;
}

const VotingSystem: React.FC<VotingSystemProps> = ({
  votes,
  onVote,
  disabled = false,
  size = 'medium',
  showAnalytics = false,
  userVote = null
}) => {
  const [voting, setVoting] = useState(false);
  const [showVoteBreakdown, setShowVoteBreakdown] = useState(false);

  const handleVote = async (type: 'up' | 'down') => {
    if (disabled || voting) return;
    
    setVoting(true);
    try {
      await onVote(type);
    } finally {
      setVoting(false);
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          buttonSize: '32px',
          fontSize: '0.9rem',
          countFont: '1rem'
        };
      case 'large':
        return {
          buttonSize: '48px',
          fontSize: '1.2rem',
          countFont: '1.4rem'
        };
      default:
        return {
          buttonSize: '40px',
          fontSize: '1rem',
          countFont: '1.2rem'
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <div className="voting-system" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
      minWidth: size === 'large' ? '80px' : '60px'
    }}>
      {/* Upvote Button */}
      <button
        onClick={() => handleVote('up')}
        disabled={disabled || voting}
        style={{
          background: userVote === 'up' 
            ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' 
            : 'none',
          border: `2px solid ${userVote === 'up' ? '#28a745' : '#28a745'}`,
          borderRadius: '50%',
          width: sizeStyles.buttonSize,
          height: sizeStyles.buttonSize,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          color: userVote === 'up' ? 'white' : '#28a745',
          fontSize: sizeStyles.fontSize,
          opacity: disabled ? 0.5 : 1,
          transform: voting ? 'scale(0.9)' : 'scale(1)',
          boxShadow: userVote === 'up' 
            ? '0 4px 15px rgba(40, 167, 69, 0.3)' 
            : '0 2px 8px rgba(40, 167, 69, 0.1)'
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(40, 167, 69, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = userVote === 'up' 
              ? '0 4px 15px rgba(40, 167, 69, 0.3)' 
              : '0 2px 8px rgba(40, 167, 69, 0.1)';
          }
        }}
      >
        <FaThumbsUp />
      </button>

      {/* Vote Count */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.25rem'
      }}>
        <span style={{
          fontSize: sizeStyles.countFont,
          fontWeight: 'bold',
          color: votes > 0 ? '#28a745' : votes < 0 ? '#dc3545' : '#495057',
          padding: '0.25rem 0.5rem',
          background: votes > 0 
            ? 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)' 
            : votes < 0 
              ? 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)' 
              : '#f8f9fa',
          borderRadius: '8px',
          minWidth: sizeStyles.buttonSize,
          textAlign: 'center',
          border: `1px solid ${votes > 0 ? '#28a745' : votes < 0 ? '#dc3545' : '#e9ecef'}`,
          transition: 'all 0.3s ease'
        }}>
          {votes > 0 ? `+${votes}` : votes}
        </span>

        {/* Analytics Button */}
        {showAnalytics && (
          <button
            onClick={() => setShowVoteBreakdown(!showVoteBreakdown)}
            style={{
              background: 'none',
              border: 'none',
              color: '#667eea',
              cursor: 'pointer',
              fontSize: '0.8rem',
              padding: '0.25rem',
              borderRadius: '4px',
              transition: 'all 0.3s ease'
            }}
            title="View vote breakdown"
          >
            <FaChartLine />
          </button>
        )}
      </div>

      {/* Downvote Button */}
      <button
        onClick={() => handleVote('down')}
        disabled={disabled || voting}
        style={{
          background: userVote === 'down' 
            ? 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)' 
            : 'none',
          border: `2px solid ${userVote === 'down' ? '#dc3545' : '#dc3545'}`,
          borderRadius: '50%',
          width: sizeStyles.buttonSize,
          height: sizeStyles.buttonSize,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          color: userVote === 'down' ? 'white' : '#dc3545',
          fontSize: sizeStyles.fontSize,
          opacity: disabled ? 0.5 : 1,
          transform: voting ? 'scale(0.9)' : 'scale(1)',
          boxShadow: userVote === 'down' 
            ? '0 4px 15px rgba(220, 53, 69, 0.3)' 
            : '0 2px 8px rgba(220, 53, 69, 0.1)'
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(220, 53, 69, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = userVote === 'down' 
              ? '0 4px 15px rgba(220, 53, 69, 0.3)' 
              : '0 2px 8px rgba(220, 53, 69, 0.1)';
          }
        }}
      >
        <FaThumbsDown />
      </button>

      {/* Vote Breakdown Modal */}
      {showVoteBreakdown && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'white',
          border: '1px solid #e9ecef',
          borderRadius: '8px',
          padding: '1rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          minWidth: '200px',
          marginTop: '0.5rem'
        }}>
          <div style={{ marginBottom: '0.5rem', fontWeight: '600', color: '#2c3e50' }}>
            Vote Breakdown
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
            <span style={{ color: '#28a745' }}>Upvotes:</span>
            <span>{Math.max(0, Math.ceil((votes + Math.abs(votes)) / 2))}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
            <span style={{ color: '#dc3545' }}>Downvotes:</span>
            <span>{Math.max(0, Math.ceil((Math.abs(votes) - votes) / 2))}</span>
          </div>
          <div style={{ 
            borderTop: '1px solid #e9ecef', 
            paddingTop: '0.5rem', 
            marginTop: '0.5rem',
            display: 'flex', 
            justifyContent: 'space-between',
            fontWeight: '600'
          }}>
            <span>Net Score:</span>
            <span style={{ color: votes > 0 ? '#28a745' : votes < 0 ? '#dc3545' : '#495057' }}>
              {votes > 0 ? `+${votes}` : votes}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingSystem;
