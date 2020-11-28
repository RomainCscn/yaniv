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
import { Room } from './core/room';
import rooms from './core/rooms';
import logger from './logger';
import { Action, ActionType, CustomWebSocket } from './types';

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

  ws.on('message', (message: string) => {
    const data = JSON.parse(message);
    const {
      action,
      actionType,
      roomId,
    }: { action: Action; actionType: ActionType; roomId: string } = data;

    if (!rooms[roomId]) {
      rooms[roomId] = new Room(roomId);
    }

    const room = rooms[roomId];

    if (action === 'JOIN') {
      handleJoin(actionType, room, data.player, sessionUuid, ws);
    } else if (action === 'CONFIGURATION') {
      const { handCardsNumber, scoreLimit } = data;
      handleConfiguration(room, { handCardsNumber, scoreLimit });
    } else if (action === 'UPDATE') {
      handleUpdate(room, data.player, data.sort);
    } else if (action === 'START') {
      handleStart(room);
    } else if (action === 'READY_TO_PLAY') {
      handleReadyToPlay(room, data.player.uuid);
    } else if (action === 'PLAY') {
      const { notPickedCards, pickedCard, thrownCards } = data;
      handlePlay(actionType, room, { notPickedCards, pickedCard, thrownCards }, data.player.uuid);
    } else if (action === 'MESSAGE') {
      const { message } = data;
      handleChat(room, data.player.uuid, message);
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
