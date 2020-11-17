import React from 'react';
import styled, { css } from 'styled-components';

import AVATARS from '../index';

interface Props {
  className?: any;
  id: string;
  isSelected?: boolean;
  setAvatar?: (id: string) => void;
}

const Image = styled.img<{ selected?: boolean }>`
  cursor: pointer;
  padding: 6px;
  width: 50px;

  ${({ selected }) =>
    selected &&
    css`
      border-bottom: 3px solid #667eea;
    `}

  @media screen and (max-height: 850px) {
    width: 30px;
  }
`;

const Avatar = ({ className, id, isSelected, setAvatar }: Props) => (
  <Image
    className={className}
    selected={isSelected}
    alt='avatar-cat'
    onClick={setAvatar ? () => setAvatar(id) : undefined}
    src={AVATARS.find((a) => a[0] === id)![1]}
  />
);

export default Avatar;
