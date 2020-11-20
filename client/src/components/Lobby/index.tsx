import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import HowToPlay from './HowToPlay';
import Players from './Players';
import Profile from './Profile';
import RoomConfiguration from './RoomConfiguration';
import ShareLink from './ShareLink';
import { Languages, SectionContainer, Title } from './styles';
import Room from '../Room';
import useLobby from '../../hooks/useLobby';

const Lobby = () => {
  let { roomId } = useParams() as any;
  const history = useHistory();

  if (!roomId) {
    roomId = Math.random().toString(36).substring(7);
    history.replace('/' + roomId);
  }

  const {
    error,
    handCardsNumber,
    isLoading,
    play,
    player,
    players,
    scoreLimit,
    setHandCardsNumber,
    setPlay,
    setPlayer,
    setScoreLimit,
  } = useLobby({ roomId });

  const { i18n } = useTranslation();

  if (isLoading) {
    return null;
  }

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      {play ? (
        <Room players={players} roomId={roomId} setPlay={setPlay} playerUuid={player.uuid} />
      ) : (
        <>
          <Languages>
            <div onClick={() => changeLanguage('en')}>English</div>
            <div onClick={() => changeLanguage('fr')}>Français</div>
          </Languages>
          <Title>Yaniv</Title>
          <ShareLink />
          <SectionContainer>
            <Players error={error} players={players} roomId={roomId} currentPlayer={player} />
            <Profile player={player} roomId={roomId} setPlayer={setPlayer} />
          </SectionContainer>
          <SectionContainer alignStart>
            <RoomConfiguration
              roomId={roomId}
              handCardsNumber={handCardsNumber}
              setHandCardsNumber={setHandCardsNumber}
              scoreLimit={scoreLimit}
              setScoreLimit={setScoreLimit}
            />
            <HowToPlay />
          </SectionContainer>
        </>
      )}
    </>
  );
};

export default Lobby;
