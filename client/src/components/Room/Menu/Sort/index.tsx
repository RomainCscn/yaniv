import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { send } from '../../../../core/client';
import { SortOrder, SortType } from '../../../../types';

interface Props {
  playerSort: {
    order: SortOrder;
    type: SortType;
  };
  playerUuid: string;
  roomId: string;
}

const Container = styled.div`
  font-family: 'Roboto', sans-serif;
`;

const Title = styled.h2`
  font-family: 'Kurri';
  margin-top: 32px;
  margin-bottom: 12px;
`;

const Subtitle = styled.div`
  margin: 16px 0 12px;
  font-size: 20px;
`;

const SortItems = styled.form`
  display: flex;
  flex-direction: column;
`;

const SortItem = styled.div`
  margin-bottom: 3px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Sort = ({ playerSort, playerUuid, roomId }: Props) => {
  const { t } = useTranslation('room');

  const [order, setOrder] = useState<SortOrder>(playerSort.order);
  const [type, setType] = useState<SortType>(playerSort.type);

  useEffect(() => {
    send(roomId, { action: 'UPDATE' }, { sort: { order, type }, player: { uuid: playerUuid } });
  }, [playerUuid, roomId, order, type]);

  return (
    <Container>
      <Title>{t('menu.sort.title')}</Title>
      <Subtitle>{t('menu.sort.order')}</Subtitle>
      <SortItems>
        <SortItem>
          <label>
            <input
              type='radio'
              name='order'
              defaultChecked={order === 'asc'}
              onChange={() => setOrder('asc')}
            />
            {t('menu.sort.asc')}
          </label>
        </SortItem>
        <SortItem>
          <label>
            <input
              type='radio'
              name='order'
              defaultChecked={order === 'desc'}
              onChange={() => setOrder('desc')}
            />
            {t('menu.sort.desc')}
          </label>
        </SortItem>
      </SortItems>
      <Subtitle>{t('menu.sort.type')}</Subtitle>
      <SortItems>
        <SortItem>
          <label>
            <input
              type='radio'
              name='type'
              defaultChecked={type === 'rank'}
              onChange={() => setType('rank')}
            />
            {t('menu.sort.rankOnly')}
          </label>
        </SortItem>
        <SortItem>
          <label>
            <input
              type='radio'
              name='type'
              defaultChecked={type === 'suit'}
              onChange={() => setType('suit')}
            />
            {t('menu.sort.suitAndRand')}
          </label>
        </SortItem>
      </SortItems>
    </Container>
  );
};

export default Sort;
