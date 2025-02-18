import { useState, useEffect } from 'react';

const TeamUpdates = () => {
  const [updates, setUpdates] = useState([]);
  const [newUpdate, setNewUpdate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/team-updates', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setUpdates(data);
    } catch (error) {
      console.error('Error fetching updates:', error);
      setError('Failed to load team updates');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newUpdate.trim()) return;

    try {
      const response = await fetch('http://localhost:8080/api/team-updates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ content: newUpdate })
      });

      if (response.ok) {
        setNewUpdate('');
        fetchUpdates(); // Refresh the updates list
      } else {
        throw new Error('Failed to create update');
      }
    } catch (error) {
      console.error('Error creating update:', error);
      setError('Failed to post update');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Team Updates</h1>
      
      {/* Create New Update Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={newUpdate}
            onChange={(e) => setNewUpdate(e.target.value)}
            placeholder="Share an update with your team..."
            className="flex-1 p-3 border rounded-md"
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
          >
            Post Update
          </button>
        </div>
      </form>

      {error && (
        <div className="text-red-600 mb-4">{error}</div>
      )}

      {/* Updates List */}
      <div className="space-y-4">
        {updates.map((update) => (
          <div 
            key={update.id} 
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-semibold">{update.username}</span>
              <span className="text-sm text-gray-500">
                {new Date(update.timestamp).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-700">{update.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamUpdates;
