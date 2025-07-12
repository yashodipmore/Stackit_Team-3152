import React, { useState, useRef, useEffect } from 'react';

interface TagSelectorProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  availableTags: string[];
  maxTags?: number;
  placeholder?: string;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  selectedTags,
  onTagsChange,
  availableTags,
  maxTags = 5,
  placeholder = "Add tags (press Enter or comma to add)"
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = availableTags.filter(tag => 
        tag.toLowerCase().includes(inputValue.toLowerCase()) &&
        !selectedTags.includes(tag)
      );
      setFilteredTags(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
      setFilteredTags([]);
    }
  }, [inputValue, availableTags, selectedTags]);

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag && !selectedTags.includes(trimmedTag) && selectedTags.length < maxTags) {
      onTagsChange([...selectedTags, trimmedTag]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && inputValue === '' && selectedTags.length > 0) {
      removeTag(selectedTags[selectedTags.length - 1]);
    }
  };

  const handleSuggestionClick = (tag: string) => {
    addTag(tag);
    inputRef.current?.focus();
  };

  return (
    <div className="tag-selector">
      <div className="tags mb-1">
        {selectedTags.map((tag) => (
          <span key={tag} className="tag" style={{ background: '#007bff', color: 'white' }}>
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              style={{ 
                marginLeft: '0.5rem', 
                background: 'none', 
                border: 'none', 
                color: 'white', 
                cursor: 'pointer',
                fontSize: '1.2rem',
                lineHeight: '1'
              }}
              aria-label={`Remove ${tag} tag`}
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <div style={{ position: 'relative' }}>
        <input
          ref={inputRef}
          type="text"
          className="form-input"
          placeholder={selectedTags.length >= maxTags ? `Maximum ${maxTags} tags allowed` : placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={selectedTags.length >= maxTags}
          onFocus={() => inputValue && setShowSuggestions(filteredTags.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />

        {showSuggestions && (
          <div className="tag-suggestions">
            {filteredTags.slice(0, 8).map((tag) => (
              <button
                key={tag}
                type="button"
                className="tag-suggestion"
                onClick={() => handleSuggestionClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ fontSize: '0.8rem', color: '#6c757d', marginTop: '0.5rem' }}>
        {selectedTags.length}/{maxTags} tags selected
      </div>

      <style>{`
        .tag-selector {
          position: relative;
        }
        
        .tag-suggestions {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #ddd;
          border-top: none;
          border-radius: 0 0 4px 4px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          max-height: 200px;
          overflow-y: auto;
          z-index: 1000;
        }
        
        .tag-suggestion {
          display: block;
          width: 100%;
          padding: 0.5rem 1rem;
          border: none;
          background: white;
          text-align: left;
          cursor: pointer;
          border-bottom: 1px solid #f8f9fa;
        }
        
        .tag-suggestion:hover {
          background: #f8f9fa;
        }
        
        .tag-suggestion:last-child {
          border-bottom: none;
        }
      `}</style>
    </div>
  );
};

export default TagSelector;
