import { Room } from './room';
import { Card } from '../types';

export const findCardIndex = (cards: Card[], card: Card): number =>
  cards.findIndex((handCard: Card) => handCard.value == card.value && handCard.suit === card.suit);

export const findRoom = (rooms: Record<string, Room>, sessionUuid: string): Room | null => {
  for (const [, room] of Object.entries(rooms)) {
    if (room.getPlayers().find((player) => player.sessionUuid === sessionUuid)) {
      return room;
    }
  }

  return null;
};
