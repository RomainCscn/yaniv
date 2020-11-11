import React, { useState } from 'react';
import classnames from 'classnames';

import { PlayerScore } from '../../types';

import styles from './styles.module.css';

const ScoreDashboard = ({ scores }: { scores: PlayerScore[] }) => {
  const [showScores, setShowScores] = useState(false);

  const getRowScores = (index: number) =>
    scores.map((score) => {
      const isWinningCell =
        score.scoreHistory[index] === 0 ||
        score.scoreHistory[index - 1] === score.scoreHistory[index];

      return (
        <td className={classnames(styles.tableCell, { [styles.winningTableCell]: isWinningCell })}>
          {score.scoreHistory[index]}
        </td>
      );
    });

  return (
    <div style={{ position: 'absolute' }}>
      <button className={styles.button} onClick={() => setShowScores(!showScores)}>
        SCORES
      </button>
      {showScores && (
        <table className={styles.table}>
          <thead>
            <tr>
              {scores.map((score) => (
                <th className={styles.tableHeader}>{score.username}</th>
              ))}
            </tr>
          </thead>
          {scores[0]?.scoreHistory.map((value, index) => (
            <tr>{getRowScores(index)}</tr>
          ))}
        </table>
      )}
    </div>
  );
};

export default ScoreDashboard;
