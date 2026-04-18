import type { GameState } from './types';

export const INIT_GAME = 'game/INIT_GAME' as const;
export const SET_GAME_STATE = 'game/SET_GAME_STATE' as const;
export const PICK_NAME_REQUEST = 'game/PICK_NAME_REQUEST' as const;
export const PICK_AGAIN_REQUEST = 'game/PICK_AGAIN_REQUEST' as const;
export const RESET_WINNER = 'game/RESET_WINNER' as const;
export const SCROLL_EVENT = 'game/SCROLL_EVENT' as const;
export const SET_SCROLL_THROTTLE = 'game/SET_SCROLL_THROTTLE' as const;
export const SET_THEME = 'game/SET_THEME' as const;
export const SET_REVEAL_STRATEGY = 'game/SET_REVEAL_STRATEGY' as const;
export const SET_ANIMATION_PACKAGE = 'game/SET_ANIMATION_PACKAGE' as const;

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
export const setTheme = (themeId: string) => ({
  type: SET_THEME,
  payload: { themeId },
});
export const setRevealStrategy = (strategy: string) => ({
  type: SET_REVEAL_STRATEGY,
  payload: { strategy },
});
export const setAnimationPackage = (animationPackageId: string) => ({
  type: SET_ANIMATION_PACKAGE,
  payload: { animationPackageId },
});

export type GameAction =
  | ReturnType<typeof initGame>
  | ReturnType<typeof setGameState>
  | ReturnType<typeof pickNameRequest>
  | ReturnType<typeof pickAgainRequest>
  | ReturnType<typeof resetWinner>
  | ReturnType<typeof scrollEvent>
  | ReturnType<typeof setScrollThrottle>
  | ReturnType<typeof setTheme>
  | ReturnType<typeof setRevealStrategy>
  | ReturnType<typeof setAnimationPackage>;
