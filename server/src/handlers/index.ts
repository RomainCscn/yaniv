import handleChat from './chat';
import handleConfiguration from './configuration';
import handleJoin from './join';
import handlePlay from './play';
import handleReadyToPlay from './readyToPlay';
import handleStart from './start';
import handleUpdate from './update';

import { Room } from '../core/room';
import logger from '../logger';
import { Action, Data, Handler } from '../types';

const HANDLERS: Record<Action, Handler> = {
  CONFIGURATION: handleConfiguration,
  JOIN: handleJoin,
  MESSAGE: handleChat,
  PLAY: handlePlay,
  READY_TO_PLAY: handleReadyToPlay,
  START: handleStart,
  UPDATE: handleUpdate,
};

const handleMessage = (room: Room, data: Data): void =>
  HANDLERS[data.action]
    ? HANDLERS[data.action](room, data)
    : logger.error({ action: data.action }, 'Error retrieving handler');

export default handleMessage;
