import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { AvatarContainer, WinnerText as DefaultWinnerText, WinnerUsername } from '../styles';
import Avatar from '../../../shared/Avatar/AvatarImage';
import NextRoundButton from '../../NextRoundButton';
import { Player } from '../../../../types';

interface Props {
  roundWinner: Player;
  roomId: string;
  playerUuid: string;
  yanivCaller?: Player;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const WinnerText = styled(DefaultWinnerText)`
  margin-bottom: 24px;
`;

const RoundOver = ({ roundWinner, roomId, playerUuid, yanivCaller }: Props) => {
  const { t } = useTranslation('room');

  return (
    <Container>
      <WinnerText>{roundWinner.uuid === playerUuid ? t('end.win') : t('end.lose')}</WinnerText>

      {roundWinner.uuid !== playerUuid && (
        <AvatarContainer>
          <div>{t('end.roundWinner')}</div>
          <Avatar id={roundWinner.avatar} />
          <WinnerUsername>{roundWinner.username}</WinnerUsername>
        </AvatarContainer>
      )}
      <NextRoundButton roomId={roomId} playerUuid={playerUuid} />
    </Container>
  );
};

export default RoundOver;
