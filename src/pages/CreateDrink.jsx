// src/pages/CreateDrink.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateDrink = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [menus, setMenus] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
    
    fetch('http://localhost:8080/api/menus/team', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => setMenus(data))
      .catch((error) => console.error('Error fetching menus:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const drink = {
      name,
      description,
      categoryId: selectedCategoryId,
      menuId: selectedMenuId,
    };
    fetch('http://localhost:8080/api/drinks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(drink),
    })
      .then((res) => {
        if (res.ok) {
          navigate('/dashboard');
        } else {
          throw new Error('Error creating drink');
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Create Drink</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Drink Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Category:</label>
          <select 
            value={selectedCategoryId} 
            onChange={(e) => setSelectedCategoryId(e.target.value)} 
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Menu:</label>
          <select 
            value={selectedMenuId} 
            onChange={(e) => setSelectedMenuId(e.target.value)} 
            required
          >
            <option value="">Select Menu</option>
            {menus.map((menu) => (
              <option key={menu.id} value={menu.id}>
                {menu.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Drink</button>
      </form>
    </div>
  );
};

export default CreateDrink;
