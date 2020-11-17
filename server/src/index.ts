import * as express from 'express';
import * as http from 'http';
import { v4 as uuidv4 } from 'uuid';
import * as WebSocket from 'ws';

import {
  handleChat,
  handleConfiguration,
  handleJoin,
  handlePlay,
  handleReadyToPlay,
  handleStart,
  handleUpdate,
} from './controllers';
import { handleWebSocketClosed } from './core/network';
import logger from './logger';
import { CustomWebSocket } from './types';

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: CustomWebSocket) => {
  const userUuid = uuidv4();
  logger.info({ userUuid }, 'User connected');

  ws.isAlive = true;

  ws.on('pong', () => {
    ws.isAlive = true;
  });

  ws.on('message', (data: string) => {
    const {
      action,
      actionType,
      avatar,
      handCardsNumber,
      message,
      notPickedCards,
      pickedCard,
      room: roomId,
      scoreLimit,
      sortOrder,
      thrownCards,
      username,
    } = JSON.parse(data);

    if (action === 'JOIN') {
      handleJoin(actionType, avatar, roomId, username, userUuid, ws);
    } else if (action === 'CONFIGURATION') {
      handleConfiguration(roomId, { handCardsNumber, scoreLimit });
    } else if (action === 'UPDATE') {
      handleUpdate(roomId, userUuid, { avatar, sortOrder, username });
    } else if (action === 'START') {
      handleStart(roomId);
    } else if (action === 'READY_TO_PLAY') {
      handleReadyToPlay(roomId, userUuid);
    } else if (action === 'PLAY') {
      handlePlay(actionType, { notPickedCards, pickedCard, thrownCards }, roomId, userUuid);
    } else if (action === 'MESSAGE') {
      handleChat(message, roomId, userUuid);
    }
  });

  ws.onclose = () => {
    logger.info({ userUuid }, 'WebSocket closed');

    handleWebSocketClosed(userUuid);
  };
});

const interval = setInterval(() => {
  wss.clients.forEach((ws: WebSocket) => {
    const customWs = ws as CustomWebSocket;

    if (!customWs.isAlive) {
      logger.warn('User disconnected due to inactive WebSocket');

      return customWs.terminate();
    }

    customWs.isAlive = false;
    customWs.ping(null, undefined);
  });
}, 10000);

wss.on('close', () => {
  clearInterval(interval);
});

console.log('Server started on port ', process.env.PORT || 8999);

server.listen(process.env.PORT || 8999);
