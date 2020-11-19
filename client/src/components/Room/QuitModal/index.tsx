import React from 'react';

import Modal from '../../shared/Modal';

const QuitModal = ({ backToLobby }: { backToLobby: () => void }) => (
  <Modal
    title='Un joueur a quitté la partie !'
    content="Merci d'attendre que le joueur se reconnecte pour reprendre la partie ou retourner au salon
          pour rejouer."
    color='orange'
    primaryAction={backToLobby}
    primaryButtonText='Retour au salon'
  />
);

export default QuitModal;
