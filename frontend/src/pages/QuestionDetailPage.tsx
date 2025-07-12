import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Question, Answer } from '../types';
import AnswerCard from '../components/AnswerCard';
import RichTextEditor from '../components/RichTextEditor';
import VotingSystem from '../components/VotingSystem';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';
import { toast } from 'react-toastify';
import { 
  FaUser, 
  FaClock, 
  FaQuestionCircle,
  FaComments,
  FaPaperPlane,
  FaTags,
  FaChartLine
} from '../components/Icons';

const QuestionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [answering, setAnswering] = useState(false);
  const [newAnswer, setNewAnswer] = useState('');
  const [voting, setVoting] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }

    fetchQuestionAndAnswers();
  }, [id, navigate]);

  const fetchQuestionAndAnswers = async () => {
    setLoading(true);
    try {
      const [questionResponse, answersResponse] = await Promise.all([
        api.get(`/questions/${id}`),
        api.get(`/questions/${id}/answers`)
      ]);

      setQuestion(questionResponse.data);
      setAnswers(answersResponse.data);
    } catch (error: any) {
      if (error.response?.status === 404) {
        toast.error('Question not found');
        navigate('/');
      } else {
        toast.error('Failed to load question');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (type: 'up' | 'down') => {
    if (!user) {
      toast.error('Please login to vote');
      return;
    }

    setVoting(true);
    try {
      await api.post(`/questions/${id}/vote`, { type });
      await fetchQuestionAndAnswers();
      toast.success(`Vote ${type === 'up' ? 'up' : 'down'} recorded!`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to vote');
    } finally {
      setVoting(false);
    }
  };

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to answer');
      return;
    }

    if (!newAnswer.trim()) {
      toast.error('Answer content is required');
      return;
    }

    setAnswering(true);
    try {
      await api.post(`/questions/${id}/answers`, {
        content: newAnswer,
      });

      setNewAnswer('');
      await fetchQuestionAndAnswers();
      toast.success('Answer posted successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to post answer');
    } finally {
      setAnswering(false);
    }
  };

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

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading question...</div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="container">
        <div className="error">Question not found</div>
      </div>
    );
  }

  const isQuestionAuthor = user?.id === question.author.id;
  const acceptedAnswer = answers.find(answer => answer.isAccepted);
  const otherAnswers = answers.filter(answer => !answer.isAccepted);

  return (
    <div className="container">
      <div style={{ maxWidth: '900px', margin: '2rem auto' }}>
        {/* Question */}
        <div className="card" style={{ 
          border: '1px solid #e3f2fd',
          boxShadow: '0 4px 20px rgba(102, 126, 234, 0.1)',
          borderRadius: '12px'
        }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {/* Enhanced Voting System */}
            <VotingSystem
              votes={question.votes}
              onVote={handleVote}
              disabled={!user || voting}
              size="large"
              showAnalytics={true}
            />

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <FaQuestionCircle style={{ color: '#667eea', fontSize: '1.2rem' }} />
                <h1 style={{ margin: 0, color: '#2c3e50' }}>{question.title}</h1>
              </div>
              
              <div className="tags mb-2" style={{ marginBottom: '1rem' }}>
                <FaTags style={{ color: '#667eea', marginRight: '0.5rem' }} />
                {question.tags.map((tag, index) => (
                  <span key={index} className="tag" style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    marginRight: '0.5rem',
                    display: 'inline-block',
                    marginBottom: '0.5rem'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div
                dangerouslySetInnerHTML={{ __html: question.description }}
                style={{ 
                  lineHeight: '1.6', 
                  marginBottom: '1.5rem',
                  color: '#495057',
                  fontSize: '1.05rem'
                }}
              />

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                color: '#6c757d',
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaUser style={{ color: '#667eea' }} />
                  <span>Asked by <strong>{question.author.username}</strong></span>
                  <span>•</span>
                  <FaClock style={{ color: '#28a745' }} />
                  <span>{getTimeAgo(question.createdAt)}</span>
                  <span>•</span>
                  <FaChartLine style={{ color: '#ffc107' }} />
                  <span>{question.votes} votes</span>
                </div>
                {isQuestionAuthor && (
                  <span style={{ 
                    fontSize: '0.8rem', 
                    background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)', 
                    color: '#1976d2',
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '20px',
                    fontWeight: '600',
                    border: '1px solid #90caf9'
                  }}>
                    Your question
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Answers */}
        <div style={{ marginTop: '2rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            marginBottom: '1.5rem',
            padding: '1rem',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            borderRadius: '12px',
            border: '1px solid #dee2e6'
          }}>
            <FaComments style={{ color: '#667eea', fontSize: '1.5rem' }} />
            <h2 style={{ margin: 0, color: '#2c3e50' }}>
              {answers.length} Answer{answers.length !== 1 ? 's' : ''}
            </h2>
            {answers.length > 0 && (
              <span style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '600',
                marginLeft: '0.5rem'
              }}>
                {answers.filter(a => a.isAccepted).length > 0 ? 'Solved' : 'Open'}
              </span>
            )}
          </div>

          {/* Accepted Answer */}
          {acceptedAnswer && (
            <div style={{ marginTop: '1rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
                padding: '0.75rem 1rem',
                background: 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)',
                borderRadius: '8px',
                border: '1px solid #28a745'
              }}>
                <span style={{ fontSize: '1.5rem' }}>✓</span>
                <h3 style={{ color: '#155724', margin: 0, fontWeight: '600' }}>Accepted Answer</h3>
              </div>
              <AnswerCard
                answer={acceptedAnswer}
                isQuestionAuthor={isQuestionAuthor}
                onAnswerUpdate={fetchQuestionAndAnswers}
              />
            </div>
          )}

          {/* Other Answers */}
          {otherAnswers.length > 0 && (
            <div style={{ marginTop: acceptedAnswer ? '2rem' : '1rem' }}>
              {acceptedAnswer && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  padding: '0.75rem 1rem',
                  background: 'linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)',
                  borderRadius: '8px',
                  border: '1px solid #ffc107'
                }}>
                  <FaComments style={{ color: '#856404' }} />
                  <h3 style={{ color: '#856404', margin: 0, fontWeight: '600' }}>Other Answers</h3>
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {otherAnswers.map((answer) => (
                  <AnswerCard
                    key={answer.id}
                    answer={answer}
                    isQuestionAuthor={isQuestionAuthor}
                    onAnswerUpdate={fetchQuestionAndAnswers}
                  />
                ))}
              </div>
            </div>
          )}

          {/* No Answers Message */}
          {answers.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '3rem 2rem',
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              borderRadius: '12px',
              border: '2px dashed #dee2e6',
              marginTop: '1rem'
            }}>
              <FaQuestionCircle style={{ fontSize: '3rem', color: '#6c757d', marginBottom: '1rem' }} />
              <h3 style={{ color: '#495057', marginBottom: '0.5rem' }}>No answers yet</h3>
              <p style={{ color: '#6c757d', fontSize: '1.1rem', margin: 0 }}>
                Be the first to help by posting an answer!
              </p>
            </div>
          )}
        </div>

        {/* Answer Form */}
        {user ? (
          <div className="card" style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <FaComments style={{ color: '#667eea' }} />
              <h3 style={{ margin: 0 }}>Your Answer</h3>
            </div>
            <form onSubmit={handleSubmitAnswer}>
              <div className="form-group">
                <RichTextEditor
                  value={newAnswer}
                  onChange={setNewAnswer}
                  placeholder="Write your answer here..."
                />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <div style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                  💡 Tip: Use the toolbar above to format your answer with bold, italic, lists, and more!
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={answering}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                  }}
                >
                  <FaPaperPlane />
                  {answering ? 'Posting...' : 'Post Answer'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="card text-center" style={{ 
            marginTop: '2rem',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            border: '2px dashed #dee2e6'
          }}>
            <FaUser style={{ fontSize: '2rem', color: '#6c757d', marginBottom: '1rem' }} />
            <p style={{ fontSize: '1.1rem', margin: '0 0 1rem 0' }}>
              Please <a href="/login" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>login</a> to post an answer.
            </p>
            <p style={{ color: '#6c757d', fontSize: '0.9rem', margin: 0 }}>
              Join our community and help others by sharing your knowledge!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionDetailPage;
