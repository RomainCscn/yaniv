import { findRoom } from '../utils';

const mockRooms = jest.fn();

jest.mock('../core/rooms', () => ({
  __esModule: true,
  get default() {
    return mockRooms();
  },
}));

it('should return a room from a session uuid', () => {
  mockRooms.mockReturnValue({
    abc: { players: { '1': { sessionUuid: '1' } } },
    def: { players: { '2': { sessionUuid: '2' } } },
  });

  expect(findRoom('1')).toEqual({ players: { '1': { sessionUuid: '1' } } });
  expect(findRoom('2')).toEqual({ players: { '2': { sessionUuid: '2' } } });
  expect(findRoom('3')).toEqual(null);
});
