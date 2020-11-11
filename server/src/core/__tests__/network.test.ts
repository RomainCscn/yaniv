import * as WebSocket from 'ws';

import { handleWebSocketClosed } from '../network';
import { findRoom } from '../room';
import rooms from '../rooms';

const mockRooms = jest.fn();

jest.mock('../room');
jest.mock('../rooms', () => ({
  __esModule: true,
  get default() {
    return mockRooms();
  },
}));

describe('network', () => {
  it('should delete the room if there is no user connected', () => {
    const users = {
      '1': { ws: { readyState: WebSocket.CLOSED } },
      '2': { ws: { readyState: WebSocket.CLOSED } },
      '3': { ws: { readyState: WebSocket.CLOSED } },
    };

    mockRooms.mockReturnValue({
      abc: { users },
      def: { users: { '4': { ws: { readyState: WebSocket.OPEN } } } },
    });

    (findRoom as jest.Mock).mockReturnValue(['abc', { users }]);

    handleWebSocketClosed('1');

    expect(rooms).toEqual({ def: { users: { '4': { ws: { readyState: WebSocket.OPEN } } } } });
  });

  it('should not delete the room if there is at least one user connected', () => {
    const users = {
      '4': { ws: { readyState: WebSocket.OPEN } },
      '5': { ws: { readyState: WebSocket.CLOSED } },
    };
    mockRooms.mockReturnValue({ def: { users } });

    (findRoom as jest.Mock).mockReturnValue(['abc', { users }]);

    handleWebSocketClosed('4');

    expect(rooms).toEqual({ def: { users } });
  });

  it('should do nothing if the room is not find', () => {
    mockRooms.mockReturnValue({
      def: { users: { '4': { ws: { readyState: WebSocket.OPEN } } } },
    });

    (findRoom as jest.Mock).mockReturnValue([]);

    handleWebSocketClosed('1');

    expect(rooms).toEqual({ def: { users: { '4': { ws: { readyState: WebSocket.OPEN } } } } });
  });
});
