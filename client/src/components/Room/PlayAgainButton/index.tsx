import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../shared/Button';
import { send } from '../../../core/client';

interface PlayAgainButtonProps {
  roomId: string;
  playerUuid: string;
}

const PlayAgainButton = ({ roomId, playerUuid }: PlayAgainButtonProps) => {
  const { t } = useTranslation('room');

  return (
    <Button
      color='green'
      onClick={() =>
        send(roomId, { action: 'PLAY', actionType: 'PLAY_AGAIN' }, { player: { uuid: playerUuid } })
      }
    >
      {t('playAgain')}
    </Button>
  );
};

export default PlayAgainButton;
