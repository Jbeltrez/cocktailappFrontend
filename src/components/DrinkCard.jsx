import React from 'react';
import styles from './DrinkCard.module.css';
import { CATEGORY_PRICES } from '../utils/constants';
import { getCategoryImage } from '../utils/categoryImages';

const DrinkCard = ({ drink }) => {
  // Add console.log to see what data we're receiving
  console.log('Drink data:', drink);

  // Safely access category name, with fallback
  const categoryName = drink?.category?.name || 'Uncategorized';

  // Get price based on category, default to 0 if category not found
  const price = CATEGORY_PRICES[drink.category.toLowerCase()] || 0;

  return (
    <div className={styles.drinkCard}>
      <div className={styles.imageContainer}>
        <img 
          src={getCategoryImage(drink.category)} 
          alt={drink.name}
          className={styles.image}
        />
        <div className={styles.overlay}>
          <h3 className={styles.title}>{drink.name}</h3>
          <p className={styles.category}>{categoryName}</p>
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.description}>{drink.description}</p>
        <p className={styles.price}>${price}</p>
      </div>
    </div>
  );
};

export const AddDrinkCard = ({ onClick }) => {
  return (
    <div className={styles.addCard} onClick={onClick}>
      <span className={styles.addIcon}>+</span>
      <span className={styles.addText}>Add Drink</span>
    </div>
  );
};

export default DrinkCard; 