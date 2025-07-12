import React, { useState } from 'react';
import { Answer } from '../types';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';
import { toast } from 'react-toastify';

interface AnswerCardProps {
  answer: Answer;
  isQuestionAuthor: boolean;
  onAnswerUpdate: () => void;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ answer, isQuestionAuthor, onAnswerUpdate }) => {
  const { user } = useAuth();
  const [voting, setVoting] = useState(false);
  const [accepting, setAccepting] = useState(false);

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  const handleVote = async (type: 'up' | 'down') => {
    if (!user) {
      toast.error('Please login to vote');
      return;
    }

    setVoting(true);
    try {
      await api.post(`/answers/${answer.id}/vote`, { type });
      onAnswerUpdate();
      toast.success(`Vote ${type === 'up' ? 'up' : 'down'} recorded!`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to vote');
    } finally {
      setVoting(false);
    }
  };

  const handleAccept = async () => {
    if (!user || !isQuestionAuthor) {
      toast.error('Only question author can accept answers');
      return;
    }

    setAccepting(true);
    try {
      await api.post(`/answers/${answer.id}/accept`);
      onAnswerUpdate();
      toast.success('Answer accepted!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to accept answer');
    } finally {
      setAccepting(false);
    }
  };

  return (
    <div className={`card answer-card ${answer.isAccepted ? 'accepted' : ''}`}>
      <div className="answer-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>by {answer.author.username}</span>
          <span>•</span>
          <span style={{ color: '#6c757d' }}>{getTimeAgo(answer.createdAt)}</span>
          {answer.isAccepted && (
            <span className="accepted-badge">✓ Accepted</span>
          )}
        </div>

        {isQuestionAuthor && !answer.isAccepted && (
          <button
            onClick={handleAccept}
            disabled={accepting}
            className="btn btn-outline btn-sm"
          >
            {accepting ? 'Accepting...' : 'Accept Answer'}
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <div className="vote-container">
          <button
            onClick={() => handleVote('up')}
            disabled={voting}
            className="vote-btn"
          >
            ⬆️
          </button>
          <span className="vote-count">{answer.votes}</span>
          <button
            onClick={() => handleVote('down')}
            disabled={voting}
            className="vote-btn"
          >
            ⬇️
          </button>
        </div>

        <div style={{ flex: 1 }}>
          <div
            dangerouslySetInnerHTML={{ __html: answer.content }}
            style={{ lineHeight: '1.6' }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
