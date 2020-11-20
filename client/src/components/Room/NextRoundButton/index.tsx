import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../shared/Button';
import { send } from '../../../core/client';

const NextRoundButton = ({ roomId, playerUuid }: { roomId: string; playerUuid: string }) => {
  const { t } = useTranslation('room');

  const nextRound = () => {
    send(roomId, { action: 'PLAY', actionType: 'NEXT_ROUND' }, { player: { uuid: playerUuid } });
  };

  return (
    <Button color='green' onClick={nextRound}>
      {t('nextRound')}
    </Button>
  );
};

export default NextRoundButton;
