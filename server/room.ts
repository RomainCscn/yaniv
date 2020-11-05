import { HAND_CARDS_NUMBER, getHand, getSuffledDeck, sortHand } from './game';

export const addUser = (userUuid, room, userWs) => {
  const userHand = getHand(room.deck);

  room.users[userUuid] = { hand: userHand, ws: userWs };
  room.deck = room.deck.slice(HAND_CARDS_NUMBER);

  userWs.send(JSON.stringify({ hand: userHand }));
};

export default function initRoom() {
  return {
    deck: getSuffledDeck(),
    activeCard: null,
    users: {},
  };
}
