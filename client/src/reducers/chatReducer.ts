import { Message } from '../types';

enum ActionType {
  NEW_MESSAGE = 'NEW_MESSAGE',
}

type ActionTypeKeys = keyof typeof ActionType;

interface Action {
  type: ActionTypeKeys;
  payload: Message;
}

const chatReducer = (state: any, action: Action) => {
  if (action.type === 'NEW_MESSAGE') {
    return {
      ...state,
      messages: [...state.messages, action.payload],
    };
  }

  return state;
};

export default chatReducer;
