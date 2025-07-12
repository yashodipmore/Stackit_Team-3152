import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword, validateUsername } from '../utils/helpers';
import { toast } from 'react-toastify';

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !username.trim() || !password.trim() || !confirmPassword.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    const usernameValidation = validateUsername(username);
    if (!usernameValidation.isValid) {
      toast.error(usernameValidation.message);
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      toast.error(passwordValidation.message);
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await register(email, password, username);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div style={{ maxWidth: '400px', margin: '3rem auto' }}>
        <div className="card">
          <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Join StackIt</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-input"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                minLength={3}
              />
              <div style={{ fontSize: '0.8rem', color: '#6c757d', marginTop: '0.25rem' }}>
                At least 3 characters
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                minLength={6}
              />
              <div style={{ fontSize: '0.8rem', color: '#6c757d', marginTop: '0.25rem' }}>
                At least 6 characters
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <p>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
