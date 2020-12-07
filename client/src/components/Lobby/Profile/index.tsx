import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import AvatarList from './AvatarList';
import { ButtonContainer, Container, Label, SectionTitle } from '../styles';
import Button from '../../shared/Button';
import Input from '../../shared/Input';
import { send } from '../../../core/client';
import { Player } from '../../../types';

const Field = styled.div`
  margin-bottom: 1.5em;
`;

interface Props {
  player: Player;
  roomId: string;
  setPlayer: (p: Player) => void;
}

const Profile = ({ roomId, player, setPlayer }: Props) => {
  const { t } = useTranslation('lobby');

  const updatePlayerInformation = () => {
    send(roomId, { action: 'UPDATE' }, { player });
  };

  const setUsername = (e: any) => setPlayer({ ...player, username: e.target.value });
  const setAvatar = (avatar: string) => setPlayer({ ...player, avatar });

  return (
    <Container color='indigo'>
      <SectionTitle color='indigo'>{t('profile.title')}</SectionTitle>
      <Field>
        <Label>{t('profile.name')}</Label>
        <Input data-cy='username' value={player.username} onChange={setUsername} />
      </Field>
      <AvatarList selectedAvatar={player.avatar} setAvatar={setAvatar} />
      <ButtonContainer>
        <Button data-cy='updateProfile' color={'purple'} onClick={updatePlayerInformation}>
          {t('update')}
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default Profile;
