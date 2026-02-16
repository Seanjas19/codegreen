import React from 'react';
import ScoreTag from './ScoreTag';
import '../styles/ResultCard.css';

function ResultCard({ id, energyScore, improvements, estimatedReduction, timestamp, onViewDetails }) {
  const formatDate = (date) => {
    if (typeof date === 'object' && date.toDate) {
      date = date.toDate();
    }
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="result-card">
      <div className="result-header">
        <div className="result-info">
          <h3>Analysis #{id?.substring(0, 8)} </h3>
          <p className="result-date">{formatDate(timestamp)}</p>
        </div>
        <ScoreTag score={energyScore} />
      </div>

      <div className="result-body">
        <div className="result-stat">
          <span className="stat-label">Improvements:</span>
          <span className="stat-value">{improvements?.length || 0}</span>
        </div>
        <div className="result-stat">
          <span className="stat-label">Carbon Reduction:</span>
          <span className="stat-value">{estimatedReduction || 0}%</span>
        </div>
      </div>

      <div className="result-improvements">
        {improvements?.slice(0, 2).map((imp, idx) => (
          <div key={idx} className="improvement-tag">
            ✓ {imp}
          </div>
        ))}
        {improvements?.length > 2 && <div className="improvement-tag">+ {improvements.length - 2} more</div>}
      </div>

      <button className="view-details-btn" onClick={() => onViewDetails(id)}>
        View Details →
      </button>
    </div>
  );
}

export default ResultCard;
