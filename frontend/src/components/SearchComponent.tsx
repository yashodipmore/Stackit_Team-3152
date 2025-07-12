import React, { useState, useRef, useEffect } from 'react';
import { debounce } from '../utils/helpers';
import { 
  FaSearch, 
  FaFilter, 
  FaTimes
} from './Icons';

interface SearchComponentProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filter: string;
  onFilterChange: (filter: string) => void;
  suggestions?: string[];
  placeholder?: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange,
  suggestions = [],
  placeholder = "Search questions..."
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search to avoid too many API calls
  const debouncedSearch = debounce((query: string) => {
    onSearchChange(query);
  }, 300);

  useEffect(() => {
    if (searchQuery.trim() && suggestions.length > 0) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery, suggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSearchChange(suggestion);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const clearSearch = () => {
    onSearchChange('');
    inputRef.current?.focus();
  };

  return (
    <div className="search-component">
      <div className="search-container">
        <div style={{ position: 'relative', flex: 1 }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <FaSearch style={{ 
              position: 'absolute', 
              left: '12px', 
              color: '#999', 
              fontSize: '16px',
              zIndex: 1
            }} />
            <input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              className="search-input"
              defaultValue={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => searchQuery && setShowSuggestions(filteredSuggestions.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              style={{ paddingLeft: '40px' }}
            />
          </div>
          
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={clearSearch}
              aria-label="Clear search"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                color: '#999'
              }}
            >
              <FaTimes />
            </button>
          )}

          {showSuggestions && (
            <div className="search-suggestions">
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  className="search-suggestion"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  🔍 {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <FaFilter style={{ 
            position: 'absolute', 
            left: '12px', 
            color: '#999', 
            fontSize: '14px',
            zIndex: 1
          }} />
          <select
            className="filter-select"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            style={{ paddingLeft: '35px' }}
          >
            <option value="newest">🕐 Newest</option>
            <option value="unanswered">❓ Unanswered</option>
            <option value="popular">🔥 Popular</option>
            <option value="oldest">📅 Oldest</option>
          </select>
        </div>
      </div>

      <style>{`
        .search-component {
          position: relative;
        }
        
        .search-container {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        
        .search-input {
          padding: 0.5rem 2rem 0.5rem 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          min-width: 300px;
          width: 100%;
        }
        
        .search-clear-btn {
          position: absolute;
          right: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          color: #6c757d;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .search-clear-btn:hover {
          color: #333;
        }
        
        .search-suggestions {
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
        
        .search-suggestion {
          display: block;
          width: 100%;
          padding: 0.5rem 1rem;
          border: none;
          background: white;
          text-align: left;
          cursor: pointer;
          border-bottom: 1px solid #f8f9fa;
        }
        
        .search-suggestion:hover {
          background: #f8f9fa;
        }
        
        .search-suggestion:last-child {
          border-bottom: none;
        }
        
        @media (max-width: 768px) {
          .search-container {
            flex-direction: column;
            width: 100%;
          }
          
          .search-input {
            min-width: auto;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchComponent;
