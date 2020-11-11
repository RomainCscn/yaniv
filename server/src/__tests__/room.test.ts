/* eslint-disable @typescript-eslint/no-explicit-any */
import { getHand, getSuffledDeck } from '../game';
import initRoom, {
  addUser,
  assignHandToPlayer,
  getPlayerByUuid,
  getFormattedPlayer,
  getFormattedPlayers,
  resetDeck,
} from '../room';
import { CustomWebSocket, Room, User } from '../types';

jest.mock('../game');

describe('room', () => {
  let room: any;
  const user = {
    username: 'a',
    avatarId: '123',
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
      users: {
        '1': user,
        '2': { ...user, username: 'b' },
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
      users: {},
    });
  });

  it('should assign a hand to a given player', () => {
    const user: any = {};
    (getHand as jest.Mock).mockReturnValue([
      { suit: 'club', value: 1 },
      { suit: 'diamond', value: 2 },
    ]);

    assignHandToPlayer(room as Room, user as User);

    expect(user.hand).toEqual([
      { suit: 'club', value: 1 },
      { suit: 'diamond', value: 2 },
    ]);
  });

  it('should add a user to the room', () => {
    addUser('123', room, { avatar: 'abc', username: 'toto' }, {} as CustomWebSocket);

    expect(room.users['123']).toEqual({
      avatarId: 'abc',
      hand: [],
      score: 0,
      scoreHistory: [],
      username: 'toto',
      ws: {},
    });
  });

  it('should return a player by uuid', () => {
    expect(getPlayerByUuid(room, '1')).toEqual(user);
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
    resetDeck(updatedRoom);

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
    resetDeck(updatedRoom, { resetScore: true });

    expect(updatedRoom).toEqual({
      ...room,
      thrownCards: [],
      activePlayer: 'tata',
      roundWinner: null,
    });
  });
});
