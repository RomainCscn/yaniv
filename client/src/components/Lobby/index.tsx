import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import HowToPlay from './HowToPlay';
import Players from './Players';
import Profile from './Profile';
import RoomConfiguration from './RoomConfiguration';
import ShareLink from './ShareLink';
import { SectionContainer, Title } from './styles';
import AVATARS from '../Avatar';
import Room from '../Room';
import client, { send } from '../../core/client';
import { CustomError, Player, ReceivedMessage } from '../../types';
import useLocalStorage from '../../hooks/useLocalStorage';

const randomAvatar = AVATARS[Math.floor(Math.random() * AVATARS.length)][0];
const randomUsername = Math.random().toString(36).substring(7);

const initialPlayer: Player = { avatar: randomAvatar, username: randomUsername, uuid: '' };

const Lobby = () => {
  let { roomId } = useParams() as any;
  const history = useHistory();

  const [error, setError] = useState<CustomError>();
  const [handCardsNumber, setHandCardsNumber] = useState(7);
  const [scoreLimit, setScoreLimit] = useState(200);
  const [play, setPlay] = useState(false);
  const [player, setPlayer] = useLocalStorage('player', initialPlayer);
  const [players, setPlayers] = useState<Player[]>([]);

  if (!roomId) {
    roomId = Math.random().toString(36).substring(7);
    history.replace('/' + roomId);
  }

  const handleMessage = useCallback(
    (message: any) => {
      const { configuration, error, playerUuid, players, type }: ReceivedMessage = JSON.parse(
        message.data,
      );

      if (error === 'GAME_ALREADY_STARTED') {
        return setError(error);
      }

      if (type === 'CONFIGURATION_UPDATE') {
        setHandCardsNumber(configuration.handCardsNumber);
        setScoreLimit(configuration.scoreLimit);
      } else if (type === 'ASSIGN_UUID') {
        setPlayer((prevPlayer: Player) => ({ ...prevPlayer, uuid: playerUuid }));
      } else if (type === 'JOIN_ONGOING_GAME') {
        setPlayers(players);
        setPlay(true);
      } else if (type === 'PLAYERS_UPDATE') {
        setPlayers(players);
      } else if (type === 'START_GAME') {
        setPlayers(players);
        setPlay(true);
      }
    },
    [setPlayer],
  );

  const sendJoin = useCallback(() => {
    send(roomId, { action: 'JOIN', actionType: 'JOINED_LOBBY' }, { player });
  }, [player, roomId]);

  useEffect(() => {
    if (client.readyState !== client.OPEN) {
      client.addEventListener('open', () => {
        sendJoin();
        client.onmessage = handleMessage;
      });
    } else if (client.onmessage === null) {
      sendJoin();
      client.onmessage = handleMessage;
    }
  }, [handleMessage, sendJoin, roomId]);

  return (
    <>
      {play ? (
        <Room players={players} roomId={roomId} userUuid={player.uuid} />
      ) : (
        <>
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
