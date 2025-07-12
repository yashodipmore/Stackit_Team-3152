import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container">
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: '#6c757d' }}>404</h1>
        <h2 style={{ marginBottom: '1rem' }}>Page Not Found</h2>
        <p style={{ marginBottom: '2rem', color: '#6c757d' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
          <Link to="/ask" className="btn btn-outline">
            Ask a Question
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
