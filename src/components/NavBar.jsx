import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-link">
          <img src="/boozy-logo.png" alt="Boozy Logo" className="nav-logo" />
        </Link>
        <div className="nav-links">
          <Link to="/menus" className="nav-item">
            <span className="menu-icon">☰</span> Menus
          </Link>
          <Link to="/drinks" className="nav-item">
            <span className="drink-icon">🍸</span> Drinks
          </Link>
          <Link to="/categories" className="nav-item">
            <span className="category-icon">⋮</span> Categories
          </Link>
        </div>
      </div>
      <div className="navbar-right">
        <button className="settings-button">⚙️</button>
      </div>
    </nav>
  );
};

export default NavBar; 