import React from 'react';
import classnames from 'classnames';

import AvatarList from '../../Avatar/AvatarList';
import Button from '../../shared/Button';
import { send } from '../../../core/client';
import { Player } from '../../../types';

import styles from '../styles.module.css';

interface Props {
  player: Player;
  roomId: string;
  setPlayer: (p: Player) => void;
}

const Profile = ({ roomId, player, setPlayer }: Props) => {
  const updatePlayerInformation = () => {
    send(roomId, { action: 'UPDATE' }, { avatar: player.avatar, username: player.username });
  };

  const setUsername = (e: any) => setPlayer({ ...player, username: e.target.value });
  const setAvatar = (avatar: string) => setPlayer({ ...player, avatar });

  return (
    <div className={styles.userProfileContainer}>
      <h2 className={classnames(styles.sectionTitle, styles.indigo)}>Modifier votre profil</h2>
      <div style={{ marginBottom: '24px' }}>
        <label className={styles.label}>Nom</label>
        <input className={styles.usernameInput} value={player.username} onChange={setUsername} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <AvatarList selectedAvatar={player.avatar} setAvatar={setAvatar} />
      </div>
      <div className={styles.buttonContainer}>
        <Button color={'purple'} onClick={updatePlayerInformation}>
          Mettre à jour
        </Button>
      </div>
    </div>
  );
};

export default Profile;
