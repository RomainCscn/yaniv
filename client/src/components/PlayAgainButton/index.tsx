import React from 'react';

import { send } from '../../core/client';

interface PlayAgainButtonProps {
  roomId: string;
}

const PlayAgainButton = ({ roomId }: PlayAgainButtonProps) => (
  <button onClick={() => send(roomId, { action: 'PLAY', actionType: 'PLAY_AGAIN' })}>
    Rejouer
  </button>
);

export default PlayAgainButton;
