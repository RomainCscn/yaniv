import { Room } from '../room';
import { Card, CustomWebSocket } from '../../types';
import { findCardIndex, findRoom } from '../helpers';

it('should return the card index', () => {
  const cards: Card[] = [
    { suit: 'club', value: 1 },
    { suit: 'heart', value: 7 },
    { suit: 'joker', value: 99 },
  ];

  expect(findCardIndex(cards, { suit: 'heart', value: 7 })).toEqual(1);
  expect(findCardIndex(cards, { suit: 'joker', value: 99 })).toEqual(2);
  expect(findCardIndex(cards, { suit: 'diamond', value: 1 })).toEqual(-1);
});

it('should return a room from a session uuid', () => {
  const room1 = new Room('a');
  const room2 = new Room('b');
  room1.addPlayer(
    {
      avatar: 'hippo',
      sessionUuid: 'session123',
      sort: { order: 'asc', type: 'suit' },
      username: 'Romain',
      uuid: '123',
    },
    {} as CustomWebSocket,
  );
  room2.addPlayer(
    {
      avatar: 'cat',
      sessionUuid: 'session456',
      sort: { order: 'asc', type: 'suit' },
      username: 'Juliette',
      uuid: '456',
    },
    {} as CustomWebSocket,
  );

  expect(findRoom({ room1, room2 }, 'session123')).toHaveProperty('roomId', 'a');
  expect(findRoom({ room1, room2 }, 'session456')).toHaveProperty('roomId', 'b');
  expect(findRoom({ room1, room2 }, '3')).toEqual(null);
});
