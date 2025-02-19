import { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import DrinkModal from '../components/DrinkModal';
import NavBar from '../components/NavBar';
import MenuList from '../components/MenuList';
import DrinkCard, { AddDrinkCard } from '../components/DrinkCard';
import { menuService } from '../services/menuService';

const Menus = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrinkModalOpen, setIsDrinkModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  const handleDrinkCreated = async (drinkData) => {
    if (selectedMenu) {
      try {
        console.log('Selected Menu:', selectedMenu);
        console.log('Menu ID:', selectedMenu.id);
        console.log('Drink Data being sent:', drinkData);
        console.log('URL being called:', `/menus/${selectedMenu.id}/drinks`);
        
        const updatedMenu = await menuService.addDrinkToMenu(selectedMenu.id, drinkData);
        setSelectedMenu(updatedMenu);
        setMenus(menus.map(menu => 
          menu.id === selectedMenu.id ? updatedMenu : menu
        ));
      } catch (error) {
        console.error('Error details:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          config: error.config // This will show the URL and data that was sent
        });
      }
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredDrinks = selectedMenu?.drinks?.filter(drink => 
    selectedCategory === 'All' || drink.category === selectedCategory
  ) || [];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Transform your menus data to match the MenuList component's expected format
  const formattedMenus = menus.map(menu => ({
    id: menu.id,
    title: menu.name,
    description: menu.description || 'Menu description',
    drinks: menu.drinks || [],
    categories: [...new Set(menu.drinks?.map(drink => drink.category) || [])],
    onView: () => handleViewMenu(menu),
    onEdit: () => {/* Add your edit handler */}
  }));

  const categories = ['All', 'Shaken', 'Stirred', 'Non-alcoholic', 'Cocktail', 'Beer', 'Wine'];

  return (
    <div>
      <NavBar />
      {selectedMenu ? (
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h1>{selectedMenu.name}</h1>
              <p>{selectedMenu.drinks?.length || 0} Drinks</p>
            </div>
            <button onClick={() => setSelectedMenu(null)} style={{ padding: '0.5rem 1rem' }}>
              Back to Menus
            </button>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', overflowX: 'auto', padding: '0.5rem 0' }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  border: 'none',
                  background: category === selectedCategory ? '#000' : '#f0f0f0',
                  color: category === selectedCategory ? '#fff' : '#000',
                  cursor: 'pointer'
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            <AddDrinkCard onClick={() => setIsDrinkModalOpen(true)} />
            {filteredDrinks.map(drink => (
              <DrinkCard key={drink.id} drink={drink} />
            ))}
          </div>
        </div>
      ) : (
        <MenuList 
          menus={formattedMenus}
          onNewMenu={() => {/* Add your new menu handler */}}
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