import React from 'react';

import Button from '../shared/Button';
import { send } from '../../core/client';

interface PlayAgainButtonProps {
  roomId: string;
  userUuid: string;
}

const PlayAgainButton = ({ roomId, userUuid }: PlayAgainButtonProps) => (
  <Button
    color='green'
    onClick={() =>
      send(roomId, { action: 'PLAY', actionType: 'PLAY_AGAIN' }, { player: { uuid: userUuid } })
    }
  >
    REJOUER
  </Button>
);

export default PlayAgainButton;
