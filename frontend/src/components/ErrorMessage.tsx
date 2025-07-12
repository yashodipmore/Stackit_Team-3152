import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="error" style={{ textAlign: 'center', padding: '2rem' }}>
      <h3>Something went wrong</h3>
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
