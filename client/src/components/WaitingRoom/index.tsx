import React, { useEffect, useState } from 'react';

import Room from '../Room';
import { OtherPlayer, ReceivedMessage } from '../../types';
import { send } from '../../utils';

interface RoomProps {
  client: WebSocket;
  roomName: string;
  username: string;
}

const WaitingRoom = ({ client, roomName, username }: RoomProps) => {
  const [play, setPlay] = useState(false);
  const [usernames, setUsernames] = useState<string[]>([]);
  const [players, setPlayers] = useState<OtherPlayer[]>([]);

  useEffect(() => {
    send(client, roomName, { action: 'JOIN' }, { username });

    client.onmessage = (message) => {
      const { players, usernameList, type }: ReceivedMessage = JSON.parse(message.data);

      if (type === 'PLAYERS_UPDATE') {
        setUsernames(usernameList);
      } else if (type === 'START_GAME') {
        const otherPlayers = players.filter((player) => player.username !== username);
        setPlayers(otherPlayers);
        setPlay(true);
      }
    };
  }, [client, roomName, username]);

  const startGame = () => {
    send(client, roomName, { action: 'START' });
  };

  return (
    <div>
      {play ? (
        <Room client={client} players={players} roomName={roomName} username={username} />
      ) : (
        <>
          <p>Joueur dans le salon :</p>
          {usernames.map((username) => (
            <div key={username}>{username}</div>
          ))}
          <button onClick={() => startGame()}>PLAY</button>
        </>
      )}
    </div>
  );
};

export default WaitingRoom;
