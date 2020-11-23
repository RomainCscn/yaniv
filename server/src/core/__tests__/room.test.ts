/* eslint-disable @typescript-eslint/no-explicit-any */
import { getHand, getSuffledDeck } from '../game';
import { Room } from '../room';
import { Card, CustomWebSocket, Player } from '../../types';

const mockRooms = jest.fn();

jest.mock('../game');
jest.mock('../rooms', () => ({
  __esModule: true,
  get default() {
    return mockRooms();
  },
}));

describe('room', () => {
  let room: Room;

  const player: Player = {
    avatar: '123',
    hand: [],
    username: 'a',
    uuid: '1',
    score: 0,
    scoreHistory: [],
    sessionUuid: '123',
    sort: { order: 'asc', type: 'suit' },
    ws: {
      readyState: 1,
      CLOSED: 3,
    } as CustomWebSocket,
  };

  const deck: Card[] = [
    { suit: 'club', value: 1 },
    { suit: 'diamond', value: 2 },
    { suit: 'club', value: 2 },
    { suit: 'spade', value: 2 },
  ];

  beforeEach(() => {
    room = new Room('a');
    room.addPlayer(player, <CustomWebSocket>{ readyState: 1, CLOSED: 3 });
    room.addPlayer({ ...player, username: 'b', uuid: '2' }, <CustomWebSocket>{
      readyState: 1,
      CLOSED: 3,
    });
    room.addPlayer(
      {
        ...player,
        username: 'c',
        uuid: '3',
      },
      <CustomWebSocket>{ readyState: 3, CLOSED: 3 },
    );
  });

  it('should initialize a room', () => {
    (getSuffledDeck as jest.Mock).mockReturnValue(deck);
    const initialRoom = new Room('a');
    expect(initialRoom).toEqual({
      activePlayer: null,
      configuration: {
        handCardsNumber: 7,
        scoreLimit: 200,
      },
      deck,
      players: {},
      roomId: 'a',
      roundWinner: null,
      thrownCards: [],
    });
  });

  it('should assign a hand to a given player', () => {
    const player: any = {};
    (getHand as jest.Mock).mockReturnValue([
      { suit: 'club', value: 1 },
      { suit: 'diamond', value: 2 },
    ]);

    room.assignHandToPlayer(player as Player);

    expect(player.hand).toEqual([
      { suit: 'club', value: 1 },
      { suit: 'diamond', value: 2 },
    ]);
  });

  it('should add a player to the room', () => {
    room.addPlayer(
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
      sort: {
        order: 'asc',
        type: 'suit',
      },
      uuid: '123',
      ws: {},
    });
  });

  it('should return a player by uuid', () => {
    expect(room.getPlayerByUuid('1')).toEqual(player);
  });

  it('should return formatted player', () => {
    expect(room.getFormattedPlayer('1')).toEqual({
      uuid: '1',
      username: 'a',
      avatar: '123',
      numberOfCards: 0,
      sort: {
        order: 'asc',
        type: 'suit',
      },
    });
  });

  it('should return formatted players', () => {
    expect(room.getFormattedPlayers()).toEqual([
      {
        avatar: '123',
        numberOfCards: 0,
        sort: {
          order: 'asc',
          type: 'suit',
        },
        username: 'a',
        uuid: '1',
      },
      {
        avatar: '123',
        numberOfCards: 0,
        sort: {
          order: 'asc',
          type: 'suit',
        },
        username: 'b',
        uuid: '2',
      },
    ]);
  });

  it('should return reset deck without reset scores', () => {
    (getSuffledDeck as jest.Mock).mockReturnValue(deck);

    const updatedRoom: Room = Object.assign(Object.create(Object.getPrototypeOf(room)), room);
    updatedRoom.thrownCards = [{ suit: 'club', value: 1 }];
    updatedRoom.roundWinner = 'tata';
    updatedRoom.activePlayer = 'toto';

    updatedRoom.reset();

    expect(updatedRoom).toEqual({
      ...room,
      thrownCards: [],
      activePlayer: 'tata',
      roundWinner: null,
    });
  });

  it('should return reset deck with reset scores', () => {
    (getSuffledDeck as jest.Mock).mockReturnValue(deck);

    const updatedRoom: Room = Object.assign(Object.create(Object.getPrototypeOf(room)), room);
    updatedRoom.thrownCards = [{ suit: 'club', value: 1 }];
    updatedRoom.roundWinner = 'tata';
    updatedRoom.activePlayer = 'toto';

    updatedRoom.reset();

    expect(updatedRoom).toEqual({
      ...room,
      thrownCards: [],
      activePlayer: 'tata',
      roundWinner: null,
    });
  });
});
