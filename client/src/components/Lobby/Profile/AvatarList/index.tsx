import React from 'react';
import styled from 'styled-components';

import Avatar from '../../../shared/Avatar/AvatarImage';
import AVATARS from '../../../shared/Avatar/index';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

interface Props {
  selectedAvatar: string;
  setAvatar: (a: string) => void;
}

const AvatarList = ({ selectedAvatar, setAvatar }: Props) => {
  return (
    <Container>
      {AVATARS.map((avatar) => (
        <Avatar
          key={avatar[0]}
          id={avatar[0]}
          isSelected={selectedAvatar === avatar[0]}
          setAvatar={setAvatar}
        />
      ))}
    </Container>
  );
};

export default AvatarList;
