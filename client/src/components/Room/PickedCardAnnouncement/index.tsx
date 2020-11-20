import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import GenericCard from '../GenericCard';
import { Card, Player } from '../../../types';

interface Props {
  pickedCard?: Card;
  previousPlayer: Player;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  margin-top: 36px;
`;

const Text = styled.div`
  font-size: 18px;
  margin-right: 12px;
`;

const PickedCardAnnouncement = ({ pickedCard, previousPlayer }: Props) => {
  const { t } = useTranslation('room');

  return (
    <Container>
      <Text>{previousPlayer?.username + t('drew')}</Text>
      <GenericCard canClick={false} card={pickedCard} cardType={'otherPlayer'} />
    </Container>
  );
};

export default PickedCardAnnouncement;
