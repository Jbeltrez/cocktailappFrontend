import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { teamService } from '../services/teamService';

const TeamUpdates = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        // Assuming team ID 1 for now - you might want to make this dynamic
        const data = await teamService.getTeamUpdates(1);
        setUpdates(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load team updates');
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

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
