import { getHand, getSuffledDeck } from './game';
import rooms from './rooms';
import { CustomWebSocket, FormattedPlayer, Room, User } from '../types';

export const assignHandToPlayer = (room: Room, user: User): void => {
  const userHand = getHand(room, user.sortOrder);

  user.hand = userHand;
  room.deck = room.deck.slice(room.configuration.handCardsNumber);
};

export const addUser = (
  userUuid: string,
  room: Room,
  { avatar, sessionUuid, username }: User,
  userWs: CustomWebSocket,
): void => {
  room.users[userUuid] = {
    avatar,
    hand: [],
    score: 0,
    scoreHistory: [],
    sessionUuid,
    sortOrder: 'asc',
    username,
    uuid: userUuid,
    ws: userWs,
  };
};

export const findRoom = (sessionUuid: string): [string, Room] | [] => {
  for (const [roomId, room] of Object.entries(rooms)) {
    if (Object.values(room.users).find((user) => user.sessionUuid === sessionUuid)) {
      return [roomId, room];
    }
  }

  return [];
};

export const getPlayerByUuid = (room: Room, userUuid: string): User => room.users[userUuid];

export const getPlayerUuidBySessionUuid = (room: Room, sessionUuid: string): string | undefined =>
  Object.values(room.users).find((user) => user.sessionUuid === sessionUuid)?.uuid;

export const getFormattedPlayers = (room: Room): FormattedPlayer[] =>
  Object.entries(room.users).map(([uuid, user]: [string, User]) => ({
    avatar: user.avatar,
    numberOfCards: user.hand.length,
    sortOrder: user.sortOrder,
    uuid,
    username: user.username,
  }));

export const getFormattedPlayer = (room: Room, uuid: string): FormattedPlayer => {
  const { avatar: avatar, hand, sortOrder, username } = room.users[uuid];

  return {
    avatar,
    numberOfCards: hand.length,
    sortOrder,
    username,
    uuid,
  };
};

export const getPlayersScore = (room: Room): Pick<User, 'score' | 'scoreHistory' | 'username'>[] =>
  Object.entries(room.users).map(([uuid, user]: [string, User]) => ({
    score: user.score,
    scoreHistory: user.scoreHistory,
    uuid,
    username: user.username,
  }));

export const resetRoom = (room: Room, { resetScore = false } = {}): void => {
  room.deck = getSuffledDeck();
  room.thrownCards = [];
  room.activePlayer = room.roundWinner || Object.keys(room.users)[0];
  room.roundWinner = null;

  if (resetScore) {
    Object.entries(room.users).forEach(([, user]) => {
      user.score = 0;
      user.scoreHistory = [];
    });
  }
};

export default function initRoom(): Room {
  return {
    activePlayer: null,
    configuration: { handCardsNumber: 7, scoreLimit: 200 },
    deck: getSuffledDeck(),
    roundWinner: null,
    thrownCards: [],
    users: {},
  };
}
