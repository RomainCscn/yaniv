import React from 'react';

import { send } from '../../core/client';

const NextRoundButton = ({ roomId }: { roomId: string }) => {
  const nextRound = () => {
    send(roomId, { action: 'PLAY', actionType: 'NEXT_ROUND' });
  };

  return <button onClick={nextRound}>Next round</button>;
};

export default NextRoundButton;
