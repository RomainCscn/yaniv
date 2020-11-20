import React from 'react';
import { useTranslation } from 'react-i18next';

import Modal from '../../shared/Modal';

const QuitModal = ({ backToLobby }: { backToLobby: () => void }) => {
  const { t } = useTranslation('room');

  return (
    <Modal
      title={t('quitModal.title')}
      content={t('quitModal.content')}
      color='orange'
      primaryAction={backToLobby}
      primaryButtonText={t('quitModal.button')}
    />
  );
};

export default QuitModal;
