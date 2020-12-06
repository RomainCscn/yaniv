import logger from './logger';
import { Data } from './types';

export const getData = (message: string): Data | undefined => {
  try {
    const data = JSON.parse(message);

    return data;
  } catch {
    logger.error({ message }, 'Error parsing message');

    return undefined;
  }
};
