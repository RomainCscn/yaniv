import React, { useCallback, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';

import Chat from '../Chat';
import EndRound from '../EndRound';
import MainPlayer from '../Player/MainPlayer';
import OtherPlayers from '../Player/OtherPlayers';
import PickedCardAnnouncement from '../PickedCardAnnouncement';
import QuitModal from '../QuitModal';
import ThrownCards from '../ThrownCards';
import Stack from '../Stack';
import { send } from '../../core/client';
import { canDropCards, getCardsAfterPick } from '../../core/game';
import { Card, Player } from '../../types';
import ScoreDashboard from '../ScoreDashboard';
import useMultiplayer from '../../hooks/useMultiplayer';

interface RoomProps {
  players: Player[];
  roomId: string;
  setPlay: (b: boolean) => void;
  userUuid: string;
}

const Container = styled.div<{ playerQuit: boolean }>`
  display: grid;
  grid-template-columns: 1fr auto;
  ${({ playerQuit }) =>
    playerQuit &&
    css`
      opacity: 0.2;
      pointer-events: none;
    `}
`;

const RoomContainer = styled.div`
  position: relative;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 48px);

  @media screen and (max-height: 850px) {
    padding: 12px;
    height: calc(100vh - 24px);
  }
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Room = ({ players, roomId, setPlay, userUuid }: RoomProps) => {
  const {
    chatState,
    cardState,
    cardDispatch,
    activePlayer,
    canPlay,
    gameWinner,
    hand,
    newCard,
    pickedCard,
    playerQuit,
    previousPlayer,
    quickPlayDone,
    resetOnMessage,
    roundWinner,
    scores,
    sortOrder,
    yanivCaller,
  } = useMultiplayer({ initialPlayers: players, userUuid });

  const player = useMemo(() => players.find((p) => p.uuid === userUuid), [players, userUuid]);

  useEffect(() => {
    send(roomId, { action: 'READY_TO_PLAY' }, { player });
  }, [player, roomId]);

  const resetSelectedCards = () => cardDispatch({ type: 'resetSelectedCards' });

  const pickCard = (card?: Card) => {
    if (canDropCards(cardState.selectedCards)) {
      const cards = getCardsAfterPick(card, cardState.selectedCards, cardState.thrownCards);

      resetSelectedCards();
      send(roomId, { action: 'PLAY', actionType: 'DROP_AND_PICK' }, { ...cards, player });
    }
  };

  const selectCard = (card: Card) => {
    cardDispatch({ type: 'selectCard', payload: card });
  };

  const backToLobby = useCallback(() => {
    resetOnMessage();
    setPlay(false);
  }, [resetOnMessage, setPlay]);

  return (
    <>
      {playerQuit && <QuitModal backToLobby={backToLobby} />}
      <Container playerQuit={playerQuit}>
        <RoomContainer>
          <ScoreDashboard scores={scores} />
          <OtherPlayers
            activePlayer={activePlayer}
            otherPlayers={cardState.otherPlayers}
            scores={scores}
          />
          {!roundWinner && (
            <div>
              <CardsContainer>
                <ThrownCards
                  canPlay={canPlay && cardState.selectedCards.length > 0}
                  pickCard={pickCard}
                  thrownCards={cardState.thrownCards}
                />
                <Stack
                  canPlay={canPlay && cardState.selectedCards.length > 0}
                  pickCard={pickCard}
                />
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
            selectedCards={cardState.selectedCards}
            thrownCards={cardState.thrownCards}
          />
        </RoomContainer>
        <Chat messages={chatState.messages} roomId={roomId} userUuid={userUuid} />
      </Container>
    </>
  );
};

export default Room;
