import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: '16px',
    medium: '24px',
    large: '32px',
  };

  const spinnerStyle: React.CSSProperties = {
    width: sizeClasses[size],
    height: sizeClasses[size],
    border: '2px solid #f3f3f3',
    borderTop: '2px solid #007bff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto',
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={spinnerStyle}></div>
      {text && <p style={{ marginTop: '1rem', color: '#6c757d' }}>{text}</p>}
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
