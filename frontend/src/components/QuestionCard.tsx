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

        <div className="question-meta">
          <div className="question-stats">
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <FaThumbsUp style={{ color: '#28a745' }} />
              {question.votes}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <FaComments style={{ color: '#007bff' }} />
              {question.answersCount} answers
            </span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#6c757d' }}>
            <img 
              src={question.author.avatar} 
              alt={question.author.username}
              style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%',
                objectFit: 'cover'
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <FaUser style={{ fontSize: '12px', display: question.author.avatar ? 'none' : 'inline' }} />
            <span>{question.author.username}</span>
            <span>•</span>
            <FaClock style={{ fontSize: '12px' }} />
            <span>{getTimeAgo(question.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuestionCard;
