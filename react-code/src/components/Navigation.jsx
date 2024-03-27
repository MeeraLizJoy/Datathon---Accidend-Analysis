import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css'; // Assuming this is the path to your CSS file

const Navigation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="nav-container">
      <div className="desktop-menu">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/predictions" className="hover:underline">Accident Predictions</Link>
        <Link to="/analysis" className="hover:underline">Accident Analysis</Link>

        <div className="dropdown-container">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            Account
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/settings" className="dropdown-item">Settings</Link>
              <Link to="/profile" className="dropdown-item">Profile</Link>
              <Link to="/logout" className="dropdown-item">Logout</Link>
            </div>
          )}
        </div>
      </div>

      <div className="mobile-menu">
        <Link to="/">Home</Link>
        <Link to="/predictions">Accident Predictions</Link>
        <Link to="/analysis">Accident Analysis</Link>
      </div>
    </nav>
  );
};

export default Navigation;
