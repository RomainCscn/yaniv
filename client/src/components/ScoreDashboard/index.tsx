import React from 'react';

import { PlayerScore } from '../../types';

const ScoreDashboard = ({ scores }: { scores: PlayerScore[] }) => {
  return (
    <div>
      {scores.map((score) => (
        <div>
          {score[0]} : {score[1]}
        </div>
      ))}
    </div>
  );
};

export default ScoreDashboard;
