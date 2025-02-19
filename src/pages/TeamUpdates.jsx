import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { teamService } from '../services/teamService';
import { authService } from '../services/authService';

const TeamUpdates = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newContent, setNewContent] = useState('');
  const [showForm, setShowForm] = useState(false);
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

  const handleNewUpdate = async (e) => {
    e.preventDefault();
    try {
      const newUpdate = await teamService.createTeamUpdate({
        content: newContent,
        teamId: parseInt(teamId),
        timestamp: new Date().toISOString()
      });
      console.log('New update response:', newUpdate);
      setUpdates(prevUpdates => [newUpdate, ...prevUpdates]);
      setNewContent('');
      setShowForm(false);
    } catch (err) {
      console.error('Error creating update:', err);
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
        <button 
          className="new-button" 
          onClick={() => setShowForm(true)}
        >
          + New Update
        </button>
        
        {showForm && (
          <form onSubmit={handleNewUpdate}>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Enter your update..."
              required
            />
            <button type="submit">Post Update</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        )}

        <div className="updates-list">
          {updates.map(update => (
            <div key={update.id} className="update-card">
              <p className="update-content">{update.content}</p>
              <p className="update-date">
                {update.createdAt ? new Date(update.createdAt).toLocaleDateString() : 'Just now'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamUpdates;
