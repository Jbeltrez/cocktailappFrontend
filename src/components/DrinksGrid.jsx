import { dummyDrinks } from '../utils/dummyDrinks';

const DrinksGrid = () => {
  return (
    <div className="drinks-container">
      <div className="drinks-grid">
        {dummyDrinks.map((drink) => (
          <div key={drink.id} className="drink-card">
            <img 
              src={drink.image} 
              alt={drink.name} 
              className="drink-image"
              onError={(e) => {
                console.log(`Failed to load image for ${drink.name}`);
                e.target.src = '/martini.jpg'; // Fallback image
              }}
            />
            <h3>{drink.name}</h3>
            <p>{drink.description}</p>
            <span className="category-tag">{drink.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrinksGrid; 