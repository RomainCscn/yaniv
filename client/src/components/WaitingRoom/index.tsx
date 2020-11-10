import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import AVATARS from '../Avatar';
import AvatarList from '../Avatar/AvatarList';
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
  const [selectedAvatar, setAvatar] = useState<string>(
    AVATARS[Math.floor(Math.random() * AVATARS.length)][0],
  );
  const [username, setUsername] = useState(Math.random().toString(36).substring(7));
  const [players, setPlayers] = useState<OtherPlayer[]>([]);
  const [userUuid, setUserUuid] = useState('');

  useEffect(() => {
    client.addEventListener('open', () => {
      send(
        roomId,
        { action: 'JOIN', actionType: 'JOINED_WAITING_ROOM' },
        { avatar: selectedAvatar, username },
      );

      client.onmessage = (message) => {
        const { players, type, uuid }: ReceivedMessage = JSON.parse(message.data);

        if (type === 'PLAYERS_UPDATE') {
          const otherPlayers = players.filter((player) => player.uuid !== uuid);
          setPlayers(otherPlayers);
        } else if (type === 'START_GAME') {
          const otherPlayers = players.filter((player) => player.username !== username);
          setUserUuid(uuid);
          setPlayers(otherPlayers);
          setPlay(true);
        }
      };
    });
  }, [roomId, selectedAvatar, username]);

  const startGame = () => {
    if (players.length >= 2) {
      send(roomId, { action: 'START' });
    } else {
      setError('Un seul joueur dans le salon ! Au moins deux joueurs requis pour jouer.');
    }
  };

  const updatePlayerInformation = () => {
    send(roomId, { action: 'UPDATE' }, { avatar: selectedAvatar, username });
  };

  return (
    <div>
      {play ? (
        <Room players={players} roomId={roomId} username={username} userUuid={userUuid} />
      ) : (
        <>
          <div>
            <div>
              <span>Nom du joueur</span>
              <input value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              Avatar
              <AvatarList selectedAvatar={selectedAvatar} setAvatar={setAvatar} />
            </div>
            <button onClick={updatePlayerInformation}>Mettre à jour</button>
          </div>
          <div>
            <br />
            Partager cette url à vos amis pour qu'ils vous rejoignent :{' '}
            <a href={window.location.href}>{window.location.href}</a>
          </div>
          <div>
            <br />
            Joueurs dans le salon :
            {players.map((player) => (
              <div key={player.uuid}>
                <img
                  width={50}
                  src={AVATARS.find((avatar) => avatar[0] === player.avatar)![1]}
                  alt={player.avatar}
                />
                {player.username}
              </div>
            ))}
          </div>
          <br />
          <button onClick={() => startGame()}>PLAY</button>
          {players.length < 2 && error}
        </>
      )}
    </div>
  );
};

export default WaitingRoom;
