import React, { useState } from 'react';
import styles from './DrinkModal.module.css';

const DrinkModal = ({ isOpen, onClose, menuId, onDrinkCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    categoryId: 1, // We need to set a default category ID or fetch categories
    description: '',
    menuId: menuId // Add the menuId to the form data
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting drink with data:', {
        name: formData.name,
        description: formData.description,
        categoryId: formData.categoryId,
        menuId: menuId
      });
      
      await onDrinkCreated({
        name: formData.name,
        description: formData.description,
        categoryId: formData.categoryId,
        menuId: menuId
      });
      
      onClose();
    } catch (error) {
      console.error('Failed to create drink:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Add New Drink</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter drink name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Category</label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({...formData, categoryId: parseInt(e.target.value)})}
              required
            >
              <option value="1">Shaken</option>
              <option value="2">Stirred</option>
              <option value="3">Non-alcoholic</option>
              <option value="4">Cocktail</option>
              <option value="5">Beer</option>
              <option value="6">Wine</option>
            </select>
          </div>

          {/* Category Image Preview */}
          <div className={styles.formGroup}>
            <label>Category Image</label>
            <img 
              src="/path/to/default/cocktail/image.jpg" 
              alt="Category preview"
              className={styles.categoryImage}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              placeholder="Enter drink description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.addButton}>
              Add Drink
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DrinkModal; 