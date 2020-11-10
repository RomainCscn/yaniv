import React from 'react';
import classnames from 'classnames';

import styles from './styles.module.css';

interface Props {
  id: string;
  isSelected: boolean;
  setAvatar: (id: string) => void;
  src: string;
}

const Avatar = ({ id, isSelected, src, setAvatar }: Props) => {
  return (
    <img
      className={classnames(styles.avatar, { [styles.selected]: isSelected })}
      width={50}
      onClick={() => setAvatar(id)}
      src={src}
      alt='avatar-cat'
    />
  );
};

export default Avatar;
