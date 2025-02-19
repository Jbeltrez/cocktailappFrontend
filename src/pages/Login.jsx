// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(username, password);
      console.log('Login successful:', response);
      setSuccess(true);
      // Store the token
      localStorage.setItem('token', response.token);
      // Wait 1 second before redirecting
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="auth-container">
      <img src="/boozy-logo.png" alt="Boozy Logo" className="auth-logo" />
      <div className="auth-card">
        <h2>Login to BOOZY</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Login successful! Redirecting...</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="auth-input"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
          </div>
          <button type="submit" className="auth-button">Login</button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link to="/register" className="auth-link">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
