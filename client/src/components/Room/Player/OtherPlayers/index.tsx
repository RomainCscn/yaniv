import React from 'react';
import styled from 'styled-components';

import OtherPlayerHand from './OtherPlayerHand';
import { Player, PlayerScore } from '../../../../types';

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

interface OtherPlayersProps {
  activePlayer: string;
  isEndRound: boolean;
  otherPlayers: Player[];
  scores: PlayerScore[];
  yanivCaller?: Player;
}

const OtherPlayers = ({
  activePlayer,
  isEndRound,
  otherPlayers,
  scores,
  yanivCaller,
}: OtherPlayersProps) => (
  <Container>
    {otherPlayers.map(({ avatar, hand, numberOfCards, username, uuid }: Player) => (
      <OtherPlayerHand
        key={username}
        avatar={avatar}
        hand={hand}
        isActivePlayer={uuid === activePlayer}
        isEndRound={isEndRound}
        isYanivCaller={uuid === yanivCaller?.uuid}
        numberOfCards={numberOfCards}
        score={scores.find((score) => score.uuid === uuid)?.score || 0}
        username={username}
      />
    ))}
  </Container>
);

export default OtherPlayers;
