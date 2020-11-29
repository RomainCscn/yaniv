import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import Score from './ScoreDashboard';
import Sort from './Sort';
import Modal from '../../shared/Modal';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';
import { PlayerScore, Sort as SortType } from '../../../types';

const Container = styled.div`
  position: absolute;
  height: calc(100vh);
  min-width: 300px;
  background-color: #2a3649;
  color: white;
  z-index: 10;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow: auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8em;
  background-color: #18243d;
  position: relative;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 0;
  font-family: 'Alloy';
  font-weight: normal;
`;

const CloseButton = styled.div`
  width: 2rem;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  padding: 0.8em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 5em);
`;

const MenuButton = styled.button`
  position: absolute;
  top: 1em;
  left: 1em;
  display: inline-block;
  padding: 0.8em;
  font-size: 1rem;
  font-weight: bold;
  border: 1px solid #2c5282;
  border-radius: 0.8em;
  background-color: white;
  color: #2c5282;
  cursor: pointer;
  z-index: 10;
`;

const QuitButton = styled.button`
  margin: 3em 0 0.8em;
  padding: 0.8em;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 0.8em;
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
  margin: 3rem 0 0.8em;
`;

interface Props {
  backToLobby: () => void;
  playerSort: SortType;
  playerUuid: string;
  roomId: string;
  scores: PlayerScore[];
  setShowModal: (b: boolean) => void;
}

const Menu = ({ backToLobby, playerSort, playerUuid, roomId, scores, setShowModal }: Props) => {
  const { t } = useTranslation('room');

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
            <div>
              <ScoreTitle>Scores</ScoreTitle>
              <Score scores={scores} />
            </div>
            <div>
              <Sort playerSort={playerSort} playerUuid={playerUuid} roomId={roomId} />
              <QuitButton onClick={showModal}>{t('menu.quit')}</QuitButton>
            </div>
          </ContentContainer>
        </Container>
      )}
      {showQuitModal && (
        <Modal
          title={t('menu.modal.title')}
          content={t('menu.modal.content')}
          color='orange'
          primaryAction={backToLobby}
          primaryButtonText={t('menu.modal.quitButton')}
          secondaryAction={hideModal}
          secondaryButtonText={t('menu.modal.cancelButton')}
        />
      )}
    </>
  );
};

export default Menu;
