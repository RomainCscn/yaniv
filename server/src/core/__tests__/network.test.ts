import * as WebSocket from 'ws';

import { handleWebSocketClosed } from '../network';
import { Player } from '../player';
import { Room } from '../room';
import rooms from '../rooms';
import { findRoom } from '../helpers';
import { CustomWebSocket } from '../../types';

const mockRooms = jest.fn();

jest.mock('../helpers');
jest.mock('../rooms', () => ({
  __esModule: true,
  get default() {
    return mockRooms();
  },
}));

describe('network', () => {
  let room1: Room;
  let room2: Room;

  beforeEach(() => {
    room1 = new Room('room1');
    room2 = new Room('room2');
    room1.addPlayer(
      {
        avatar: 'hippo',
        sessionUuid: 'session123',
        sort: { order: 'asc', type: 'suit' },
        username: 'Romain',
        uuid: '123',
      },
      <CustomWebSocket>({ readyState: WebSocket.CLOSED, send: () => null } as unknown),
    );
    room1.addPlayer(
      {
        avatar: 'hippo',
        sessionUuid: 'session456',
        sort: { order: 'asc', type: 'suit' },
        username: 'Romain',
        uuid: '456',
      },
      <CustomWebSocket>({ readyState: WebSocket.CLOSED, send: () => null } as unknown),
    );

    room2.addPlayer(
      {
        avatar: 'cat',
        sessionUuid: 'session789',
        sort: { order: 'asc', type: 'suit' },
        username: 'Juliette',
        uuid: '456',
      },
      { readyState: WebSocket.OPEN } as CustomWebSocket,
    );

    mockRooms.mockReturnValue({ room1, room2 });
  });
  it('should delete the room if there is no player connected', () => {
    (findRoom as jest.Mock).mockReturnValue(room1);

    handleWebSocketClosed('session123');

    expect(Object.keys(rooms)).toEqual(['room2']);
  });

  it('should not delete the room if there is at least one player connected', () => {
    room1.addPlayer(
      <Player>{ sessionUuid: '4', uuid: '4' },
      <CustomWebSocket>({ readyState: WebSocket.OPEN, send: () => null } as unknown),
    );

    const dispatchSpy = jest.spyOn(room1, 'dispatch');
    (findRoom as jest.Mock).mockReturnValue(room1);

    handleWebSocketClosed('4');

    expect(Object.keys(rooms)).toEqual(['room1', 'room2']);
    expect(dispatchSpy).toBeCalledTimes(1);
  });

  it('should not delete the room if there is at least one player connected but player is not found', () => {
    room1.players['123'].ws = <CustomWebSocket>(
      ({ readyState: WebSocket.OPEN, send: () => null } as unknown)
    );

    const dispatchSpy = jest.spyOn(room1, 'dispatch');
    (findRoom as jest.Mock).mockReturnValue(room1);

    handleWebSocketClosed('4');

    expect(Object.keys(rooms)).toEqual(['room1', 'room2']);
    expect(dispatchSpy).toBeCalledTimes(0);
  });

  it('should do nothing if the room is not find', () => {
    (findRoom as jest.Mock).mockReturnValue(null);

    handleWebSocketClosed('1');

    expect(Object.keys(rooms)).toEqual(['room1', 'room2']);
  });
});
