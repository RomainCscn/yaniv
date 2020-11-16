import React from 'react';

import Button from '../shared/Button';
import { send } from '../../core/client';

interface PlayAgainButtonProps {
  roomId: string;
}

const PlayAgainButton = ({ roomId }: PlayAgainButtonProps) => (
  <Button color='green' onClick={() => send(roomId, { action: 'PLAY', actionType: 'PLAY_AGAIN' })}>
    REJOUER
  </Button>
);

export default PlayAgainButton;
