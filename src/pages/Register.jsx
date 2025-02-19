// src/pages/Register.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { teamService } from '../services/teamService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [teamId, setTeamId] = useState('');
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        console.log('Fetching teams...'); // Debug log
        const teamsData = await teamService.getAllTeams();
        console.log('Teams received:', teamsData); // Debug log
        setTeams(teamsData);
      } catch (err) {
        console.error('Error in fetchTeams:', err); // Debug log
        setError('Failed to load teams');
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
    <div>
      <h2>Register for BOOZY</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Select Team</label>
          <select
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            required
          >
            <option value="">Select a team...</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

