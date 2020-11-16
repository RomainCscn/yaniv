import React from 'react';

import Button from '../shared/Button';
import { send } from '../../core/client';

const NextRoundButton = ({ roomId }: { roomId: string }) => {
  const nextRound = () => {
    send(roomId, { action: 'PLAY', actionType: 'NEXT_ROUND' });
  };

  return (
    <Button color='green' onClick={nextRound}>
      MANCHE SUIVANTE
    </Button>
  );
};

export default NextRoundButton;
