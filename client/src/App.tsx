import React, { useState } from 'react';

import WaitingRoom from './components/WaitingRoom';

const App = () => {
  const [roomName, setRoomName] = useState('a');
  const [username, setUsername] = useState(Math.random().toString(36).substring(7));
  const [hasJoinRoom, setHasJoinRoom] = useState(false);

  const joinRoom = () => {
    setHasJoinRoom(true);
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
