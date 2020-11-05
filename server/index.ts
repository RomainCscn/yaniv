import * as express from 'express';
import * as http from 'http';
import { v4 as uuidv4 } from 'uuid';
import * as WebSocket from 'ws';
import { Card, Room, User } from './types';

import { removePreviousCards, sendActiveCards, sendCardsNumberToOtherPlayers } from './dispatcher';
import { sortHand } from './game';
import initRoom, { addUser } from './room';

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const rooms: Record<string, Room> = {};

const getCurrentUser = (roomName: string, userUuid: string) => rooms[roomName].users[userUuid];

const isExistingUser = (roomName: string, userUuid: string) =>
  typeof rooms[roomName].users[userUuid] === 'object';

const handleMultipleCardsDrop = ({ deck, users }: Room, user: User, cards: Card[]) => {
  sendActiveCards(users, cards);

  // return the hand without the cards
  cards.forEach((c: Card) => {
    user.hand.splice(
      user.hand.findIndex(
        (handCard: Card) => handCard.value == c.value && handCard.suit === c.suit,
      ),
      1,
    );
  });

  // push back the cards so the deck is never empty
  deck.push(...cards);

  // send the hand to the user who dropped the cards
  user.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: user.hand }));
};

const handleSingleCardDrop = ({ deck, users }: Room, user: User, card: Card) => {
  sendActiveCards(users, [card]);

  // return the hand without the card
  user.hand = user.hand.filter(
    (handCard) => handCard.value !== card.value || handCard.suit !== card.suit,
  );

  // push back the card so the deck is never empty
  deck.push(card);

  // send the hand to the user who dropped the card
  user.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: user.hand }));
};

const handlePickDroppedCard = (room: Room, user: User, card: Card) => {
  user.hand = sortHand([...user.hand, card]);

  // remove the card from the deck
  room.deck = room.deck.filter(
    (deckCard) => deckCard.value !== card.value || deckCard.suit !== card.suit,
  );

  removePreviousCards(room);
};

const handlePickStackedCard = (room: Room, user: User) => {
  // add the first card of the deck to the user hand
  user.hand = sortHand([...user.hand, room.deck[0]]);

  // remove the card from the deck
  room.deck = room.deck.slice(1);

  removePreviousCards(room);
};

const handlePlay = (
  actionType: string,
  card: Card,
  cards: Card[],
  roomName: string,
  userUuid: string,
) => {
  const room = rooms[roomName];
  const user = getCurrentUser(roomName, userUuid);

  if (actionType === 'DROP') {
    if (cards) {
      handleMultipleCardsDrop(room, user, cards);
    } else {
      handleSingleCardDrop(room, user, card);
    }
  } else if (actionType === 'PICK') {
    if (card) {
      handlePickDroppedCard(room, user, card);
    } else {
      handlePickStackedCard(room, user);
    }
    // send the hand to the user who picked the card
    user.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: user.hand }));

    sendCardsNumberToOtherPlayers(room.users, userUuid, user.hand.length);
  }
};

const handleJoin = (roomName: string, userUuid: string, ws: WebSocket) => {
  if (!rooms[roomName]) {
    rooms[roomName] = initRoom();
  }

  if (Object.entries(rooms[roomName].users).length > 7) {
    console.error('No more than 7 players');
  }

  if (!isExistingUser(roomName, userUuid)) {
    addUser(userUuid, rooms[roomName], ws);

    sendCardsNumberToOtherPlayers(
      rooms[roomName].users,
      userUuid,
      getCurrentUser(roomName, userUuid).hand.length,
    );
  }
};

wss.on('connection', (ws: WebSocket) => {
  const userUuid = uuidv4();

  ws.on('message', (data: string) => {
    const { action, actionType, card, cards, room: roomName } = JSON.parse(data);

    if (action === 'JOIN') {
      handleJoin(roomName, userUuid, ws);
    } else if (action === 'PLAY') {
      handlePlay(actionType, card, cards, roomName, userUuid);
    }
  });
});

server.listen(process.env.PORT || 8999);
