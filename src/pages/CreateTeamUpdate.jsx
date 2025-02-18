// src/pages/CreateTeamUpdate.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTeamUpdate = () => {
  const [content, setContent] = useState('');
  const [teamId, setTeamId] = useState(null);
  const navigate = useNavigate();

  // On component mount, load the logged‑in user’s team id from localStorage (or from an auth context)
  useEffect(() => {
    // Here we assume that after login, the app stores a "user" object in localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.teamId) {
      setTeamId(userData.teamId);
    } else {
      console.error("No team id found for the user");
      // Optionally, redirect the user to login or show an error message.
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!teamId) {
      alert("Team information is not available");
      return;
    }

    const update = { content, teamId };
    fetch('http://localhost:8080/api/team-updates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update),
    })
      .then((res) => {
        if (res.ok) {
          navigate('/dashboard');
        } else {
          throw new Error('Error creating team update');
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Create Team Update</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Update Content:</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Post Update</button>
      </form>
    </div>
  );
};

export default CreateTeamUpdate;
