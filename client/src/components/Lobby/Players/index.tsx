import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Error, PlayersAvatarContainer, PlayerContainer, PlayerName } from './styles';
import { ButtonContainer, Container, SectionTitle } from '../styles';
import Avatar from '../../shared/Avatar/AvatarImage';
import Button from '../../shared/Button';
import { send } from '../../../core/client';
import { Player } from '../../../types';

interface Props {
  error?: string;
  players: Player[];
  roomId: string;
  currentPlayer: Player;
}

const Players = ({ error, players, roomId, currentPlayer }: Props) => {
  const { t } = useTranslation('lobby');
  const [errorMessage, setErrorMessage] = useState();

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
        {players.map((player, index) => (
          <PlayerContainer data-cy={`player-${index}`} key={player.uuid}>
            <Avatar dataCy={`player-avatar-${player.avatar}`} id={player.avatar} />
            <PlayerName>
              {player.username} {player.uuid === currentPlayer.uuid && t('players.you')}
            </PlayerName>
          </PlayerContainer>
        ))}
      </PlayersAvatarContainer>
      {error && t('players.inGame')}
      <ButtonContainer>
        <Button data-cy='startButton' color={'green'} onClick={startGame}>
          {t('players.start')}
        </Button>
        {errorMessage && players.length < 2 && <Error>{errorMessage}</Error>}
      </ButtonContainer>
    </Container>
  );
};

export default Players;
