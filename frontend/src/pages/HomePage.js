import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>♻️ CodeGreen</h1>
          <p className="hero-subtitle">Optimize Your Code for Carbon Efficiency</p>
          <p className="hero-description">
            Use AI to analyze and optimize your code, reducing energy consumption and carbon footprint.
          </p>

          {!isAuthenticated ? (
            <button className="hero-cta" onClick={() => navigate('/login')}>
              Get Started with Google Sign-In
            </button>
          ) : (
            <button className="hero-cta" onClick={() => navigate('/scanner')}>
              Start Scanning Code
            </button>
          )}
        </div>
      </div>

      <div className="features-section">
        <h2>Why CodeGreen?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>Gemini AI Powered</h3>
            <p>Leverage Google's advanced Gemini API to intelligently optimize your code</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌱</div>
            <h3>Reduce Carbon Footprint</h3>
            <p>Get specific recommendations to make your software more sustainable</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Progress</h3>
            <p>Monitor your optimizations over time with detailed analytics</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔗</div>
            <h3>Share Results</h3>
            <p>Generate shareable links and collaborate with your team</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3>Best Practices</h3>
            <p>Learn sustainable coding patterns and optimize for efficiency</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Multi-Language</h3>
            <p>Support for JavaScript, Python, Java, C++, C#, Go, Rust, TypeScript and more</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Make Your Code More Sustainable?</h2>
        <p>Join thousands of developers optimizing their code for a greener planet</p>
        {!isAuthenticated && (
          <button className="cta-button" onClick={() => navigate('/login')}>
            Start Free with Google
          </button>
        )}
      </div>
    </div>
  );
}

export default HomePage;
