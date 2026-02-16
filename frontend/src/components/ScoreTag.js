import React from 'react';
import '../styles/ScoreTag.css';

function ScoreTag({ score }) {
  const getScoreClass = () => {
    if (score >= 8) return 'score-excellent';
    if (score >= 6) return 'score-good';
    if (score >= 4) return 'score-fair';
    return 'score-poor';
  };

  const getScoreLabel = () => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Fair';
    return 'Poor';
  };

  return (
    <div className={`score-tag ${getScoreClass()}`}>
      <div className="score-value">{score.toFixed(1)}</div>
      <div className="score-label">{getScoreLabel()}</div>
    </div>
  );
}

export default ScoreTag;
