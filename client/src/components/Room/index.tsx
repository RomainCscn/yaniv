import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';

import EndRound from '../EndRound';
import MainPlayer from '../Player/MainPlayer';
import OtherPlayers from '../Player/OtherPlayers';
import PickedCardAnnouncement from '../PickedCardAnnouncement';
import ThrownCards from '../ThrownCards';
import Stack from '../Stack';
import { send } from '../../core/client';
import { canDropCards, getCardsAfterPick } from '../../core/game';
import { Card, Player } from '../../types';
import ScoreDashboard from '../ScoreDashboard';
import useMultiplayer from '../../hooks/multiplayer';

interface RoomProps {
  players: Player[];
  roomId: string;
  username: string;
  userUuid: string;
}

const Container = styled.div`
  margin: 0 auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 48px);
  max-width: 1200px;

  @media screen and (max-height: 850px) {
    padding: 12px;
    height: calc(100vh - 24px);
  }
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Room = ({ players, roomId, userUuid }: RoomProps) => {
  const {
    state,
    dispatch,
    activePlayer,
    canPlay,
    gameWinner,
    hand,
    newCard,
    pickedCard,
    previousPlayer,
    quickPlayDone,
    roundWinner,
    scores,
    sortOrder,
    yanivCaller,
  } = useMultiplayer({ initialPlayers: players, userUuid });

  const player = useMemo(() => players.find((p) => p.uuid === userUuid), [players, userUuid]);

  useEffect(() => {
    send(roomId, { action: 'READY_TO_PLAY' });
  }, [roomId]);

  const resetSelectedCards = () => dispatch({ type: 'resetSelectedCards' });

  const pickCard = (card?: Card) => {
    if (canDropCards(state.selectedCards)) {
      const cards = getCardsAfterPick(card, state.selectedCards, state.thrownCards);

      resetSelectedCards();
      send(roomId, { action: 'PLAY', actionType: 'DROP_AND_PICK' }, { ...cards });
    }
  };

  const selectCard = (card: Card) => {
    dispatch({ type: 'selectCard', payload: card });
  };

  return (
    <Container>
      <ScoreDashboard scores={scores} />
      <OtherPlayers
        activePlayer={activePlayer}
        otherPlayers={state.otherPlayers}
        roundWinner={roundWinner}
        scores={scores}
      />
      {!roundWinner && (
        <div>
          <CardsContainer>
            <ThrownCards
              canPlay={canPlay && state.selectedCards.length > 0}
              pickCard={pickCard}
              thrownCards={state.thrownCards}
            />
            <Stack canPlay={canPlay && state.selectedCards.length > 0} pickCard={pickCard} />
          </CardsContainer>
          {previousPlayer && previousPlayer.uuid !== userUuid && (
            <PickedCardAnnouncement previousPlayer={previousPlayer} pickedCard={pickedCard} />
          )}
        </div>
      )}
      {(gameWinner || roundWinner) && (
        <EndRound
          gameWinner={gameWinner}
          roomId={roomId}
          roundWinner={roundWinner}
          userUuid={userUuid}
          yanivCaller={yanivCaller}
        />
      )}
      <MainPlayer
        canPlay={canPlay}
        hand={hand}
        newCard={newCard}
        quickPlayDone={quickPlayDone}
        player={player!}
        resetSelectedCards={resetSelectedCards}
        roomId={roomId}
        score={scores.find((score) => score.uuid === userUuid)?.score || 0}
        sortOrder={sortOrder}
        selectCard={selectCard}
        selectedCards={state.selectedCards}
        thrownCards={state.thrownCards}
      />
    </Container>
  );
};

export default Room;
