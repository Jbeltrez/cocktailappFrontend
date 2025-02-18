// src/pages/Dashboard.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { categoryService } from '../services/categoryService';
import { drinkService } from '../services/drinkService';
import { menuService } from '../services/menuService';
import { authService } from '../services/authService';
import DashboardCard from '../components/DashboardCard';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const dashboardItems = [
    {
      title: 'Menus',
      description: 'View and manage all menus',
      link: '/menus',
      isActive: true
    },
    {
      title: 'All Drinks',
      description: 'Browse and edit drink recipes',
      link: '/drinks',
      isActive: true
    },
    {
      title: 'Team Updates',
      description: 'View and post team announcements',
      link: '/team-updates',
      isActive: true
    },
    {
      title: 'Sales Report',
      description: 'View sales analytics and trends',
      link: '/sales',
      isActive: false
    },
    {
      title: 'Payroll',
      description: 'Manage employee payments',
      link: '/payroll',
      isActive: false
    },
    {
      title: 'Team Schedule',
      description: 'View and manage staff schedules',
      link: '/schedule',
      isActive: false
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, drinksData, menusData] = await Promise.all([
          categoryService.getAllCategories(),
          drinkService.getAllDrinks(),
          menuService.getAllMenus()
        ]);

        setCategories(categoriesData);
        setDrinks(drinksData);
        setMenus(menusData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div className="dashboard-root">
      <NavBar />
      <div className="dashboard-container">
        <img src="/boozy-logo.png" alt="Boozy Logo" className="dashboard-logo" />
        <h1 className="dashboard-title">Welcome to your BOOZY dashboard</h1>
        <p className="dashboard-subtitle">Manage your menus and drinks with ease</p>

        <div className="dashboard-grid">
          {dashboardItems.map((item, index) => (
            <DashboardCard
              key={index}
              title={item.title}
              description={item.description}
              link={item.link}
              isActive={item.isActive}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
