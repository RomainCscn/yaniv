import React, { useEffect, useState } from 'react';

import WaitingRoom from './components/WaitingRoom';
import client, { send } from './core/client';
import { ReceivedMessage } from './types';

const App = () => {
  const [roomName, setRoomName] = useState('a');
  const [username, setUsername] = useState(Math.random().toString(36).substring(7));
  const [hasJoinRoom, setHasJoinRoom] = useState(false);

  useEffect(() => {
    client.onmessage = (message) => {
      const { error }: ReceivedMessage = JSON.parse(message.data);
      if (error) {
        console.log(error);
      } else {
        setHasJoinRoom(true);
      }
    };
  }, []);

  const joinRoom = () => {
    send(roomName, { action: 'JOIN', actionType: 'REQUEST_WAITING_ROOM' }, { username });
  };

  return (
    <div>
      {hasJoinRoom ? (
        <WaitingRoom roomName={roomName} username={username} />
      ) : (
        <>
          <h2>Join a room</h2>
          <div>
            <span>Player name</span>
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <span>Room name</span>
            <input value={roomName} onChange={(e) => setRoomName(e.target.value)} />
          </div>
          <button onClick={joinRoom}>JOIN</button>
        </>
      )}
    </div>
  );
};

export default App;
