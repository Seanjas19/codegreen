import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : true; // Default to dark mode
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => navigate('/')}>
          <span className="logo-icon">♻️</span>
          CodeGreen
        </div>

        <ul className="nav-menu">
          <li className="nav-item">
            <button className="nav-link" onClick={() => navigate('/')}>
              Home
            </button>
          </li>

          {isAuthenticated && (
            <>
              <li className="nav-item">
                <button className="nav-link" onClick={() => navigate('/scanner')}>
                  Scanner
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => navigate('/dashboard')}>
                  Dashboard
                </button>
              </li>
            </>
          )}

          <li className="nav-item">
            {isAuthenticated ? (
              <div className="nav-user">
                <span className="user-name">{user?.email}</span>
                <button className="nav-button settings-btn" onClick={() => navigate('/settings')}>
                  ⚙️ Settings
                </button>
                <button className="nav-button logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <button className="nav-button" onClick={() => navigate('/login')}>
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
