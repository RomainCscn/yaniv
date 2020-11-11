import { HAND_CARDS_NUMBER, getHand, getSuffledDeck } from './game';
import { CustomWebSocket, Room, User } from './types';

export const assignHandToUser = (room: Room, user: User): void => {
  const userHand = getHand(room.deck);

  user.hand = userHand;
  room.deck = room.deck.slice(HAND_CARDS_NUMBER);
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
    username,
    ws: userWs,
  };
};

export const getCurrentUser = (room: Room, userUuid: string): User => room.users[userUuid];

export const getPlayers = (
  room: Room,
): { avatar: string; uuid: string; username: string; numberOfCards: number }[] =>
  Object.entries(room.users).map(([uuid, user]: [string, User]) => ({
    avatar: user.avatarId,
    uuid,
    username: user.username,
    numberOfCards: user.hand.length,
  }));

export const getPlayer = (
  room: Room,
  uuid: string,
): { avatar: string; uuid: string; username: string; numberOfCards: number } => {
  const { avatarId, hand, username } = room.users[uuid];

  return {
    avatar: avatarId,
    numberOfCards: hand.length,
    username,
    uuid,
  };
};

export const resetDeck = (room: Room, { resetScore = false } = {}): void => {
  room.deck = getSuffledDeck();
  room.thrownCards = [];
  room.activePlayer = room.roundWinner;
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
    thrownCards: [],
    activePlayer: null,
    deck: getSuffledDeck(),
    roundWinner: null,
    users: {},
  };
}
