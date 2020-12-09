import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import {
  AvatarContainer,
  Container,
  WinnerText as DefaultWinnerText,
  WinnerUsername,
} from '../styles';
import Avatar from '../../../shared/Avatar/AvatarImage';
import NextRoundButton from '../../NextRoundButton';
import { Player } from '../../../../types';

const WinnerText = styled(DefaultWinnerText)`
  font-size: 2.5rem;
  margin-bottom: 1em;
`;

const RoundWinnerText = styled(WinnerUsername)`
  font-weight: initial;
`;

interface Props {
  roundWinner: Player;
  roomId: string;
  playerUuid: string;
}

const RoundOver = ({ roundWinner, roomId, playerUuid }: Props) => {
  const { t } = useTranslation('room');

  const isWinner = roundWinner.uuid === playerUuid;

  return (
    <Container>
      <WinnerText>{isWinner ? t('end.win') : t('end.lose')}</WinnerText>
      {!isWinner && (
        <AvatarContainer>
          <Avatar id={roundWinner.avatar} />
          <div>
            <WinnerUsername>{roundWinner.username}</WinnerUsername>
            <RoundWinnerText> {t('end.roundWinner')}</RoundWinnerText>
          </div>
        </AvatarContainer>
      )}
      <NextRoundButton roomId={roomId} playerUuid={playerUuid} />
    </Container>
  );
};

export default RoundOver;
