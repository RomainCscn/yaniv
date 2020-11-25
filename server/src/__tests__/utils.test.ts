import { Room } from '../core/room';
import { CustomWebSocket } from '../types';
import { findRoom } from '../utils';

const mockRooms = jest.fn();

jest.mock('../core/rooms', () => ({
  __esModule: true,
  get default() {
    return mockRooms();
  },
}));

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
  mockRooms.mockReturnValue({ room1, room2 });

  expect(findRoom('session123')).toHaveProperty('roomId', 'a');
  expect(findRoom('session456')).toHaveProperty('roomId', 'b');
  expect(findRoom('3')).toEqual(null);
});
