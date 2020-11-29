import React from 'react';
import styled, { css } from 'styled-components';

import DefaultButton from '../../shared/Button';
import { MAX_VALUE_TO_SUBMIT } from '../../../constants';
import { send } from '../../../core/client';
import { getCardValue } from '../../../core/game';
import { Card, Player } from '../../../types';

interface YanivButtonProps {
  canClick: boolean;
  hand: Card[];
  player: Player;
  roomId: string;
}

const Button = styled(DefaultButton)<{ canClick: boolean }>`
  font-size: 1.5rem;
  height: 48px;

  @media screen and (max-height: 850px) {
    font-size: 16px;
    height: 42px;
  }

  ${({ canClick }) =>
    canClick
      ? css`
          cursor: pointer;
          opacity: 1;
        `
      : css`
          opacity: 0.6;
          cursor: not-allowed;
        `}
`;

const canSubmitYaniv = (hand: Card[], canClick: boolean): boolean => {
  const handSum = hand.reduce((sum: number, card) => {
    return sum + getCardValue(card);
  }, 0);

  return canClick && handSum <= MAX_VALUE_TO_SUBMIT;
};

const YanivButton = ({ hand, canClick, roomId, player }: YanivButtonProps) => {
  const canSubmit = canSubmitYaniv(hand, canClick);

  const submit = () => send(roomId, { action: 'PLAY', actionType: 'YANIV' }, { player });

  return (
    <Button color='green' canClick={canSubmit} onClick={canSubmit ? submit : undefined}>
      YANIV
    </Button>
  );
};

export default YanivButton;
