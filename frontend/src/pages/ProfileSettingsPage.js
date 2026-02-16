import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/ProfileSettingsPage.css';

function ProfileSettingsPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleThemeChange = (e) => {
    const newTheme = e.target.checked;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', JSON.stringify(newTheme));
    setSaveMessage('Theme preference saved!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="profile-settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <h1>⚙️ Settings</h1>
          <button className="back-btn" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </button>
        </div>

        {saveMessage && <div className="success-message">{saveMessage}</div>}

        <div className="settings-content">
          {/* Profile Section */}
          <div className="settings-card">
            <div className="card-header">
              <h2>👤 Profile</h2>
            </div>
            <div className="card-body">
              <div className="profile-item">
                <label>Email</label>
                <p className="profile-value">{user?.email || 'Not available'}</p>
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="settings-card">
            <div className="card-header">
              <h2>🎨 Theme Settings</h2>
              <p className="card-description">Adjust your display preferences</p>
            </div>
            <div className="card-body">
              <div className="theme-option">
                <div className="theme-label">
                  <label htmlFor="dark-mode-toggle">Dark Mode</label>
                  <p className="theme-hint">
                    Reduces energy consumption on OLED screens and minimizes carbon footprint
                  </p>
                </div>
                <div className="toggle-switch">
                  <input
                    id="dark-mode-toggle"
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={handleThemeChange}
                  />
                  <span className="slider"></span>
                </div>
              </div>

              {!isDarkMode && (
                <div className="energy-warning">
                  <span className="warning-icon">⚠️</span>
                  <div className="warning-content">
                    <p className="warning-title">Light Theme Energy Usage</p>
                    <p className="warning-text">
                      Light theme uses approximately 25-50% more energy on smartphones and displays.
                      This increases carbon emissions and consumes more battery. Consider using dark mode
                      to support our sustainability goals.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* About Section */}
          <div className="settings-card">
            <div className="card-header">
              <h2>ℹ️ About</h2>
            </div>
            <div className="card-body">
              <div className="about-item">
                <label>Application</label>
                <p className="about-value">CodeGreen - Carbon Efficient Code Optimizer</p>
              </div>
              <div className="about-item">
                <label>Version</label>
                <p className="about-value">1.0.0</p>
              </div>
              <div className="about-item">
                <label>Mission</label>
                <p className="about-value">
                  Optimize code for carbon efficiency and sustainable software development
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettingsPage;
