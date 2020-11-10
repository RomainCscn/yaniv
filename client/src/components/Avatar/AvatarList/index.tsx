import React from 'react';

import Avatar from '../AvatarImage';
import AVATARS from '../index';

interface Props {
  selectedAvatar: string;
  setAvatar: (a: string) => void;
}

const AvatarList = ({ selectedAvatar, setAvatar }: Props) => {
  return (
    <div>
      {AVATARS.map((avatar) => (
        <Avatar
          key={avatar[0]}
          id={avatar[0]}
          isSelected={selectedAvatar === avatar[0]}
          setAvatar={setAvatar}
        />
      ))}
    </div>
  );
};

export default AvatarList;
