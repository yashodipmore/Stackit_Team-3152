import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Question } from '../types';
import QuestionCard from '../components/QuestionCard';
import Pagination from '../components/Pagination';
import { QuestionCardSkeleton } from '../components/Skeleton';
import { usePagination } from '../hooks/usePagination';
import api from '../api/api';
import { 
  FaPlus, 
  FaQuestion,
  FaTags,
  FaChartLine
} from '../components/Icons';

interface HomePageProps {
  searchQuery: string;
  filter: string;
}

const HomePage: React.FC<HomePageProps> = ({ searchQuery, filter }) => {
  const [popularTags, setPopularTags] = useState<string[]>([]);

  const fetchQuestions = async (page: number, limit: number) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sort: filter,
    });

    if (searchQuery) {
      params.append('search', searchQuery);
    }

    const response = await api.get(`/questions?${params}`);
    return {
      data: response.data.questions,
      total: response.data.total,
    };
  };

  const {
    currentPage,
    totalPages,
    items: questions,
    loading,
    error,
    goToPage,
    refetch,
  } = usePagination<Question>(fetchQuestions, { itemsPerPage: 10 });

  useEffect(() => {
    refetch();
  }, [searchQuery, filter]);

  useEffect(() => {
    // Fetch popular tags
    const fetchTags = async () => {
      try {
        const response = await api.get('/tags');
        setPopularTags(response.data.slice(0, 10));
      } catch (error) {
        console.error('Failed to fetch tags:', error);
      }
    };
    fetchTags();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '2rem 0' }}>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FaQuestion style={{ color: '#f48024' }} />
            All Questions
          </h1>
          <Link to="/ask" className="btn btn-primary" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            fontWeight: '600'
          }}>
            <FaPlus />
            Ask Question
          </Link>
        </div>
        
        <div style={{ marginBottom: '2rem' }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <QuestionCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '2rem 0' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {searchQuery ? (
            <>
              <FaChartLine style={{ color: '#f48024' }} />
              Search results for "{searchQuery}"
            </>
          ) : (
            <>
              <FaQuestion style={{ color: '#f48024' }} />
              All Questions
            </>
          )}
        </h1>
        <Link to="/ask" className="btn btn-primary" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 20px',
          fontWeight: '600'
        }}>
          <FaPlus />
          Ask Question
        </Link>
      </div>

      {/* Popular Tags Section */}
      {!searchQuery && popularTags.length > 0 && (
        <div className="card" style={{ 
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none'
        }}>
          <h3 style={{ 
            marginBottom: '1rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            color: 'white'
          }}>
            <FaTags />
            Popular Tags
          </h3>
          <div className="tags">
            {popularTags.map((tag) => (
              <span key={tag} className="tag" style={{ 
                cursor: 'pointer',
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {questions.length === 0 ? (
        <div className="card text-center">
          <h2>No questions found</h2>
          <p>Be the first to ask a question!</p>
          <Link to="/ask" className="btn btn-primary">
            Ask a Question
          </Link>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '2rem' }}>
            {questions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
