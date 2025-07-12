import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import { Question, Answer } from '../types';
import AnswerCard from '../components/AnswerCard';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';
import { toast } from 'react-toastify';

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
        <div className="card">
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="vote-container">
              <button
                onClick={() => handleVote('up')}
                disabled={voting}
                className="vote-btn"
              >
                ⬆️
              </button>
              <span className="vote-count">{question.votes}</span>
              <button
                onClick={() => handleVote('down')}
                disabled={voting}
                className="vote-btn"
              >
                ⬇️
              </button>
            </div>

            <div style={{ flex: 1 }}>
              <h1 style={{ marginBottom: '1rem' }}>{question.title}</h1>
              
              <div className="tags mb-2">
                {question.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div
                dangerouslySetInnerHTML={{ __html: question.description }}
                style={{ lineHeight: '1.6', marginBottom: '1rem' }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#6c757d' }}>
                <div>
                  Asked by {question.author.username} • {getTimeAgo(question.createdAt)}
                </div>
                {isQuestionAuthor && (
                  <span style={{ fontSize: '0.8rem', background: '#e3f2fd', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                    Your question
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Answers */}
        <div style={{ marginTop: '2rem' }}>
          <h2>{answers.length} Answer{answers.length !== 1 ? 's' : ''}</h2>

          {/* Accepted Answer */}
          {acceptedAnswer && (
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ color: '#28a745', marginBottom: '1rem' }}>✓ Accepted Answer</h3>
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
              {acceptedAnswer && <h3 style={{ marginBottom: '1rem' }}>Other Answers</h3>}
              {otherAnswers.map((answer) => (
                <AnswerCard
                  key={answer.id}
                  answer={answer}
                  isQuestionAuthor={isQuestionAuthor}
                  onAnswerUpdate={fetchQuestionAndAnswers}
                />
              ))}
            </div>
          )}
        </div>

        {/* Answer Form */}
        {user ? (
          <div className="card" style={{ marginTop: '2rem' }}>
            <h3>Your Answer</h3>
            <form onSubmit={handleSubmitAnswer}>
              <div className="form-group">
                <MDEditor
                  value={newAnswer}
                  onChange={(val) => setNewAnswer(val || '')}
                  preview="edit"
                  height={200}
                  data-color-mode="light"
                  style={{
                    backgroundColor: 'white'
                  }}
                />
              </div>
              
              <button
                type="submit"
                className="btn btn-primary"
                disabled={answering}
              >
                {answering ? 'Posting...' : 'Post Answer'}
              </button>
            </form>
          </div>
        ) : (
          <div className="card text-center" style={{ marginTop: '2rem' }}>
            <p>Please <a href="/login">login</a> to post an answer.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionDetailPage;
