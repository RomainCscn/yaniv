import React from 'react';

import Button from '../../shared/Button';
import { send } from '../../../core/client';

interface PlayAgainButtonProps {
  roomId: string;
  playerUuid: string;
}

const PlayAgainButton = ({ roomId, playerUuid }: PlayAgainButtonProps) => (
  <Button
    color='green'
    onClick={() =>
      send(roomId, { action: 'PLAY', actionType: 'PLAY_AGAIN' }, { player: { uuid: playerUuid } })
    }
  >
    REJOUER
  </Button>
);

export default PlayAgainButton;
