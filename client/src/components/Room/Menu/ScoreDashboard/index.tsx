import React from 'react';
import styled, { css } from 'styled-components';

import { ReactComponent as CrownIcon } from '../../../../assets/icons/crown.svg';
import { PlayerScore } from '../../../../types';

const Container = styled.div`
  margin-top: 0.8em;
  max-height: 400px;
  overflow: auto;
`;

const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  background-color: #222f44;
  border-radius: 0.3em;
  color: white;
  border: solid 2px #3b4a61;
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
  padding: 0.3em 0.8em;
  ${({ isWinningCell }) =>
    isWinningCell &&
    css`
      font-weight: bold;
    `}
`;

const TableHeader = styled.th`
  background-color: #172035;
  color: #ebf8ff;
  padding: 0.5em 0.8em;
  text-align: left;

  &:first-child {
    border-top-left-radius: 6px;
  }

  &:last-child {
    border-top-right-radius: 6px;
  }
`;

const ScoreDashboard = ({ scores }: { scores: PlayerScore[] }) => {
  const isWinningCell = ({ scoreHistory }: PlayerScore, index: number) =>
    scoreHistory[index] === 0 || scoreHistory[index - 1] === scoreHistory[index];

  const getRowScores = (index: number) =>
    scores.map((score, scoreIndex) => (
      <td key={scoreIndex}>
        <TableCell isWinningCell={isWinningCell(score, index)}>
          {score.scoreHistory[index]}{' '}
          {isWinningCell(score, index) && (
            <CrownIcon height='16px' fill='white' style={{ marginLeft: '9px' }} />
          )}
        </TableCell>
      </td>
    ));

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            {scores.map((score, index) => (
              <TableHeader key={index}>{score.username}</TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {scores[0]?.scoreHistory.map((_, index) => (
            <tr key={index}>{getRowScores(index)}</tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ScoreDashboard;
