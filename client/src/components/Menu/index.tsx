import React, { useState } from 'react';
import styled from 'styled-components';

import Score from '../ScoreDashboard';
import Modal from '../shared/Modal';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { PlayerScore } from '../../types';

const Container = styled.div`
  position: absolute;
  height: calc(100vh);
  min-width: 300px;
  background-color: #2a3649;
  color: white;
  z-index: 10;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  height: 64px;
  background-color: #18243d;
  position: relative;
`;

const Title = styled.h1`
  font-size: 56px;
  margin: 0;
  font-family: 'Alloy';
  font-weight: normal;
`;

const CloseButton = styled.div`
  width: 32px;
  padding: 6px;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  padding: 12px;
`;

const MenuButton = styled.button`
  position: absolute;
  top: 24px;
  left: 24px;
  display: inline-block;
  padding: 12px;
  font-size: 1rem;
  font-weight: bold;
  border: 1px solid #2c5282;
  border-radius: 12px;
  background-color: white;
  color: #2c5282;
  cursor: pointer;
  z-index: 10;
`;

const QuitButton = styled.button`
  position: absolute;
  bottom: 24px;
  padding: 12px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  background-color: white;
  color: #1f2937;
  cursor: pointer;
  z-index: 10;
  font-family: 'Roboto', sans-serif;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &:hover {
    background-color: #e5e7eb;
  }
`;

const ScoreTitle = styled.h2`
  margin: 56px 0 12px;
`;

interface Props {
  backToLobby: () => void;
  scores: PlayerScore[];
  setShowModal: (b: boolean) => void;
}

const Menu = ({ backToLobby, scores, setShowModal }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showQuitModal, setShowQuitModal] = useState(false);

  const showModal = () => {
    setShowModal(true);
    setShowQuitModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
    setShowQuitModal(false);
  };

  return (
    <>
      {!isVisible ? (
        <MenuButton onClick={() => setIsVisible(true)}>Menu</MenuButton>
      ) : (
        <Container>
          <Header>
            <Title>YANIV</Title>
            <CloseButton onClick={() => setIsVisible(false)}>
              <CloseIcon fill='white' />
            </CloseButton>
          </Header>
          <ContentContainer>
            <ScoreTitle>Scores</ScoreTitle>
            <Score scores={scores} />
            <QuitButton onClick={showModal}>QUITTER LA PARTIE</QuitButton>
          </ContentContainer>
        </Container>
      )}
      {showQuitModal && (
        <Modal
          title='Arrêter la partie'
          content='En quittant la partie, vous et les autres joueurs retournerez au salon. Êtes-vous sûr de vouloir quitter ?'
          color='orange'
          primaryAction={backToLobby}
          primaryButtonText='Oui, retour au salon'
          secondaryAction={hideModal}
          secondaryButtonText='Non, retour à la partie'
        />
      )}
    </>
  );
};

export default Menu;
