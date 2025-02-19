// src/pages/Register.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { teamService } from '../services/teamService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [teamId, setTeamId] = useState('');
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        setError('');
        const teamsData = await teamService.getAllTeams();
        console.log('Teams received:', teamsData);
        setTeams(teamsData);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError('Failed to load teams. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teamId) {
      setError('Please select a team');
      return;
    }

    try {
      await authService.register(username, password, parseInt(teamId));
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Username might be taken.');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="auth-container">
      <img src="/boozy-logo.png" alt="Boozy Logo" className="auth-logo" />
      <div className="auth-card">
        <h2>Register for BOOZY</h2>
        {error && <div className="error-message">{error}</div>}
        {isLoading ? (
          <div className="loading-message">Loading teams...</div>
        ) : (
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
            <div className="form-group">
              <label>Select Team</label>
              <select
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                required
                className="auth-input"
              >
                <option value="">Select a team...</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="auth-button">Register</button>
          </form>
        )}
        <p className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

