import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '4px' 
}) => {
  return (
    <div
      className="skeleton"
      style={{
        width,
        height,
        borderRadius,
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'loading 1.5s infinite',
      }}
    >
      <style>{`
        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export const QuestionCardSkeleton: React.FC = () => {
  return (
    <div className="card" style={{ marginBottom: '1rem' }}>
      <Skeleton width="70%" height="24px" />
      <div style={{ margin: '1rem 0' }}>
        <Skeleton width="100%" height="16px" />
        <div style={{ marginTop: '0.5rem' }}>
          <Skeleton width="80%" height="16px" />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <Skeleton width="60px" height="24px" borderRadius="12px" />
        <Skeleton width="80px" height="24px" borderRadius="12px" />
        <Skeleton width="70px" height="24px" borderRadius="12px" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Skeleton width="120px" height="16px" />
        <Skeleton width="150px" height="16px" />
      </div>
    </div>
  );
};

export const QuestionDetailSkeleton: React.FC = () => {
  return (
    <div className="container">
      <div style={{ maxWidth: '900px', margin: '2rem auto' }}>
        <div className="card">
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <Skeleton width="30px" height="20px" />
              <Skeleton width="40px" height="24px" />
              <Skeleton width="30px" height="20px" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: '1rem' }}>
                <Skeleton width="80%" height="32px" />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <Skeleton width="60px" height="24px" borderRadius="12px" />
                <Skeleton width="80px" height="24px" borderRadius="12px" />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <Skeleton width="100%" height="16px" />
                <div style={{ marginTop: '0.5rem' }}>
                  <Skeleton width="90%" height="16px" />
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                  <Skeleton width="70%" height="16px" />
                </div>
              </div>
              <Skeleton width="200px" height="16px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
