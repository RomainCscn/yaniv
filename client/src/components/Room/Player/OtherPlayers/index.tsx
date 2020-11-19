import React from 'react';

import OtherPlayerHand from './OtherPlayerHand';
import { Player, PlayerScore } from '../../../../types';
import styled from 'styled-components';

interface OtherPlayersProps {
  activePlayer: string;
  otherPlayers: Player[];
  scores: PlayerScore[];
}

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const OtherPlayers = ({ activePlayer, otherPlayers, scores }: OtherPlayersProps) => {
  return (
    <Container>
      {otherPlayers.map(({ avatar, hand, numberOfCards, username, uuid }: Player) => (
        <OtherPlayerHand
          key={username}
          avatar={avatar}
          hand={hand}
          isActivePlayer={uuid === activePlayer}
          numberOfCards={numberOfCards}
          score={scores.find((score) => score.uuid === uuid)?.score || 0}
          username={username}
        />
      ))}
    </Container>
  );
};

export default OtherPlayers;
