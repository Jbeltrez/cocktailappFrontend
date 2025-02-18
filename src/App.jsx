// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Menus from './pages/Menus';
import Drinks from './pages/Drinks';
import TeamUpdates from './pages/TeamUpdates';
import CreateDrink from './pages/CreateDrink';
import CreateMenu from './pages/CreateMenu';
// import CreateTeam from './pages/CreateTeam';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/menus" 
          element={
            <ProtectedRoute>
              <Menus />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/drinks" 
          element={
            <ProtectedRoute>
              <Drinks />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/team-updates" 
          element={
            <ProtectedRoute>
              <TeamUpdates />
            </ProtectedRoute>
          } 
        />
        <Route path="/create-drink" element={<CreateDrink />} />
        <Route path="/create-menu" element={<CreateMenu />} />
        
      </Routes>
    </Router>
  );
}

export default App;
