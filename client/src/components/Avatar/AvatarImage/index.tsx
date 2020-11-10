import React from 'react';
import classnames from 'classnames';

import AVATARS from '../index';

import styles from './styles.module.css';

interface Props {
  id: string;
  isSelected?: boolean;
  setAvatar?: (id: string) => void;
}

const Avatar = ({ id, isSelected, setAvatar }: Props) => {
  return (
    <img
      className={classnames(styles.avatar, { [styles.selected]: isSelected })}
      width={50}
      onClick={setAvatar ? () => setAvatar(id) : undefined}
      src={AVATARS.find((a) => a[0] === id)![1]}
      alt='avatar-cat'
    />
  );
};

export default Avatar;
