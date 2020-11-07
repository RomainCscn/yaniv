import React from 'react';

import { send } from '../../core/client';

interface PlayAgainButtonProps {
  roomName: string;
}

const PlayAgainButton = ({ roomName }: PlayAgainButtonProps) => (
  <button onClick={() => send(roomName, { action: 'PLAY', actionType: 'PLAY_AGAIN' })}>
    Rejouer
  </button>
);

export default PlayAgainButton;
