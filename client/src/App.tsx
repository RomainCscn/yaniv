import React, { useState } from 'react';

import WaitingRoom from './components/WaitingRoom';

const client = new WebSocket('ws://localhost:8999/');

const App = () => {
  const [roomName, setRoomName] = useState('a');
  const [username, setUsername] = useState('');
  const [hasJoinRoom, setHasJoinRoom] = useState(false);

  const joinRoom = () => {
    setHasJoinRoom(true);
  };

  return (
    <div>
      {hasJoinRoom ? (
        <WaitingRoom client={client} roomName={roomName} username={username} />
      ) : (
        <>
          <h2>Join a room</h2>
          <div>
            <span>Player name</span>
            <input onChange={(e) => setUsername(e.target.value)} />
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
