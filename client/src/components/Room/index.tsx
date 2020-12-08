import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';

import Chat from './Chat';
import EndRound from './EndRound';
import Menu from './Menu';
import MainPlayer from './Player/MainPlayer';
import OtherPlayers from './Player/OtherPlayers';
import PickedCardAnnouncement from './PickedCardAnnouncement';
import QuitModal from './QuitModal';
import ThrownCards from './ThrownCards';
import Stack from './Stack';
import { send } from '../../core/client';
import { canDropCards, getCardsAfterPick } from '../../core/game';
import { Card } from '../../types';
import useMultiplayer from '../../hooks/useMultiplayer';

const Container = styled.div<{ showModal: boolean }>`
  display: grid;
  grid-template-columns: 1fr auto;
  ${({ showModal }) =>
    showModal &&
    css`
      opacity: 0.2;
      pointer-events: none;
    `}
`;

const RoomContainer = styled.div`
  position: relative;
  padding: 1.2em 1.2em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

const CenterContainer = styled.div`
  margin-bottom: 3em;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
`;

const PlayersTurn = styled.p`
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  min-height: 2em;
`;

interface RoomProps {
  roomId: string;
  setPlay: (b: boolean) => void;
  playerUuid: string;
}

const Room = ({ roomId, setPlay, playerUuid }: RoomProps) => {
  const { t } = useTranslation('room');

  const [showModal, setShowModal] = useState(false);

  const {
    chatState: { messages },
    cardState: { selectedCards, thrownCards },
    cardDispatch,
    canPlay,
    newCard,
    pickedCard,
    playerQuit,
    playersState: {
      activePlayerUuid,
      gameWinner,
      otherPlayers,
      player,
      previousPlayer,
      roundWinner,
      yanivCaller,
    },
    quickPlayDone,
    resetOnMessage,
    scores,
    shouldGoBackToLobby,
  } = useMultiplayer({ playerUuid });

  useEffect(() => {
    send(roomId, { action: 'READY_TO_PLAY' }, { player: { uuid: playerUuid } });
  }, [playerUuid, roomId]);

  // handle another player going back to lobby
  useEffect(() => {
    if (shouldGoBackToLobby) {
      resetOnMessage();
      setPlay(false);
    }
  }, [resetOnMessage, setPlay, shouldGoBackToLobby]);

  const backToLobby = useCallback(() => {
    resetOnMessage();
    setPlay(false);
  }, [resetOnMessage, setPlay]);

  const resetSelectedCards = () => cardDispatch({ type: 'resetSelectedCards' });

  const pickCard = (card?: Card) => {
    if (canDropCards(selectedCards)) {
      const cards = getCardsAfterPick(card, selectedCards, thrownCards);

      resetSelectedCards();
      send(roomId, { action: 'PLAY', actionType: 'DROP_AND_PICK' }, { cards, player });
    }
  };

  const selectCard = (card: Card) => {
    cardDispatch({ type: 'selectCard', payload: card });
  };

  return (
    <>
      {playerQuit && <QuitModal backToLobby={backToLobby} />}
      {player && (
        <>
          <Menu
            backToLobby={backToLobby}
            playerSort={player.sort}
            playerUuid={playerUuid}
            roomId={roomId}
            scores={scores}
            setShowModal={setShowModal}
          />
          <Container showModal={playerQuit || showModal}>
            <RoomContainer>
              <OtherPlayers
                activePlayer={activePlayerUuid}
                isEndRound={!!gameWinner || !!roundWinner}
                otherPlayers={otherPlayers}
                scores={scores}
                yanivCaller={yanivCaller}
              />
              {!roundWinner && (
                <CenterContainer>
                  <PlayersTurn>{canPlay ? t('yourTurn') : ''}</PlayersTurn>
                  <CardsContainer>
                    <ThrownCards
                      canPlay={canPlay && selectedCards.length > 0}
                      pickCard={pickCard}
                      thrownCards={thrownCards}
                    />
                    <Stack canPlay={canPlay && selectedCards.length > 0} pickCard={pickCard} />
                  </CardsContainer>
                  {previousPlayer && previousPlayer.uuid !== playerUuid && (
                    <PickedCardAnnouncement
                      previousPlayer={previousPlayer}
                      pickedCard={pickedCard}
                    />
                  )}
                </CenterContainer>
              )}
              {(gameWinner || roundWinner) && (
                <EndRound
                  gameWinner={gameWinner}
                  roomId={roomId}
                  roundWinner={roundWinner}
                  playerUuid={playerUuid}
                  yanivCaller={yanivCaller}
                />
              )}
              <MainPlayer
                canPlay={canPlay}
                hand={player.hand}
                newCard={newCard}
                quickPlayDone={quickPlayDone}
                player={player}
                resetSelectedCards={resetSelectedCards}
                roomId={roomId}
                score={scores.find((score) => score.uuid === playerUuid)?.score || 0}
                selectCard={selectCard}
                selectedCards={selectedCards}
                thrownCards={thrownCards}
              />
            </RoomContainer>
            <Chat messages={messages} roomId={roomId} playerUuid={playerUuid} />
          </Container>
        </>
      )}
    </>
  );
};

export default Room;
