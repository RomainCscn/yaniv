import React from 'react';
import styled, { css } from 'styled-components';

import AVATARS from '../index';

const Image = styled.img<{ canClick: boolean; selected?: boolean; small?: boolean }>`
  padding: 6px;
  width: 50px;

  ${({ canClick }) =>
    canClick &&
    css`
      cursor: pointer;
    `}

  ${({ small }) =>
    small &&
    css`
      width: 36px;
    `}

  ${({ selected }) =>
    selected &&
    css`
      border-bottom: 3px solid #667eea;
    `}
`;

interface Props {
  className?: any;
  id: string;
  isSelected?: boolean;
  isSmall?: boolean;
  setAvatar?: (id: string) => void;
}

const Avatar = ({ className, id, isSelected, isSmall, setAvatar }: Props) => (
  <Image
    canClick={typeof setAvatar === 'function'}
    className={className}
    selected={isSelected}
    small={isSmall}
    alt='avatar'
    onClick={setAvatar ? () => setAvatar(id) : undefined}
    src={AVATARS.find((a) => a[0] === id)![1]}
  />
);

export default Avatar;
