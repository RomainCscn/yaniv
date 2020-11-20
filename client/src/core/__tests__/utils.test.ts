import {
  findCardIndex,
  getCardUniqueIndex,
  getCardImagePath,
  getSortedOtherPlayers,
} from '../utils';
import { Card, Player } from '../../types';

const cardH1: Card = { suit: 'heart', value: 1 };
const cardH2: Card = { suit: 'heart', value: 2 };
const cardC1: Card = { suit: 'club', value: 1 };
const cardS1: Card = { suit: 'spade', value: 1 };
const cardS2: Card = { suit: 'spade', value: 2 };
const cardJ1: Card = { suit: 'joker', value: 1 };

it('findCardIndex', () => {
  expect(findCardIndex(cardH1, [cardH1, cardH2, cardC1, cardS1])).toBe(0);
  expect(findCardIndex(cardH2, [cardH1, cardH2, cardC1, cardS1])).toBe(1);
  expect(findCardIndex(cardS1, [cardH1, cardH2, cardC1, cardS1])).toBe(3);
});

it('getCardUniqueIndex', () => {
  expect(getCardUniqueIndex(cardH1)).toEqual('1-heart');
  expect(getCardUniqueIndex(cardS1)).toEqual('1-spade');
});

it('getCardImagePath', () => {
  expect(getCardImagePath(cardH1)).toEqual('cards/HEART-1.svg');
  expect(getCardImagePath(cardS2)).toEqual('cards/SPADE-2.svg');
  expect(getCardImagePath(cardJ1)).toEqual('cards/JOKER-0.svg');
});

it('should return sorted other players', () => {
  const players = [{ uuid: '123' }, { uuid: '456' }, { uuid: '789' }];

  expect(getSortedOtherPlayers(players as Player[], '123')).toEqual([
    { uuid: '456' },
    { uuid: '789' },
  ]);
  expect(getSortedOtherPlayers(players as Player[], '789')).toEqual([
    { uuid: '123' },
    { uuid: '456' },
  ]);

  expect(getSortedOtherPlayers(players as Player[], '456')).toEqual([
    { uuid: '789' },
    { uuid: '123' },
  ]);
});
