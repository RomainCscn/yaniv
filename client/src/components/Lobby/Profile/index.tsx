import React from 'react';
import styled from 'styled-components';

import { ButtonContainer, Container, Label, SectionTitle } from '../styles';
import AvatarList from '../../Avatar/AvatarList';
import Button from '../../shared/Button';
import { send } from '../../../core/client';
import { Player } from '../../../types';

interface Props {
  player: Player;
  roomId: string;
  setPlayer: (p: Player) => void;
}

const UsernameInput = styled.input`
  font-size: 16px;
  padding: 12px;
  border-radius: 6px;
  appearance: none;
  background-color: #ebf4ff;
  border-width: 2px;
  border-color: #ebf4ff;
  border-style: solid;
  line-height: 1.25;
  box-shadow: none;
  outline: none;
  &:focus {
    border-color: #7f9cf5;
  }
`;

const Profile = ({ roomId, player, setPlayer }: Props) => {
  const updatePlayerInformation = () => {
    send(roomId, { action: 'UPDATE' }, { avatar: player.avatar, username: player.username });
  };

  const setUsername = (e: any) => setPlayer({ ...player, username: e.target.value });
  const setAvatar = (avatar: string) => setPlayer({ ...player, avatar });

  return (
    <Container color='indigo'>
      <SectionTitle color='indigo'>Modifier votre profil</SectionTitle>
      <div style={{ marginBottom: '24px' }}>
        <Label>Nom</Label>
        <UsernameInput value={player.username} onChange={setUsername} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <AvatarList selectedAvatar={player.avatar} setAvatar={setAvatar} />
      </div>
      <ButtonContainer>
        <Button color={'purple'} onClick={updatePlayerInformation}>
          Mettre à jour
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default Profile;
