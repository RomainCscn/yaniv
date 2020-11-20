import React from 'react';
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

const YanivCallerContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RoundOver = ({ roundWinner, roomId, playerUuid, yanivCaller }: Props) => (
  <Container>
    <WinnerText>{roundWinner.uuid === playerUuid ? 'GAGNÉ 🥳' : 'PERDU !'}</WinnerText>
    {yanivCaller && yanivCaller?.uuid !== playerUuid && (
      <YanivCallerContainer>
        <Avatar id={yanivCaller.avatar} />
        {yanivCaller?.username} a annoncé Yaniv !
      </YanivCallerContainer>
    )}
    {roundWinner.uuid !== playerUuid && (
      <AvatarContainer>
        <div>Gagnant de la manche</div>
        <Avatar id={roundWinner.avatar} />
        <WinnerUsername>{roundWinner.username}</WinnerUsername>
      </AvatarContainer>
    )}
    <NextRoundButton roomId={roomId} playerUuid={playerUuid} />
  </Container>
);

export default RoundOver;
