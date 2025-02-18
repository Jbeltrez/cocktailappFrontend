import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { drinkService } from '../services/drinkService';

const Drinks = () => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const data = await drinkService.getAllDrinks();
        setDrinks(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load drinks');
        setLoading(false);
      }
    };

    fetchDrinks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <NavBar />
      <div className="page-container">
        <h1>All Drinks</h1>
        <button className="new-button">+ New Drink</button>
        <div className="drinks-grid">
          {drinks.map(drink => (
            <div key={drink.id} className="drink-card">
              <h3>{drink.name}</h3>
              <p>{drink.description}</p>
              <p className="category-tag">Category: {drink.category?.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Drinks; 