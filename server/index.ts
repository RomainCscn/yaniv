import * as express from 'express';
import * as http from 'http';
import { v4 as uuidv4 } from 'uuid';
import * as WebSocket from 'ws';
import { Card } from './card';

import { HAND_CARDS_NUMBER, getHand, getSuffledDeck, sortHand } from './game';
import initRoom, { addUser } from './room';

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const rooms = {};

const getCurrentUser = (roomName: string, userUuid: string) => rooms[roomName].users[userUuid];

const isExistingUser = (roomName: string, userUuid: string) =>
  typeof rooms[roomName].users[userUuid] === 'object';

const sendActiveCard = (users: any, card: Card) =>
  Object.entries(users).forEach(([, user]: [string, any]) => {
    user.ws.send(JSON.stringify({ activeCard: card }));
  });

const handleMultipleCardsDrop = ({ deck, users }: any, user: any, cards: any) => {
  sendActiveCard(users, cards[cards.length - 1]);

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
  user.ws.send(JSON.stringify({ hand: user.hand }));
};

const handleSingleCardDrop = (room: any, user: any, card: Card) => {
  sendActiveCard(room.users, card);

  // return the hand without the card
  user.hand = user.hand.filter(
    (handCard) => handCard.value !== card.value || handCard.suit !== card.suit,
  );

  // push back the card so the deck is never empty
  room.deck.push(card);

  // send the hand to the user who dropped the card
  user.ws.send(JSON.stringify({ hand: user.hand }));
};

const handlePickDroppedCard = (room: any, user: any, card: Card) => {
  user.hand = sortHand([...user.hand, card]);

  room.deck = room.deck.filter(
    (deckCard) => deckCard.value !== card.value || deckCard.suit !== card.suit,
  );

  // send the second to last card (last one is the active card)
  Object.entries(room.users).forEach(([, user]: [string, any]) =>
    user.ws.send(JSON.stringify({ previousCards: room.deck[room.deck.length - 2] })),
  );
};

const handlePickStackedCard = (room: any, user: any) => {
  // add the first card of the deck to the user hand
  user.hand = sortHand([...user.hand, room.deck[0]]);

  // remove the card from the deck
  room.deck = room.deck.slice(1);
};

const handlePlay = (
  actionType: string,
  card: Card,
  cards: any,
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
    user.ws.send(JSON.stringify({ hand: user.hand }));
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
