import React from 'react';
import { Link } from 'react-router-dom';
import { Question } from '../types';
import { 
  FaThumbsUp, 
  FaComments, 
  FaUser, 
  FaClock
} from './Icons';

interface QuestionCardProps {
  question: Question;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
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

  const stripHtml = (html: string) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  };

  const getDescriptionSnippet = (description: string, maxLength: number = 150) => {
    const text = stripHtml(description);
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <Link to={`/question/${question.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="card question-card">
        <h3 className="question-title">{question.title}</h3>
        
        <p style={{ color: '#6c757d', marginBottom: '1rem' }}>
          {getDescriptionSnippet(question.description)}
        </p>

        <div className="tags">
          {question.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="question-meta" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginTop: '1rem',
          padding: '0.75rem',
          background: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <div className="question-stats" style={{ 
            display: 'flex', 
            gap: '1rem',
            alignItems: 'center'
          }}>
            <span style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              background: question.votes > 0 
                ? 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)' 
                : question.votes < 0 
                  ? 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)' 
                  : 'white',
              padding: '0.5rem 0.75rem',
              borderRadius: '20px',
              border: `1px solid ${question.votes > 0 ? '#28a745' : question.votes < 0 ? '#dc3545' : '#e9ecef'}`,
              fontSize: '0.9rem',
              fontWeight: '600'
            }}>
              <FaThumbsUp style={{ color: question.votes > 0 ? '#28a745' : '#6c757d' }} />
              <span style={{ color: question.votes > 0 ? '#155724' : question.votes < 0 ? '#721c24' : '#495057' }}>
                {question.votes > 0 ? `+${question.votes}` : question.votes} votes
              </span>
            </span>
            <span style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              background: question.answersCount > 0 
                ? 'linear-gradient(135deg, #cce5ff 0%, #b3d9ff 100%)' 
                : 'white',
              padding: '0.5rem 0.75rem',
              borderRadius: '20px',
              border: `1px solid ${question.answersCount > 0 ? '#007bff' : '#e9ecef'}`,
              fontSize: '0.9rem',
              fontWeight: '600'
            }}>
              <FaComments style={{ color: question.answersCount > 0 ? '#007bff' : '#6c757d' }} />
              <span style={{ color: question.answersCount > 0 ? '#004085' : '#495057' }}>
                {question.answersCount} answer{question.answersCount !== 1 ? 's' : ''}
              </span>
            </span>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            fontSize: '0.85rem', 
            color: '#6c757d',
            background: 'white',
            padding: '0.5rem 0.75rem',
            borderRadius: '20px',
            border: '1px solid #e9ecef'
          }}>
            <img 
              src={question.author.avatar} 
              alt={question.author.username}
              style={{ 
                width: '20px', 
                height: '20px', 
                borderRadius: '50%',
                objectFit: 'cover'
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <FaUser style={{ fontSize: '12px', display: question.author.avatar ? 'none' : 'inline', color: '#667eea' }} />
            <span style={{ fontWeight: '600', color: '#2c3e50' }}>{question.author.username}</span>
            <span>•</span>
            <FaClock style={{ fontSize: '12px', color: '#28a745' }} />
            <span>{getTimeAgo(question.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuestionCard;
