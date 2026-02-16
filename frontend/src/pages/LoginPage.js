import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithGoogle } from '../redux/authSlice';
import '../styles/LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/scanner');
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <span className="login-icon">♻️</span>
            <h1>CodeGreen</h1>
            <p>Optimize Your Code for Carbon Efficiency</p>
          </div>

          <div className="login-content">
            <p className="login-description">
              Join CodeGreen to analyze and optimize your code for reduced carbon footprint.
              Make your software more sustainable!
            </p>

            <button
              className="google-login-btn"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <span className="google-icon">🔐</span>
              {loading ? 'Signing in...' : 'Sign in with Google'}
            </button>

            {error && <div className="error-message">❌ {error}</div>}

            <div className="login-benefits">
              <h3>Why join CodeGreen?</h3>
              <ul>
                <li>✨ AI-powered code optimization with Gemini</li>
                <li>🌱 Reduce your code's carbon footprint</li>
                <li>📊 Track your optimization history</li>
                <li>🔗 Share results with your team</li>
                <li>💡 Learn best practices for sustainable coding</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
