import type { GameState } from './types';
import {
  SET_GAME_STATE,
  RESET_WINNER,
  SET_SCROLL_THROTTLE,
  SET_THEME,
  SET_REVEAL_STRATEGY,
  SET_ANIMATION_PACKAGE,
} from './actions';
import type { GameAction } from './actions';

const initialState: GameState = {
  winner: null,
  losers: [],
  allNames: [],
  isScrollThrottled: false,
  currentThemeId: 'spacia',
  currentRevealStrategy: 'default',
  currentAnimationPackageId: 'text-3d',
};

const gameReducer = (state = initialState, action: GameAction): GameState => {
  switch (action.type) {
    case SET_GAME_STATE:
      return action.payload;
    case RESET_WINNER:
      return {
        ...state,
        winner: null,
        losers: [],
      };
    case SET_SCROLL_THROTTLE:
      return {
        ...state,
        isScrollThrottled: action.payload.isThrottled,
      };
    case SET_THEME:
      return {
        ...state,
        currentThemeId: action.payload.themeId,
      };
    case SET_REVEAL_STRATEGY:
      return {
        ...state,
        currentRevealStrategy: action.payload.strategy,
      };
    case SET_ANIMATION_PACKAGE:
      return {
        ...state,
        currentAnimationPackageId: action.payload.animationPackageId,
      };
    default:
      return state;
  }
};

export default gameReducer;
