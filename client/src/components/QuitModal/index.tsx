import React from 'react';
import styled from 'styled-components';

import Button from '../shared/Button';

const Container = styled.div`
  position: absolute;
  max-width: 500px;
  padding: 36px;
  background-color: rgba(254, 235, 200, 0.9);
  z-index: 99;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  color: #7b341e;
  margin-bottom: 64px;
  font-size: 32px;
`;

const Text = styled.p`
  margin-bottom: 64px;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
`;

const QuitModal = ({ backToLobby }: { backToLobby: () => void }) => (
  <Container>
    <Title>Un joueur a quitté la partie !</Title>
    <Text>
      Merci d'attendre que le joueur se reconnecte pour reprendre la partie ou retourner au salon
      pour rejouer.
    </Text>
    <Button color='orange' onClick={backToLobby}>
      Retour au salon
    </Button>
  </Container>
);

export default QuitModal;
