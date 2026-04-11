import type { GameState } from './types';

export const INIT_GAME = 'game/INIT_GAME' as const;
export const SET_GAME_STATE = 'game/SET_GAME_STATE' as const;
export const PICK_NAME_REQUEST = 'game/PICK_NAME_REQUEST' as const;
export const PICK_AGAIN_REQUEST = 'game/PICK_AGAIN_REQUEST' as const;
export const RESET_WINNER = 'game/RESET_WINNER' as const;
export const SCROLL_EVENT = 'game/SCROLL_EVENT' as const;
export const SET_SCROLL_THROTTLE = 'game/SET_SCROLL_THROTTLE' as const;

export const initGame = () => ({ type: INIT_GAME });
export const setGameState = (payload: GameState) => ({
  type: SET_GAME_STATE,
  payload,
});
export const pickNameRequest = (names: string[]) => ({
  type: PICK_NAME_REQUEST,
  payload: { names },
});
export const pickAgainRequest = () => ({ type: PICK_AGAIN_REQUEST });
export const resetWinner = () => ({ type: RESET_WINNER });
export const scrollEvent = (deltaY: number) => ({
  type: SCROLL_EVENT,
  payload: { deltaY },
});
export const setScrollThrottle = (isThrottled: boolean) => ({
  type: SET_SCROLL_THROTTLE,
  payload: { isThrottled },
});

export type GameAction =
  | ReturnType<typeof initGame>
  | ReturnType<typeof setGameState>
  | ReturnType<typeof pickNameRequest>
  | ReturnType<typeof pickAgainRequest>
  | ReturnType<typeof resetWinner>
  | ReturnType<typeof scrollEvent>
  | ReturnType<typeof setScrollThrottle>;
