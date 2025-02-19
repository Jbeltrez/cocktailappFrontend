import React from 'react';
import styles from './MenuList.module.css';

const MenuList = ({ menus, onNewMenu }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Your Menus</h1>
        <button className={styles.newMenuButton} onClick={onNewMenu}>
          <span>+</span> New Menu
        </button>
      </div>
      
      <div className={styles.menuGrid}>
        {menus.map((menu) => (
          <div key={menu.id} className={styles.menuCard}>
            <h2>{menu.title}</h2>
            <p className={styles.description}>{menu.description}</p>
            
            <div className={styles.stats}>
              <p>{menu.drinks?.length || 0} Drinks</p>
              <p>{menu.categories?.length || 0} Categories</p>
            </div>
            
            <div className={styles.actions}>
              <button className={styles.editButton} onClick={menu.onEdit}>
                Edit
              </button>
              <button className={styles.viewButton} onClick={menu.onView}>
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList; 