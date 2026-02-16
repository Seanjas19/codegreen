import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserHistory } from '../redux/analysisSlice';
import ResultCard from '../components/ResultCard';
import ScoreTag from '../components/ScoreTag';
import '../styles/DashboardPage.css';

function DashboardPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { history, loading, error } = useSelector((state) => state.analysis);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    dispatch(fetchUserHistory(10));
  }, [dispatch]);

  const handleViewDetails = (analysisId) => {
    navigate(`/results/${analysisId}`);
  };

  const calculateAverageScore = () => {
    if (history.length === 0) return 0;
    const total = history.reduce((sum, item) => sum + item.energyScore, 0);
    return (total / history.length).toFixed(1);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Energy Warning Banner - Only in Light Mode */}
        {!isDarkMode && (
          <div className="energy-info-banner">
            <span className="banner-icon">💡</span>
            <div className="banner-content">
              <p className="banner-text">
                <strong>Tip:</strong> Dark mode uses 25-50% less energy on your device. 
                Switch to dark mode in <button className="link-btn" onClick={() => navigate('/settings')}>Settings</button> to reduce your carbon footprint.
              </p>
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className="dashboard-header">
          <div className="user-welcome">
            <h1>Welcome back, {user?.email?.split('@')[0]}! 👋</h1>
            <p>Track your carbon-efficient code optimizations</p>
          </div>

          <button className="new-analysis-btn" onClick={() => navigate('/scanner')}>
            + New Analysis
          </button>
        </div>

        {/* Statistics Section */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-number">{history.length}</div>
            <div className="stat-label">Total Analyses</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{calculateAverageScore()}</div>
            <div className="stat-label">Average Score</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {Math.round(
                history.reduce((sum, item) => sum + item.estimatedReduction, 0) / (history.length || 1)
              )}%
            </div>
            <div className="stat-label">Avg Carbon Reduction</div>
          </div>
        </div>

        {/* Analysis History Section */}
        <div className="dashboard-history">
          <h2>📊 Analysis History</h2>

          {error && <div className="error-message">❌ {error}</div>}

          {loading ? (
            <div className="loading">Loading your analyses...</div>
          ) : history.length > 0 ? (
            <div className="result-grid">
              {history.map((analysis) => (
                <ResultCard
                  key={analysis.id}
                  id={analysis.id}
                  energyScore={analysis.energyScore}
                  improvements={analysis.improvements}
                  estimatedReduction={analysis.estimatedReduction}
                  timestamp={analysis.timestamp}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No analyses yet. Start optimizing your code!</p>
              <button className="cta-btn" onClick={() => navigate('/scanner')}>
                Go to Scanner →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
