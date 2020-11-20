import { Card, Player } from '../types';
import { moveElement } from '../utils';

const findCardIndex = (card: Card, cards: Card[]) =>
  cards.findIndex((c: Card) => card.value === c.value && card.suit === c.suit);

const getCardUniqueIndex = (card: Card) => `${card.value}-${card.suit}`;

const getCardImagePath = (card: Card) =>
  `${process.env.PUBLIC_URL}cards/${card.suit.toUpperCase()}-${
    card.suit === 'joker' ? 0 : card.value
  }.svg`;

const getSortedOtherPlayers = (players: Player[], playerUuid: string) => {
  let otherPlayers = [...players];
  const playerIndex = otherPlayers.findIndex((player) => player.uuid === playerUuid);
  const isExtremity = playerIndex === 0 || playerIndex === otherPlayers.length - 1;

  if (!isExtremity) {
    let startIndex = 0;
    let currentIndex = playerIndex + 1;

    while (currentIndex <= otherPlayers.length - 1) {
      moveElement(otherPlayers, currentIndex, startIndex);
      startIndex++;
      currentIndex++;
    }
  }

  return otherPlayers.filter((player) => player.uuid !== playerUuid);
};

export { findCardIndex, getCardUniqueIndex, getCardImagePath, getSortedOtherPlayers };
