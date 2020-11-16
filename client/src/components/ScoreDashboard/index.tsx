import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { PlayerScore } from '../../types';

const Button = styled.div`
  display: inline-block;
  padding: 12px;
  font-size: 1rem;
  font-weight: bold;
  border: 1px solid #2c5282;
  border-radius: 12px;
  background-color: white;
  color: #2c5282;
  cursor: pointer;
`;

const Container = styled.div`
  position: absolute;
  z-index: 10;
`;

const Table = styled.table`
  margin-top: 12px;
  border-collapse: separate;
  border-spacing: 0;
  background-color: white;
  border: 2px solid #2c5282;
  border-radius: 6px;
  color: #2c5282;
  max-height: 500px;
  display: block;
  overflow: auto;
`;

const TableCell = styled.td<{ isWinningCell: boolean }>`
  padding: 3px 12px;
  ${({ isWinningCell }) =>
    isWinningCell &&
    css`
      font-weight: bold;
      background: #ebf8ff;
    `}
`;

const TableHeader = styled.th`
  background-color: #2c5282;
  color: #ebf8ff;
  padding: 6px 12px;
`;

const ScoreDashboard = ({ scores }: { scores: PlayerScore[] }) => {
  const [showScores, setShowScores] = useState(false);

  const getRowScores = (index: number) =>
    scores.map((score) => {
      const isWinningCell =
        score.scoreHistory[index] === 0 ||
        score.scoreHistory[index - 1] === score.scoreHistory[index];

      return <TableCell isWinningCell={isWinningCell}>{score.scoreHistory[index]}</TableCell>;
    });

  return (
    <Container>
      <Button onClick={() => setShowScores(!showScores)}>SCORES</Button>
      {showScores && (
        <Table>
          <thead>
            <tr>
              {scores.map((score) => (
                <TableHeader>{score.username}</TableHeader>
              ))}
            </tr>
          </thead>
          {scores[0]?.scoreHistory.map((value, index) => (
            <tr>{getRowScores(index)}</tr>
          ))}
        </Table>
      )}
    </Container>
  );
};

export default ScoreDashboard;
