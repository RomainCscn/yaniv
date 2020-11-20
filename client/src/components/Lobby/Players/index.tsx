import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Error, PlayersAvatarContainer, PlayerContainer, PlayerName } from './styles';
import { ButtonContainer, Container, SectionTitle } from '../styles';
import AVATARS from '../../shared/Avatar';
import Button from '../../shared/Button';
import { send } from '../../../core/client';
import { CustomError, Player } from '../../../types';

interface Props {
  error?: CustomError;
  players: Player[];
  roomId: string;
  currentPlayer: Player;
}

const Players = ({ error, players, roomId, currentPlayer }: Props) => {
  const { t } = useTranslation('lobby');
  const [errorMessage, setErrorMessage] = useState('');

  const startGame = () => {
    if (players.length >= 2) {
      send(roomId, { action: 'START' });
    } else {
      setErrorMessage(t('players.onePlayer'));
    }
  };

  return (
    <Container color='green'>
      <SectionTitle color='green'>{t('players.title')}</SectionTitle>
      <PlayersAvatarContainer>
        {players.map((player) => (
          <PlayerContainer key={player.uuid}>
            <img
              width={50}
              src={AVATARS.find((avatar) => avatar[0] === player.avatar)![1]}
              alt={player.avatar}
            />
            <PlayerName>
              {player.username} {player.uuid === currentPlayer.uuid && t('players.you')}
            </PlayerName>
          </PlayerContainer>
        ))}
      </PlayersAvatarContainer>
      {error && <p>{t('players.inGame')}</p>}
      <ButtonContainer>
        <Button color={'green'} onClick={startGame}>
          {t('players.start')}
        </Button>
        {errorMessage && players.length < 2 && <Error>{errorMessage}</Error>}
      </ButtonContainer>
    </Container>
  );
};

export default Players;
