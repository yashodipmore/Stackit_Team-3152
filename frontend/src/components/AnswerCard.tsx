import React, { useState } from 'react';
import { Answer } from '../types';
import { useAuth } from '../context/AuthContext';
import RichTextEditor from './RichTextEditor';
import VotingSystem from './VotingSystem';
import api from '../api/api';
import { toast } from 'react-toastify';
import { 
  FaUser, 
  FaClock, 
  FaEdit, 
  FaComments,
  FaCheck,
  FaTimes,
  FaPaperPlane
} from './Icons';

interface AnswerCardProps {
  answer: Answer;
  isQuestionAuthor: boolean;
  onAnswerUpdate: () => void;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ answer, isQuestionAuthor, onAnswerUpdate }) => {
  const { user } = useAuth();
  const [voting, setVoting] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(answer.content);
  const [saving, setSaving] = useState(false);
  const [showComments, setShowComments] = useState(false);

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

  const handleSaveEdit = async () => {
    if (!editedContent.trim()) {
      toast.error('Answer content cannot be empty');
      return;
    }

    setSaving(true);
    try {
      await api.patch(`/answers/${answer.id}`, {
        content: editedContent,
      });
      onAnswerUpdate();
      setEditing(false);
      toast.success('Answer updated successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update answer');
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedContent(answer.content);
    setEditing(false);
  };

  return (
    <div className={`card answer-card ${answer.isAccepted ? 'accepted' : ''}`} style={{
      border: answer.isAccepted ? '2px solid #28a745' : '1px solid #e9ecef',
      borderRadius: '12px',
      background: answer.isAccepted ? 'linear-gradient(135deg, #f8fff8 0%, #e8f5e8 100%)' : 'white',
      boxShadow: answer.isAccepted ? '0 4px 20px rgba(40, 167, 69, 0.15)' : '0 2px 10px rgba(0, 0, 0, 0.1)',
      marginBottom: '1rem',
      transition: 'all 0.3s ease'
    }}>
      {/* Header */}
      <div className="answer-header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        padding: '1rem 1rem 0 1rem'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem',
          flex: 1
        }}>
          <FaUser style={{ color: '#667eea' }} />
          <span style={{ fontWeight: '600', color: '#2c3e50' }}>
            {answer.author.username}
          </span>
          <span style={{ color: '#6c757d' }}>•</span>
          <FaClock style={{ color: '#28a745', fontSize: '0.9rem' }} />
          <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>
            {getTimeAgo(answer.createdAt)}
          </span>
          {answer.isAccepted && (
            <span className="accepted-badge" style={{
              background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              <FaCheck />
              Accepted
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {/* Edit/Delete buttons for answer author */}
          {user?.id === answer.author.id && (
            <>
              <button
                onClick={() => setEditing(!editing)}
                className="btn btn-outline btn-sm"
                style={{
                  border: '1px solid #667eea',
                  color: '#667eea',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '6px',
                  background: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.8rem'
                }}
              >
                <FaEdit />
                {editing ? 'Cancel' : 'Edit'}
              </button>
            </>
          )}

          {/* Accept button for question author */}
          {isQuestionAuthor && !answer.isAccepted && (
            <button
              onClick={handleAccept}
              disabled={accepting}
              className="btn btn-outline btn-sm"
              style={{
                border: '2px solid #28a745',
                color: '#28a745',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                background: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              <FaCheck />
              {accepting ? 'Accepting...' : 'Accept Answer'}
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ display: 'flex', gap: '1rem', padding: '0 1rem 1rem 1rem' }}>
        {/* Enhanced Voting System */}
        <VotingSystem
          votes={answer.votes}
          onVote={handleVote}
          disabled={!user || voting}
          size="medium"
          showAnalytics={false}
        />

        {/* Answer Content */}
        <div style={{ flex: 1 }}>
          {editing ? (
            <div>
              <RichTextEditor
                value={editedContent}
                onChange={setEditedContent}
                placeholder="Edit your answer..."
              />
              <div style={{ 
                display: 'flex', 
                gap: '0.5rem', 
                marginTop: '1rem',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={handleCancelEdit}
                  className="btn btn-outline btn-sm"
                  style={{
                    border: '1px solid #6c757d',
                    color: '#6c757d',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    background: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <FaTimes />
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={saving}
                  className="btn btn-primary btn-sm"
                  style={{
                    background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                    border: 'none',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontWeight: '600'
                  }}
                >
                  <FaPaperPlane />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div
                dangerouslySetInnerHTML={{ __html: answer.content }}
                style={{ 
                  lineHeight: '1.6',
                  color: '#495057',
                  fontSize: '1.05rem',
                  marginBottom: '1rem'
                }}
              />
              
              {/* Comments Toggle */}
              <div style={{ 
                borderTop: '1px solid #e9ecef',
                paddingTop: '0.75rem'
              }}>
                <button
                  onClick={() => setShowComments(!showComments)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#667eea',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    padding: '0.25rem 0'
                  }}
                >
                  <FaComments />
                  {showComments ? 'Hide comments' : 'Show comments (0)'}
                </button>
                
                {showComments && (
                  <div style={{
                    marginTop: '0.75rem',
                    padding: '0.75rem',
                    background: '#f8f9fa',
                    borderRadius: '6px',
                    border: '1px solid #e9ecef'
                  }}>
                    <p style={{ 
                      color: '#6c757d', 
                      fontSize: '0.9rem',
                      margin: 0,
                      fontStyle: 'italic'
                    }}>
                      Comments feature coming soon...
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
