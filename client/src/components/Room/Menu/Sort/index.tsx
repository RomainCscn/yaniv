import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import SortItem from './SortItem';
import { send } from '../../../../core/client';
import { Sort as PlayerSort, SortOrder, SortType } from '../../../../types';

const Container = styled.div`
  font-family: 'Roboto', sans-serif;
`;

const Title = styled.h2`
  font-family: 'Kurri';
  margin-top: 2em;
  margin-bottom: 0.8em;
`;

const Subtitle = styled.div`
  margin: 1em 0 0.8em;
  font-size: 1.2rem;
`;

const SortItems = styled.form`
  display: flex;
  flex-direction: column;
`;

const ORDER: SortOrder[] = ['asc', 'desc'];
const TYPE: SortType[] = ['rank', 'suit'];

interface Props {
  playerSort: PlayerSort;
  playerUuid: string;
  roomId: string;
}

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
        {ORDER.map((value) => (
          <SortItem
            key={value}
            isChecked={order === value}
            label={t(`menu.sort.${value}`)}
            setValue={setOrder}
            value={value}
          />
        ))}
        <Subtitle>{t('menu.sort.type')}</Subtitle>
        {TYPE.map((value) => (
          <SortItem
            key={value}
            isChecked={type === value}
            label={t(`menu.sort.${value}`)}
            setValue={setType}
            value={value}
          />
        ))}
      </SortItems>
    </Container>
  );
};

export default Sort;
