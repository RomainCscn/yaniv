import * as WebSocket from 'ws';

import { handleWebSocketClosed } from '../network';
import { Room } from '../room';
import rooms from '../rooms';
import { findRoom } from '../../utils';
import { CustomWebSocket, Player } from '../../types';

const mockRooms = jest.fn();

jest.mock('../dispatcher.ts');
jest.mock('../../utils');
jest.mock('../rooms', () => ({
  __esModule: true,
  get default() {
    return mockRooms();
  },
}));

describe('network', () => {
  it.only('should delete the room if there is no player connected', () => {
    const players = {
      '1': { ws: { readyState: WebSocket.CLOSED } },
      '2': { ws: { readyState: WebSocket.CLOSED } },
      '3': { ws: { readyState: WebSocket.CLOSED } },
    };

    mockRooms.mockReturnValue({
      abc: { roomId: 'abc', players },
      def: { roomId: 'def', players: { '4': { ws: { readyState: WebSocket.OPEN } } } },
    });

    (findRoom as jest.Mock).mockReturnValue({ roomId: 'abc', players });

    handleWebSocketClosed('1');

    expect(rooms).toEqual({
      def: {
        players: {
          '4': { ws: { readyState: WebSocket.OPEN } },
        },
        roomId: 'def',
      },
    });
  });

  it('should not delete the room if there is at least one player connected', () => {
    const room = new Room('a');
    room.addPlayer(<Player>{ uuid: '4' }, <CustomWebSocket>{ readyState: WebSocket.OPEN });
    room.addPlayer(<Player>{ uuid: '5' }, <CustomWebSocket>{ readyState: WebSocket.CLOSED });

    mockRooms.mockReturnValue({ def: room });

    (findRoom as jest.Mock).mockReturnValue(room);

    handleWebSocketClosed('4');

    expect(rooms).toEqual({ def: room });
  });

  it('should do nothing if the room is not find', () => {
    mockRooms.mockReturnValue({
      def: { players: { '4': { ws: { readyState: WebSocket.OPEN } } } },
    });

    (findRoom as jest.Mock).mockReturnValue(null);

    handleWebSocketClosed('1');

    expect(rooms).toEqual({ def: { players: { '4': { ws: { readyState: WebSocket.OPEN } } } } });
  });
});
