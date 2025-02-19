// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { categoryService } from '../services/categoryService';
import { drinkService } from '../services/drinkService';
import { menuService } from '../services/menuService';
import { authService } from '../services/authService';
import DashboardCard from '../components/DashboardCard';
import Modal from '../components/Modal';
import TeamSchedule from '../components/TeamSchedule';
import Paystubs from '../components/Paystubs';
import SalesReport from '../components/SalesReport';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [paystubsModalOpen, setPaystubsModalOpen] = useState(false);
  const [salesModalOpen, setSalesModalOpen] = useState(false);

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
    console.log('Dashboard component mounted'); // Debug log
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

  console.log('Dashboard rendering'); // Debug log

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div className="dashboard-root">
      {/* <NavBar /> */}
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="logo-container">
            <img src="/boozy-logo.png" alt="Boozy Logo" className="dashboard-logo" />
          </div>
          <h1>Welcome to your BOOZY dashboard</h1>
          <p>Manage your menus and drinks with ease</p>
          
          <div className="dashboard-grid">
            <Link to="/menus" className="dashboard-card">
              <h2>Menus</h2>
              <p>View and manage all menus</p>
            </Link>

            <Link to="/drinks" className="dashboard-card">
              <h2>All Drinks</h2>
              <p>Browse and edit drink recipes</p>
            </Link>

            <Link to="/team-updates" className="dashboard-card">
              <h2>Team Updates</h2>
              <p>View and post team announcements</p>
            </Link>

            {/* Sales Report Card */}
            <div className="dashboard-card" onClick={() => setSalesModalOpen(true)}>
              <h2>Sales Report</h2>
              <p>View sales analytics and trends</p>
            </div>

            {/* Paystubs Card */}
            <div className="dashboard-card" onClick={() => setPaystubsModalOpen(true)}>
              <h2>Paystubs</h2>
              <p>View payment history</p>
            </div>

            {/* Team Schedule Card */}
            <div className="dashboard-card" onClick={() => setScheduleModalOpen(true)}>
              <h2>Team Schedule</h2>
              <p>View and manage staff schedules</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal 
        isOpen={scheduleModalOpen} 
        onClose={() => setScheduleModalOpen(false)}
        title="Team Schedule"
      >
        <TeamSchedule />
      </Modal>

      <Modal 
        isOpen={paystubsModalOpen} 
        onClose={() => setPaystubsModalOpen(false)}
        title="Paystubs"
      >
        <Paystubs />
      </Modal>

      <Modal 
        isOpen={salesModalOpen} 
        onClose={() => setSalesModalOpen(false)}
        title="Sales Report"
      >
        <SalesReport />
      </Modal>
    </div>
  );
};

export default Dashboard;
