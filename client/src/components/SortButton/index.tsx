import React from 'react';

import { send } from '../../core/client';
import { SortOrder } from '../../types';

import styles from './styles.module.css';

interface Props {
  roomId: string;
  sortOrder?: SortOrder;
}

const SortButton = ({ roomId, sortOrder: userSortOrder }: Props) => (
  <button
    className={styles.button}
    onClick={() =>
      send(roomId, { action: 'UPDATE' }, { sortOrder: userSortOrder === 'asc' ? 'desc' : 'asc' })
    }
  >
    Changer l'ordre
  </button>
);

export default SortButton;
