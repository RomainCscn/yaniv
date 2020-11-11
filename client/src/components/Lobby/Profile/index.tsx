import React from 'react';
import classnames from 'classnames';

import AvatarList from '../../Avatar/AvatarList';
import { send } from '../../../core/client';

import styles from '../styles.module.css';

interface Props {
  roomId: string;
  selectedAvatar: string;
  setAvatar: (s: string) => void;
  setUsername: (s: string) => void;
  username: string;
}

const Profile = ({ roomId, selectedAvatar, setAvatar, setUsername, username }: Props) => {
  const updatePlayerInformation = () => {
    send(roomId, { action: 'UPDATE' }, { avatar: selectedAvatar, username });
  };

  return (
    <div className={styles.userProfileContainer}>
      <h2 className={classnames(styles.sectionTitle, styles.indigo)}>Modifier votre profil</h2>
      <div style={{ marginBottom: '24px' }}>
        <label className={styles.label}>Nom</label>
        <input
          className={styles.usernameInput}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <AvatarList selectedAvatar={selectedAvatar} setAvatar={setAvatar} />
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.updateButton} onClick={updatePlayerInformation}>
          Mettre à jour
        </button>
      </div>
    </div>
  );
};

export default Profile;
