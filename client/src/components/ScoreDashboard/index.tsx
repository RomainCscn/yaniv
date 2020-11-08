import React, { useState } from 'react';

import { PlayerScore } from '../../types';

const ScoreDashboard = ({ scores }: { scores: PlayerScore[] }) => {
  const [showScores, setShowScores] = useState(false);

  return (
    <div>
      <button onClick={() => setShowScores(!showScores)}> SCORES </button>
      {showScores &&
        scores.map((score) => (
          <div>
            {score.username} : {score.scoreHistory.toString()}
          </div>
        ))}
    </div>
  );
};

export default ScoreDashboard;
