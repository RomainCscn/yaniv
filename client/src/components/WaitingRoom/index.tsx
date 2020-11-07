import React, { useEffect, useState } from 'react';

import Room from '../Room';
import client, { send } from '../../core/client';
import { OtherPlayer, ReceivedMessage } from '../../types';

interface RoomProps {
  roomName: string;
  username: string;
}

const WaitingRoom = ({ roomName, username }: RoomProps) => {
  const [error, setError] = useState('');
  const [play, setPlay] = useState(false);
  const [usernames, setUsernames] = useState<string[]>([]);
  const [players, setPlayers] = useState<OtherPlayer[]>([]);
  const [userUuid, setUserUuid] = useState('');

  useEffect(() => {
    send(roomName, { action: 'JOIN' }, { username });

    client.onmessage = (message) => {
      const { players, usernameList, type, uuid }: ReceivedMessage = JSON.parse(message.data);

      if (type === 'PLAYERS_UPDATE') {
        setUsernames(usernameList);
      } else if (type === 'START_GAME') {
        const otherPlayers = players.filter((player) => player.username !== username);
        setUserUuid(uuid);
        setPlayers(otherPlayers);
        setPlay(true);
      }
    };
  }, [roomName, username]);

  const startGame = () => {
    if (usernames.length >= 2) {
      send(roomName, { action: 'START' });
    } else {
      setError('Un seul joueur dans le salon ! Au moins deux joueurs requis pour jouer.');
    }
  };

  return (
    <div>
      {play ? (
        <Room players={players} roomName={roomName} username={username} userUuid={userUuid} />
      ) : (
        <>
          <p>Joueur dans le salon :</p>
          {usernames.map((username) => (
            <div key={username}>{username}</div>
          ))}
          <button onClick={() => startGame()}>PLAY</button>
          {usernames.length < 2 && error}
        </>
      )}
    </div>
  );
};

export default WaitingRoom;
