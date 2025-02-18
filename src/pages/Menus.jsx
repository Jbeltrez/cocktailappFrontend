import { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import DrinkModal from '../components/DrinkModal';
import NavBar from '../components/NavBar';
import { menuService } from '../services/menuService';

const Menus = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrinkModalOpen, setIsDrinkModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const data = await menuService.getAllMenus();
        setMenus(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load menus');
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  const handleViewMenu = (menu) => {
    setSelectedMenu(menu);
    setIsModalOpen(true);
  };

  const handleDrinkCreated = (newDrink) => {
    // Update the selected menu's drinks list
    if (selectedMenu) {
      setSelectedMenu({
        ...selectedMenu,
        drinks: [...(selectedMenu.drinks || []), newDrink]
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <NavBar />
      <div className="page-container">
        <h1>Your Menus</h1>
        <button className="new-button">+ New Menu</button>
        <div className="menus-list">
          {menus.map(menu => (
            <div key={menu.id} className="menu-item">
              <h3>{menu.name}</h3>
              {/* Add more menu details here */}
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          menu={selectedMenu}
          onAddDrink={() => setIsDrinkModalOpen(true)}
        />
      )}

      {isDrinkModalOpen && (
        <DrinkModal
          isOpen={isDrinkModalOpen}
          onClose={() => setIsDrinkModalOpen(false)}
          menuId={selectedMenu?.id}
          onDrinkCreated={handleDrinkCreated}
        />
      )}
    </div>
  );
};

export default Menus; 