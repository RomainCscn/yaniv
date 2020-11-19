import React from 'react';

import Button from '../../shared/Button';
import { send } from '../../../core/client';

const NextRoundButton = ({ roomId, userUuid }: { roomId: string; userUuid: string }) => {
  const nextRound = () => {
    send(roomId, { action: 'PLAY', actionType: 'NEXT_ROUND' }, { player: { uuid: userUuid } });
  };

  return (
    <Button color='green' onClick={nextRound}>
      MANCHE SUIVANTE
    </Button>
  );
};

export default NextRoundButton;
