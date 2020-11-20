import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { AvatarContainer, WinnerText, WinnerUsername } from '../styles';
import PlayAgainButton from '../../PlayAgainButton';
import Avatar from '../../../shared/Avatar/AvatarImage';
import trophy from '../../../../assets/icons/winner-trophy.png';
import { Player } from '../../../../types';

interface Props {
  gameWinner: Player;
  roomId: string;
  playerUuid: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EndGameText = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const Image = styled.img`
  margin-bottom: 24px;
  width: 96px;
`;

const GameOver = ({ gameWinner, roomId, playerUuid }: Props) => {
  const { t } = useTranslation('room');

  return (
    <Container>
      <EndGameText>{t('end.gameOver')}</EndGameText>
      {gameWinner.uuid === playerUuid && <Image src={trophy} alt='trophy' />}
      <AvatarContainer>
        <WinnerText>{t('end.congrats')}</WinnerText>
        <Avatar id={gameWinner.avatar} />
        <WinnerUsername>{gameWinner.username}</WinnerUsername>
      </AvatarContainer>
      <PlayAgainButton roomId={roomId} playerUuid={playerUuid} />
    </Container>
  );
};

export default GameOver;
