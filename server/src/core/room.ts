import { getHand, getSuffledDeck } from './game';
import rooms from './rooms';
import { CustomWebSocket, Room, SortOrder, User } from '../types';

interface FormattedPlayer {
  avatar: string;
  numberOfCards: number;
  sortOrder: SortOrder;
  username: string;
  uuid: string;
}

export const assignHandToPlayer = (room: Room, user: User): void => {
  const userHand = getHand(room, user.sortOrder);

  user.hand = userHand;
  room.deck = room.deck.slice(room.configuration.handCardsNumber);
};

export const addUser = (
  userUuid: string,
  room: Room,
  { avatar, username }: { avatar: string; username: string },
  userWs: CustomWebSocket,
): void => {
  room.users[userUuid] = {
    avatarId: avatar,
    hand: [],
    score: 0,
    scoreHistory: [],
    sortOrder: 'asc',
    username,
    ws: userWs,
  };
};

export const findRoom = (userUuid: string): [string, Room] | [] => {
  for (const [roomId, room] of Object.entries(rooms)) {
    if (room.users[userUuid]) {
      return [roomId, room];
    }
  }

  return [];
};

export const getPlayerByUuid = (room: Room, userUuid: string): User => room.users[userUuid];

export const getFormattedPlayers = (room: Room): FormattedPlayer[] =>
  Object.entries(room.users).map(([uuid, user]: [string, User]) => ({
    avatar: user.avatarId,
    numberOfCards: user.hand.length,
    sortOrder: user.sortOrder,
    uuid,
    username: user.username,
  }));

export const getFormattedPlayer = (room: Room, uuid: string): FormattedPlayer => {
  const { avatarId: avatar, hand, sortOrder, username } = room.users[uuid];

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
