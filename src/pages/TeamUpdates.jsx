import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { teamService } from '../services/teamService';
import { authService } from '../services/authService';

const TeamUpdates = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const teamId = authService.getTeamId();

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const data = await teamService.getTeamUpdates(teamId);
        setUpdates(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load team updates');
        setLoading(false);
      }
    };

    if (teamId) {
      fetchUpdates();
    } else {
      setError('No team associated with this account');
      setLoading(false);
    }
  }, [teamId]);

  const handleNewUpdate = async (content) => {
    try {
      const newUpdate = await teamService.createTeamUpdate({
        content,
        teamId: parseInt(teamId)
      });
      setUpdates([newUpdate, ...updates]);
    } catch (err) {
      setError('Failed to create update');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <NavBar />
      <div className="page-container">
        <h1>Team Updates</h1>
        <button className="new-button">+ New Update</button>
        <div className="updates-list">
          {updates.map(update => (
            <div key={update.id} className="update-card">
              <p className="update-content">{update.content}</p>
              <p className="update-date">
                {new Date(update.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamUpdates;
