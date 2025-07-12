import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TagSelector from '../components/TagSelector';
import RichTextEditor from '../components/RichTextEditor';
import { validateQuestionTitle, validateQuestionDescription } from '../utils/helpers';
import api from '../api/api';
import { toast } from 'react-toastify';
import { FaQuestionCircle, FaLightbulb, FaPaperPlane, FaSpinner, FaAlignLeft } from '../components/Icons';

const AskQuestionPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Fetch available tags
    const fetchTags = async () => {
      try {
        const response = await api.get('/tags');
        setAvailableTags(response.data);
      } catch (error) {
        console.error('Failed to fetch tags:', error);
      }
    };

    fetchTags();
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const titleValidation = validateQuestionTitle(title);
    if (!titleValidation.isValid) {
      toast.error(titleValidation.message);
      return;
    }

    const descriptionValidation = validateQuestionDescription(description);
    if (!descriptionValidation.isValid) {
      toast.error(descriptionValidation.message);
      return;
    }

    if (tags.length === 0) {
      toast.error('At least one tag is required');
      return;
    }

    setSubmitting(true);
    try {
      const response = await api.post('/questions', {
        title: title.trim(),
        description,
        tags,
      });

      toast.success('Question posted successfully!');
      navigate(`/question/${response.data.id}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to post question');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container">
      <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
        <div className="card" style={{ 
          padding: '2rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)', 
          border: 'none',
          borderRadius: '12px'
        }}>
          <h1 style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            marginBottom: '1.5rem',
            color: '#333'
          }}>
            <FaQuestionCircle style={{ color: '#f48024' }} />
            Ask a Question
          </h1>
          
          {/* Tips section */}
          <div style={{ 
            background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '2rem',
            border: 'none'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <FaLightbulb style={{ color: '#e17055' }} />
              <strong style={{ color: '#2d3436' }}>Tips for a great question:</strong>
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#2d3436' }}>
              <li>Be specific and descriptive in your title</li>
              <li>Provide context and details in the description</li>
              <li>Add relevant tags to help others find your question</li>
            </ul>
          </div>
        
          <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              marginBottom: '8px',
              fontWeight: '600'
            }}>
              <FaAlignLeft style={{ color: '#666' }} />
              Title *
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Be specific and imagine you're asking a question to another person"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
              required
              style={{ 
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#f48024'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
            <div style={{ fontSize: '0.8rem', color: '#6c757d', marginTop: '0.25rem' }}>
              {title.length}/200 characters
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              marginBottom: '0.5rem'
            }}>
              <FaAlignLeft style={{ color: '#666' }} />
              Description *
            </label>
            <div style={{ border: '2px solid #e9ecef', borderRadius: '8px', overflow: 'hidden' }}>
              <RichTextEditor
                value={description}
                onChange={setDescription}
                placeholder="Include all the information someone would need to answer your question. Use the toolbar above for rich formatting!"
                height={350}
              />
            </div>
            <div style={{ fontSize: '0.8rem', color: '#6c757d', marginTop: '0.5rem' }}>
              Use the toolbar for rich formatting: bold, italic, lists, links, images, emojis, and text alignment.
              <span style={{ float: 'right' }}>
                {description ? description.length : 0} characters
              </span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Tags * (max 5)</label>
            <TagSelector
              selectedTags={tags}
              onTagsChange={setTags}
              availableTags={availableTags}
              maxTags={5}
              placeholder="Add tags (press Enter or comma to add)"
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #f48024 0%, #f48024 100%)',
                border: 'none',
                borderRadius: '8px',
                transition: 'all 0.2s'
              }}
            >
              {submitting ? <FaSpinner className="fa-spin" /> : <FaPaperPlane />}
              {submitting ? 'Posting...' : 'Post Question'}
            </button>
            
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/')}
              style={{ 
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                borderRadius: '8px'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default AskQuestionPage;
