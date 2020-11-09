import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Room from '../Room';
import client, { send } from '../../core/client';
import { OtherPlayer, ReceivedMessage } from '../../types';

const WaitingRoom = () => {
  let { roomId } = useParams() as any;
  const history = useHistory();

  if (!roomId) {
    roomId = Math.random().toString(36).substring(7);
    history.replace('/' + roomId);
  }

  const [error, setError] = useState('');
  const [play, setPlay] = useState(false);
  const [usernames, setUsernames] = useState<string[]>([]);
  const [username, setUsername] = useState(Math.random().toString(36).substring(7));
  const [players, setPlayers] = useState<OtherPlayer[]>([]);
  const [userUuid, setUserUuid] = useState('');

  useEffect(() => {
    client.addEventListener('open', () => {
      send(roomId, { action: 'JOIN', actionType: 'JOINED_WAITING_ROOM' }, { username });

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
    });
  }, [roomId, username]);

  const startGame = () => {
    if (usernames.length >= 2) {
      send(roomId, { action: 'START' });
    } else {
      setError('Un seul joueur dans le salon ! Au moins deux joueurs requis pour jouer.');
    }
  };

  return (
    <div>
      {play ? (
        <Room players={players} roomId={roomId} username={username} userUuid={userUuid} />
      ) : (
        <>
          <div>
            <span>Nom du joueur</span>
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
            <button onClick={() => console.log('update')}>Mettre à jour</button>
          </div>
          <div>
            <br />
            Partager cette url à vos amis pour qu'ils vous rejoignent :{' '}
            <a href={window.location.href}>{window.location.href}</a>
          </div>
          <div>
            <br />
            Joueurs dans le salon :
            {usernames.map((username) => (
              <div key={username}>{username}</div>
            ))}
          </div>
          <br />
          <button onClick={() => startGame()}>PLAY</button>
          {usernames.length < 2 && error}
        </>
      )}
    </div>
  );
};

export default WaitingRoom;
