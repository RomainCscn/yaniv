import React from 'react';

import AvatarList from './AvatarList';
import { ButtonContainer, Container, Label, SectionTitle } from '../styles';
import Button from '../../shared/Button';
import Input from '../../shared/Input';
import { send } from '../../../core/client';
import { Player } from '../../../types';

interface Props {
  player: Player;
  roomId: string;
  setPlayer: (p: Player) => void;
}

const Profile = ({ roomId, player, setPlayer }: Props) => {
  const updatePlayerInformation = () => {
    send(roomId, { action: 'UPDATE' }, { player });
  };

  const setUsername = (e: any) => setPlayer({ ...player, username: e.target.value });
  const setAvatar = (avatar: string) => setPlayer({ ...player, avatar });

  return (
    <Container color='indigo'>
      <SectionTitle color='indigo'>Modifier votre profil</SectionTitle>
      <div style={{ marginBottom: '24px' }}>
        <Label>Nom</Label>
        <Input value={player.username} onChange={setUsername} />
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
