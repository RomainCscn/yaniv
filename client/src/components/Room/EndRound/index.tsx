import React from 'react';
import styled from 'styled-components';

import GameOver from './GameOver';
import RoundOver from './RoundOver';

import { Player } from '../../../types';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

interface Props {
  gameWinner?: Player;
  roomId: string;
  roundWinner?: Player;
  playerUuid: string;
  yanivCaller?: Player;
}

const EndRound = ({ gameWinner, roomId, roundWinner, playerUuid, yanivCaller }: Props) => (
  <Container>
    {gameWinner ? (
      <GameOver roomId={roomId} gameWinner={gameWinner} playerUuid={playerUuid} />
    ) : (
      roundWinner && <RoundOver roomId={roomId} roundWinner={roundWinner} playerUuid={playerUuid} />
    )}
  </Container>
);

export default EndRound;
