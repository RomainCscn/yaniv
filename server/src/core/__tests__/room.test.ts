/* eslint-disable @typescript-eslint/no-explicit-any */
import { getHand, getSuffledDeck } from '../game';
import initRoom, {
  addPlayer,
  assignHandToPlayer,
  findRoom,
  getPlayerByUuid,
  getFormattedPlayer,
  getFormattedPlayers,
  resetRoom,
} from '../room';
import { CustomWebSocket, Room, Player } from '../../types';

const mockRooms = jest.fn();

jest.mock('../game');
jest.mock('../rooms', () => ({
  __esModule: true,
  get default() {
    return mockRooms();
  },
}));

describe('room', () => {
  let room: any;
  const player = {
    username: 'a',
    avatar: '123',
    hand: [
      { suit: 'club', value: 1 },
      { suit: 'diamond', value: 2 },
    ],
  };
  const deck = [
    { suit: 'club', value: 1 },
    { suit: 'diamond', value: 2 },
    { suit: 'club', value: 2 },
    { suit: 'spade', value: 2 },
  ];

  beforeEach(() => {
    room = {
      deck,
      players: {
        '1': player,
        '2': { ...player, username: 'b' },
      },
    };
  });

  it('should initialize a room', () => {
    (getSuffledDeck as jest.Mock).mockReturnValue(deck);
    const initialRoom = initRoom();

    expect(initialRoom).toEqual({
      thrownCards: [],
      activePlayer: null,
      deck,
      roundWinner: null,
      players: {},
    });
  });

  it('should assign a hand to a given player', () => {
    const player: any = {};
    (getHand as jest.Mock).mockReturnValue([
      { suit: 'club', value: 1 },
      { suit: 'diamond', value: 2 },
    ]);

    assignHandToPlayer(room as Room, player as Player);

    expect(player.hand).toEqual([
      { suit: 'club', value: 1 },
      { suit: 'diamond', value: 2 },
    ]);
  });

  it('should add a player to the room', () => {
    addPlayer(
      '123',
      room,
      { avatar: 'abc', username: 'toto', sessionUuid: '456', uuid: '123' } as Player,
      {} as CustomWebSocket,
    );

    expect(room.players['123']).toEqual({
      avatar: 'abc',
      hand: [],
      score: 0,
      scoreHistory: [],
      username: 'toto',
      sessionUuid: '456',
      uuid: '123',
      ws: {},
    });
  });

  it('should return a room from a player uuid', () => {
    mockRooms.mockReturnValue({
      abc: { players: { '1': {} } },
      def: { players: { '2': {} } },
    });

    expect(findRoom('1')).toEqual(['abc', { players: { '1': {} } }]);
    expect(findRoom('2')).toEqual(['def', { players: { '2': {} } }]);
    expect(findRoom('3')).toEqual([]);
  });

  it('should return a player by uuid', () => {
    expect(getPlayerByUuid(room, '1')).toEqual(player);
  });

  it('should return formatted player', () => {
    expect(getFormattedPlayer(room, '1')).toEqual({
      uuid: '1',
      username: 'a',
      avatar: '123',
      numberOfCards: 2,
    });
  });

  it('should return formatted players', () => {
    expect(getFormattedPlayers(room)).toEqual([
      {
        uuid: '1',
        username: 'a',
        avatar: '123',
        numberOfCards: 2,
      },
      {
        uuid: '2',
        username: 'b',
        avatar: '123',
        numberOfCards: 2,
      },
    ]);
  });

  it('should return reset deck without reset scores', () => {
    (getSuffledDeck as jest.Mock).mockReturnValue(deck);

    const updatedRoom = { ...room, thrownCards: [1, 2], activePlayer: 'toto', roundWinner: 'tata' };
    resetRoom(updatedRoom);

    expect(updatedRoom).toEqual({
      ...room,
      thrownCards: [],
      activePlayer: 'tata',
      roundWinner: null,
    });
  });

  it('should return reset deck with reset scores', () => {
    (getSuffledDeck as jest.Mock).mockReturnValue(deck);

    const updatedRoom = { ...room, thrownCards: [1, 2], activePlayer: 'toto', roundWinner: 'tata' };
    resetRoom(updatedRoom, { resetScore: true });

    expect(updatedRoom).toEqual({
      ...room,
      thrownCards: [],
      activePlayer: 'tata',
      roundWinner: null,
    });
  });
});
