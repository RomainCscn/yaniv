import React from 'react';
import styled, { css } from 'styled-components';

import { ReactComponent as CrownIcon } from '../../../../assets/icons/crown.svg';
import { PlayerScore } from '../../../../types';

const Table = styled.table`
  margin-top: 12px;
  border-collapse: separate;
  border-spacing: 0;
  background-color: #222f44;
  border-radius: 6px;
  color: white;
  border: solid 2px #3b4a61;
  max-height: 500px;
  overflow: auto;
  width: 100%;
  font-family: 'Roboto', sans-serif;

  thead th {
    position: sticky;
    top: 0;
  }
`;

const TableCell = styled.div<{ isWinningCell: boolean }>`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  ${({ isWinningCell }) =>
    isWinningCell &&
    css`
      font-weight: bold;
    `}
`;

const TableHeader = styled.th`
  background-color: #172035;
  color: #ebf8ff;
  padding: 6px 12px;
  text-align: left;

  &:first-child {
    border-top-left-radius: 6px;
  }

  &:last-child {
    border-top-right-radius: 6px;
  }
`;

const ScoreDashboard = ({ scores }: { scores: PlayerScore[] }) => {
  const getRowScores = (index: number) =>
    scores.map((score) => {
      const isWinningCell =
        score.scoreHistory[index] === 0 ||
        score.scoreHistory[index - 1] === score.scoreHistory[index];

      return (
        <td>
          <TableCell isWinningCell={isWinningCell}>
            {score.scoreHistory[index]}{' '}
            {isWinningCell && (
              <CrownIcon height='16px' fill='white' style={{ marginLeft: '9px' }} />
            )}
          </TableCell>
        </td>
      );
    });

  return (
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
  );
};

export default ScoreDashboard;
