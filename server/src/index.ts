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
  const sessionUuid = uuidv4();
  logger.info({ sessionUuid }, 'Player connected');

  ws.isAlive = true;

  ws.on('pong', () => {
    ws.isAlive = true;
  });

  ws.on('message', (data: string) => {
    const {
      action,
      actionType,
      handCardsNumber,
      message,
      notPickedCards,
      pickedCard,
      player,
      room: roomId,
      scoreLimit,
      sort,
      thrownCards,
    } = JSON.parse(data);

    if (action === 'JOIN') {
      handleJoin(actionType, roomId, player, sessionUuid, ws);
    } else if (action === 'CONFIGURATION') {
      handleConfiguration(roomId, { handCardsNumber, scoreLimit });
    } else if (action === 'UPDATE') {
      handleUpdate(roomId, player, sort);
    } else if (action === 'START') {
      handleStart(roomId);
    } else if (action === 'READY_TO_PLAY') {
      handleReadyToPlay(roomId, player.uuid);
    } else if (action === 'PLAY') {
      handlePlay(actionType, { notPickedCards, pickedCard, thrownCards }, roomId, player.uuid);
    } else if (action === 'MESSAGE') {
      handleChat(message, roomId, player.uuid);
    }
  });

  ws.onclose = () => {
    logger.info({ sessionUuid }, 'WebSocket closed');

    handleWebSocketClosed(sessionUuid);
  };
});

const interval = setInterval(() => {
  wss.clients.forEach((ws: WebSocket) => {
    const customWs = ws as CustomWebSocket;

    if (!customWs.isAlive) {
      logger.warn('Player disconnected due to inactive WebSocket');

      return customWs.terminate();
    }

    customWs.isAlive = false;
    customWs.ping(null, undefined);
  });
}, 10000);

wss.on('close', () => {
  clearInterval(interval);
});

logger.info('Server started on port ', process.env.PORT || 8999);

server.listen(process.env.PORT || 8999);
