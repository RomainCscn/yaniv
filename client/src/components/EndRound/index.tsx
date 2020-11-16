import React from 'react';
import styled from 'styled-components';

import GameOver from './GameOver';
import RoundOver from './RoundOver';

import { Player } from '../../types';

interface Props {
  gameWinner?: Player;
  roomId: string;
  roundWinner?: Player;
  userUuid: string;
  yanivCaller?: Player;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const EndRound = ({ gameWinner, roomId, roundWinner, userUuid, yanivCaller }: Props) => (
  <Container>
    {gameWinner ? (
      <GameOver roomId={roomId} gameWinner={gameWinner} userUuid={userUuid} />
    ) : (
      roundWinner && (
        <RoundOver
          roomId={roomId}
          roundWinner={roundWinner}
          userUuid={userUuid}
          yanivCaller={yanivCaller}
        />
      )
    )}
  </Container>
);

export default EndRound;
