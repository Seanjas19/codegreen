import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalysisById } from '../redux/analysisSlice';
import CodeEditor from '../components/CodeEditor';
import ScoreTag from '../components/ScoreTag';
import '../styles/ResultsPage.css';

function ResultsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentAnalysis, loading, error } = useSelector((state) => state.analysis);

  useEffect(() => {
    if (id) {
      dispatch(fetchAnalysisById(id));
    }
    // If no ID but we have currentAnalysis from recent submission, that's fine
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="results-page">
        <div className="loading">Loading analysis results...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="results-page">
        <div className="error-container">
          <p>❌ Error loading results: {error}</p>
          <button onClick={() => navigate('/scanner')}>Back to Scanner</button>
        </div>
      </div>
    );
  }

  if (!currentAnalysis) {
    return (
      <div className="results-page">
        <div className="empty-state">
          <p>No analysis results found</p>
          <button onClick={() => navigate('/scanner')}>Go to Scanner</button>
        </div>
      </div>
    );
  }

  const handleCopyShareLink = () => {
    const shareUrl = `${window.location.origin}/share/${currentAnalysis.id}?token=${currentAnalysis.shareToken}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Share link copied to clipboard!');
  };

  return (
    <div className="results-page">
      <div className="results-container">
        {/* Results Header */}
        <div className="results-header">
          <h1>✨ Optimization Results</h1>
          <button className="back-btn" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </button>
        </div>

        {/* Score Display */}
        <div className="results-score-section">
          <ScoreTag score={currentAnalysis.energyScore} />
          <div className="score-stats">
            <div className="stat">
              <span className="stat-label">Carbon Reduction</span>
              <span className="stat-value">{currentAnalysis.estimatedReduction}%</span>
            </div>
            <div className="stat">
              <span className="stat-label">Improvements Found</span>
              <span className="stat-value">{currentAnalysis.improvements?.length || 0}</span>
            </div>
          </div>
        </div>

        {/* Code Comparison */}
        <div className="results-comparison">
          <div className="code-section">
            <h3>Original Code</h3>
            <CodeEditor code={currentAnalysis.originalCode} onChange={() => {}} readOnly />
          </div>

          <div className="comparison-arrow">→</div>

          <div className="code-section optimized">
            <h3>Optimized Code</h3>
            <CodeEditor code={currentAnalysis.optimizedCode} onChange={() => {}} readOnly />
          </div>
        </div>

        {/* Improvements List */}
        <div className="improvements-section">
          <h2>🎯 Key Improvements</h2>
          <div className="improvements-list">
            {currentAnalysis.improvements?.map((improvement, idx) => (
              <div key={idx} className="improvement-item">
                <span className="improvement-number">{idx + 1}</span>
                <span className="improvement-text">{improvement}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="results-actions">
          <button className="share-btn" onClick={handleCopyShareLink}>
            🔗 Copy Share Link
          </button>
          <button className="new-analysis-btn" onClick={() => navigate('/scanner')}>
            Optimize New Code
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
