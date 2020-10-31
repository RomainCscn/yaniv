import * as express from 'express';
import * as http from 'http';
import { v4 as uuidv4 } from 'uuid';
import * as WebSocket from 'ws';

import { HAND_CARDS_NUMBER, getHand, getSuffledDeck, sortHand } from './game';

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const rooms = {};

wss.on('connection', (ws: WebSocket, request, client) => {
  const userUuid = uuidv4();
  ws.on('message', (data: string) => {
    const { action, card, type, room } = JSON.parse(data);

    if (action === 'JOIN') {
      if (!rooms[room]) {
        const randomDeck = getSuffledDeck();
        rooms[room] = {
          deck: randomDeck,
          activeCard: null,
          users: {},
        };
      }

      // if (Object.entries(rooms[room].users).length > 7) {
      //   console.error('No more than 7 players');
      // }

      if (!rooms[room].users[userUuid]) {
        const userHand = getHand(rooms[room].deck);

        rooms[room].users[userUuid] = { hand: userHand, ws };
        rooms[room].deck = rooms[room].deck.slice(HAND_CARDS_NUMBER);

        ws.send(JSON.stringify({ hand: userHand }));
      }
    } else if (action === 'PLAY') {
      if (type === 'DROP') {
        // send active card to all users in the room
        Object.entries(rooms[room].users).forEach(([, user]: [string, any]) => {
          user.ws.send(JSON.stringify({ activeCard: card }));
        });

        // return the hand without the card
        rooms[room].users[userUuid].hand = rooms[room].users[
          userUuid
        ].hand.filter(
          (handCard) =>
            handCard.value !== card.value || handCard.suit !== card.suit
        );

        // push back the card so the deck is never empty
        rooms[room].deck.push(card);
        console.log(rooms[room].deck[rooms[room].deck.length - 1]);

        // send the hand to the user who dropped the card
        ws.send(JSON.stringify({ hand: rooms[room].users[userUuid].hand }));
      }
      if (type === 'PICK') {
        if (card) {
          rooms[room].users[userUuid].hand = sortHand([
            ...rooms[room].users[userUuid].hand,
            card,
          ]);

          rooms[room].deck = rooms[room].deck.filter(
            (deckCard) =>
              deckCard.value !== card.value || deckCard.suit !== card.suit
          );

          // send the second to last card (last one is the active card)
          Object.entries(rooms[room].users).forEach(
            ([, user]: [string, any]) => {
              user.ws.send(
                JSON.stringify({
                  previousCards: rooms[room].deck[rooms[room].deck.length - 2],
                })
              );
            }
          );
        } else {
          // add the first card of the deck to the user hand
          rooms[room].users[userUuid].hand = sortHand([
            ...rooms[room].users[userUuid].hand,
            rooms[room].deck[0],
          ]);

          // remove the card from the deck
          rooms[room].deck = rooms[room].deck.slice(1);
        }

        // send the hand to the user who dropped the card
        ws.send(JSON.stringify({ hand: rooms[room].users[userUuid].hand }));
      }
    } else {
      Object.entries(rooms[room].users).forEach(([, user]: [string, any]) => {
        user.ws.send(JSON.stringify({ hand: user.hand }));
      });
    }
  });
});

server.listen(process.env.PORT || 8999);
