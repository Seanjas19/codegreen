import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { submitCodeForAnalysis } from '../redux/analysisSlice';
import AnalysisForm from '../components/AnalysisForm';
import '../styles/ScannerPage.css';

function ScannerPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, currentAnalysis } = useSelector((state) => state.analysis);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmitCode = async (code, language) => {
    setSubmitError(null);
    try {
      const result = await dispatch(submitCodeForAnalysis(code, language));
      // Navigate to results page with the analysis ID
      if (result && result.id) {
        navigate(`/results/${result.id}`);
      }
    } catch (err) {
      setSubmitError(err.message || 'Failed to analyze code');
    }
  };

  return (
    <div className="scanner-page">
      <div className="scanner-container">
        <div className="scanner-header">
          <h1>🔍 Code Scanner</h1>
          <p>Submit your code and let Gemini AI optimize it for carbon efficiency</p>
        </div>

        {submitError && <div className="error-banner">❌ {submitError}</div>}
        {error && <div className="error-banner">❌ {error}</div>}

        <div className="scanner-content">
          <div className="form-section">
            <AnalysisForm onSubmit={handleSubmitCode} loading={loading} />
          </div>

          <div className="scanner-info">
            <div className="info-card">
              <h3>💡 Tips for Better Results</h3>
              <ul>
                <li>Share complete functions or modules</li>
                <li>Include relevant context for the code</li>
                <li>Maximum code size: 10KB</li>
                <li>Supported languages: JavaScript, Python, Java, C++, C#, Go, Rust, TypeScript</li>
              </ul>
            </div>

            <div className="info-card">
              <h3>🎯 What We Optimize</h3>
              <ul>
                <li>🔄 Redundant loops & iterations</li>
                <li>💾 Inefficient memory allocation</li>
                <li>⏱️ Blocking I/O operations</li>
                <li>🗄️ Database query optimization</li>
                <li>🧮 Algorithm complexity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScannerPage;
