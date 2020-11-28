import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { AvatarContainer, Container, WinnerUsername } from '../styles';
import PlayAgainButton from '../../PlayAgainButton';
import Avatar from '../../../shared/Avatar/AvatarImage';
import trophy from '../../../../assets/icons/winner-trophy.png';
import { Player } from '../../../../types';

interface Props {
  gameWinner: Player;
  roomId: string;
  playerUuid: string;
}

const EndGameText = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1em;
`;

const Image = styled.img`
  margin-bottom: 2em;
  width: 96px;

  @media screen and (max-height: 850px) {
    width: 72px;
  }
`;

const RoundWinnerText = styled(WinnerUsername)`
  font-weight: initial;
`;

const PlayerWonText = styled(WinnerUsername)`
  margin-bottom: 1em;
`;

const GameOver = ({ gameWinner, roomId, playerUuid }: Props) => {
  const { t } = useTranslation('room');

  return (
    <Container>
      <EndGameText>{t('end.gameOver')}</EndGameText>
      {gameWinner.uuid === playerUuid && <Image src={trophy} alt='trophy' />}
      {gameWinner.uuid === playerUuid ? (
        <PlayerWonText>{t('end.playerWon')}</PlayerWonText>
      ) : (
        <AvatarContainer>
          <Avatar id={gameWinner.avatar} />
          <div>
            <WinnerUsername>{gameWinner.username}</WinnerUsername>
            <RoundWinnerText> {t('end.gameWinner')}</RoundWinnerText>
          </div>
        </AvatarContainer>
      )}
      <PlayAgainButton roomId={roomId} playerUuid={playerUuid} />
    </Container>
  );
};

export default GameOver;
