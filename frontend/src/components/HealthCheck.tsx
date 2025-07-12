import React, { useState, useEffect } from 'react';
import api from '../api/api';

interface HealthStatus {
  frontend: boolean;
  api: boolean;
  mockData: boolean;
}

const HealthCheck: React.FC = () => {
  const [status, setStatus] = useState<HealthStatus>({
    frontend: true,
    api: false,
    mockData: false
  });

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      // Test API connection
      await api.get('/tags');
      setStatus(prev => ({ ...prev, api: true, mockData: true }));
    } catch (error) {
      console.log('API check failed, using mock data:', error);
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      background: 'white', 
      padding: '10px', 
      borderRadius: '8px', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      fontSize: '12px',
      zIndex: 1000
    }}>
      <div><strong>System Status:</strong></div>
      <div>Frontend: <span style={{ color: status.frontend ? 'green' : 'red' }}>
        {status.frontend ? '✓' : '✗'}
      </span></div>
      <div>Mock Data: <span style={{ color: status.mockData ? 'green' : 'red' }}>
        {status.mockData ? '✓' : '✗'}
      </span></div>
    </div>
  );
};

export default HealthCheck;
