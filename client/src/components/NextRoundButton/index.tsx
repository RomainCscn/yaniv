import React from 'react';

import { send } from '../../core/client';

const NextRoundButton = ({ roomName }: { roomName: string }) => {
  const nextRound = () => {
    send(roomName, { action: 'PLAY', actionType: 'NEXT_ROUND' });
  };

  return <button onClick={nextRound}>Next round</button>;
};

export default NextRoundButton;
