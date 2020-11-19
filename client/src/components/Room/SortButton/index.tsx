import React from 'react';
import styled from 'styled-components';

import DefaultButton from '../../shared/Button';
import { send } from '../../../core/client';
import { SortOrder } from '../../../types';

interface Props {
  roomId: string;
  sortOrder?: SortOrder;
}

const Button = styled(DefaultButton)`
  margin-top: 24px;
  font-size: 16px;
  height: 48px;
  background-color: #f7fafc;
  border: 1px solid #4a5568;
  border-bottom: 4px solid #4a5568;
  color: #4a5568;
  &:active {
    transform: translateY(3px);
    border-bottom: 1px solid #4a5568;
  }

  @media screen and (max-height: 850px) {
    font-size: 14px;
    height: 36px;
  }
`;

const SortButton = ({ roomId, sortOrder: userSortOrder }: Props) => (
  <Button
    onClick={() =>
      send(roomId, { action: 'UPDATE' }, { sortOrder: userSortOrder === 'asc' ? 'desc' : 'asc' })
    }
  >
    Changer l'ordre
  </Button>
);

export default SortButton;
