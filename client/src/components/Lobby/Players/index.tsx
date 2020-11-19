import React, { useState } from 'react';

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
  const [errorMessage, setErrorMessage] = useState('');

  const startGame = () => {
    if (players.length >= 2) {
      send(roomId, { action: 'START' });
    } else {
      setErrorMessage('Un seul joueur dans le salon ! Au moins deux joueurs requis pour jouer.');
    }
  };

  return (
    <Container color='green'>
      <SectionTitle color='green'>Joueurs dans le salon</SectionTitle>
      <PlayersAvatarContainer>
        {players.map((player) => (
          <PlayerContainer key={player.uuid}>
            <img
              width={50}
              src={AVATARS.find((avatar) => avatar[0] === player.avatar)![1]}
              alt={player.avatar}
            />
            <PlayerName>
              {player.username} {player.uuid === currentPlayer.uuid && '(vous)'}
            </PlayerName>
          </PlayerContainer>
        ))}
      </PlayersAvatarContainer>
      {error && (
        <p>
          Un ou plusieurs joueurs sont déjà en jeu... Changez de salon ou demandez leur de revenir
          au salon et rafraîchissez la page pour jouer !
        </p>
      )}
      <ButtonContainer>
        <Button color={'green'} onClick={startGame}>
          Commencer la partie
        </Button>
        {errorMessage && players.length < 2 && <Error>{errorMessage}</Error>}
      </ButtonContainer>
    </Container>
  );
};

export default Players;
