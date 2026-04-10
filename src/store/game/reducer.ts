import type { GameState } from './types';
import { SET_GAME_STATE, RESET_WINNER, SET_SCROLL_THROTTLE } from './actions';
import type { GameAction } from './actions';

const initialState: GameState = {
  winner: null,
  losers: [],
  allNames: [],
  isScrollThrottled: false,
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
    default:
      return state;
  }
};

export default gameReducer;
