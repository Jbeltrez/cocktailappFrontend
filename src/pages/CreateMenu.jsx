// src/pages/CreateMenu.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateMenu = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const menu = { name };
    fetch('http://localhost:8080/api/menus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(menu),
    })
      .then((res) => {
        if (res.ok) {
          navigate('/dashboard');
        } else {
          throw new Error('Error creating menu');
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Create Menu</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Menu Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Create Menu</button>
      </form>
    </div>
  );
};

export default CreateMenu;
