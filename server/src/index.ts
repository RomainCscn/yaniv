import * as express from 'express';
import * as http from 'http';
import { v4 as uuidv4 } from 'uuid';
import * as WebSocket from 'ws';

import { removePreviousCards, sendActiveCards } from './dispatcher';
import { getCardValue, sortHand } from './game';
import initRoom, { addUser, assignHandToUser, resetDeck } from './room';
import { Card, Room, User } from './types';

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const rooms: Record<string, Room> = {};

const getCurrentUser = (roomName: string, userUuid: string) => rooms[roomName].users[userUuid];

const isExistingUser = (roomName: string, userUuid: string) =>
  typeof rooms[roomName].users[userUuid] === 'object';

const getPlayers = (room: Room) =>
  Object.entries(room.users).map(([uuid, user]: [string, User]) => ({
    uuid,
    username: user.username,
    numberOfCards: user.hand.length,
  }));

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

const handleMamixta = (room: Room, userUuid: string) => {
  const usersScore: Record<string, number> = {};

  Object.entries(room.users).forEach(([uuid, user]: [string, User]) => {
    const handSum = user.hand.reduce((sum: number, card) => {
      return sum + getCardValue(card);
    }, 0);

    usersScore[uuid] = handSum;
  });

  const currentUserScore = usersScore[userUuid];

  const lowerScoreThanCurrent = Object.entries(usersScore).filter(
    ([uuid, score]: [string, number]) => uuid !== userUuid && currentUserScore >= score,
  );

  if (lowerScoreThanCurrent.length > 0) {
    Object.entries(usersScore).forEach(
      ([uuid, score]: [string, number]) =>
        (room.users[uuid].score += userUuid === uuid ? score + 30 : score),
    );
  } else {
    Object.entries(usersScore).forEach(
      ([uuid, score]: [string, number]) => (room.users[uuid].score += score),
    );
  }

  const playersCard = Object.fromEntries(
    Object.entries(room.users).map(([uuid, user]: [string, User]) => [uuid, user.hand]),
  );

  Object.entries(room.users).forEach(([, user]: [string, User]) => {
    user.ws.send(JSON.stringify({ type: 'REVEAL_OTHER_PLAYERS_CARDS', playersCard }));
  });

  // // generate new deck and send cards to players
  // Object.entries(room.users).forEach(([, user]: [string, User]) => {
  //   resetDeck(room);
  //   assignHandToUser(room, user);
  //   user.ws.send(JSON.stringify({ type: 'NEW_ROUND' }));
  //   user.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: user.hand }));
  // });
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

    const playersUuid = Object.entries(room.users).map(([uuid]) => uuid);
    const activePlayerIndex = playersUuid.indexOf(room.activePlayer as string);
    const nextPlayerUuid =
      activePlayerIndex === playersUuid.length - 1
        ? playersUuid[0]
        : playersUuid[activePlayerIndex + 1];

    rooms[roomName].activePlayer = nextPlayerUuid;

    // sync players to display other players cards
    Object.entries(room.users).forEach(([, user]: [string, User]) => {
      user.ws.send(JSON.stringify({ type: 'SET_ACTIVE_PLAYER', uuid: nextPlayerUuid }));
      user.ws.send(JSON.stringify({ type: 'SET_OTHER_PLAYERS_CARDS', players: getPlayers(room) }));
    });
  } else if (actionType === 'MAMIXTA') {
    handleMamixta(room, userUuid);
  }
};

const handleJoin = (roomName: string, username: string, userUuid: string, ws: WebSocket) => {
  if (!rooms[roomName]) {
    rooms[roomName] = initRoom();
  }

  if (Object.entries(rooms[roomName].users).length > 7) {
    console.error('No more than 7 players');
  }

  if (!isExistingUser(roomName, userUuid)) {
    addUser(userUuid, rooms[roomName], username, ws);

    const usernames = Object.entries(rooms[roomName].users).map(([, user]) => user.username);

    Object.entries(rooms[roomName].users).forEach(([, user]: [string, User]) => {
      user.ws.send(JSON.stringify({ type: 'PLAYERS_UPDATE', usernameList: usernames }));
    });
  }
};

const handleStart = (roomName: string) => {
  const room = rooms[roomName];

  Object.entries(room.users).forEach(([, user]: [string, User]) => {
    assignHandToUser(room, user);
  });

  Object.entries(room.users).forEach(([uuid, user]: [string, User]) => {
    user.ws.send(JSON.stringify({ type: 'START_GAME', players: getPlayers(room), uuid }));
  });
};

const handleReadyToPlay = (roomName: string) => {
  if (!rooms[roomName].activePlayer) {
    const playersNumber = Object.entries(rooms[roomName].users).length;
    const firstPlayerUuid = Object.entries(rooms[roomName].users)[
      Math.floor(Math.random() * playersNumber)
    ][0];

    console.log(firstPlayerUuid);

    rooms[roomName].activePlayer = firstPlayerUuid;
  }

  Object.entries(rooms[roomName].users).forEach(([, user]: [string, User]) => {
    user.ws.send(JSON.stringify({ type: 'SET_ACTIVE_PLAYER', uuid: rooms[roomName].activePlayer }));
    user.ws.send(JSON.stringify({ type: 'SET_PLAYER_HAND', hand: user.hand }));
  });
};

wss.on('connection', (ws: WebSocket) => {
  const userUuid = uuidv4();

  ws.on('message', (data: string) => {
    const { action, actionType, card, cards, room: roomName, username } = JSON.parse(data);

    if (action === 'JOIN') {
      handleJoin(roomName, username, userUuid, ws);
    } else if (action === 'START') {
      handleStart(roomName);
    } else if (action === 'READY_TO_PLAY') {
      handleReadyToPlay(roomName);
    } else if (action === 'PLAY') {
      handlePlay(actionType, card, cards, roomName, userUuid);
    }
  });
});

server.listen(process.env.PORT || 8999);
