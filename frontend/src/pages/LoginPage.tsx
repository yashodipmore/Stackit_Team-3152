import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaEnvelope, FaLock, FaRocket, FaSpinner, FaEye, FaEyeSlash, FaSignInAlt } from '../components/Icons';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      toast.success('Logged in successfully!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('demo@stackit.com');
    setPassword('password');
    setLoading(true);
    try {
      await login('demo@stackit.com', 'password');
      toast.success('Demo login successful!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div style={{ maxWidth: '400px', margin: '3rem auto' }}>
        <div className="card" style={{ 
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)', 
          border: 'none',
          borderRadius: '12px'
        }}>
          <h1 style={{ 
            textAlign: 'center', 
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            color: '#333'
          }}>
            <FaSignInAlt style={{ color: '#f48024' }} />
            Login to StackIt
          </h1>

          {/* Demo Login Section */}
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            padding: '1.5rem', 
            borderRadius: '8px', 
            marginBottom: '2rem',
            textAlign: 'center',
            color: 'white'
          }}>
            <h3 style={{ 
              marginBottom: '0.5rem', 
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <FaRocket />
              Try Demo Login
            </h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'rgba(255,255,255,0.9)' }}>
              Click below to login with demo credentials and explore all features
            </p>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="btn"
              disabled={loading}
              style={{ 
                background: 'rgba(255,255,255,0.2)',
                border: '2px solid rgba(255,255,255,0.3)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                margin: '0 auto',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {loading ? <FaSpinner className="fa-spin" /> : <FaRocket />}
              {loading ? 'Logging in...' : 'Demo Login'}
            </button>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>
              <strong>Demo Credentials:</strong><br />
              Email: demo@stackit.com | Password: password
            </div>
          </div>

          <div style={{ 
            textAlign: 'center', 
            margin: '1rem 0', 
            color: '#666',
            position: 'relative'
          }}>
            <hr style={{ margin: '1rem 0' }} />
            <span style={{ 
              background: 'white', 
              padding: '0 1rem',
              position: 'absolute',
              top: '-10px',
              left: '50%',
              transform: 'translateX(-50%)'
            }}>
              OR
            </span>
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
                <FaEnvelope style={{ color: '#666' }} />
                Email
              </label>
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                style={{ 
                  paddingLeft: '12px',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#f48024'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px',
                marginBottom: '8px',
                fontWeight: '600'
              }}>
                <FaLock style={{ color: '#666' }} />
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  style={{ 
                    paddingLeft: '12px',
                    paddingRight: '45px',
                    border: '2px solid #e9ecef',
                    borderRadius: '8px',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#f48024'}
                  onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#666'
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ 
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px',
                fontSize: '16px',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #f48024 0%, #f48024 100%)',
                border: 'none',
                borderRadius: '8px',
                transition: 'all 0.2s'
              }}
              disabled={loading}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(244, 128, 36, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {loading ? <FaSpinner className="fa-spin" /> : <FaSignInAlt />}
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <p>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#007bff', textDecoration: 'none' }}>
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
