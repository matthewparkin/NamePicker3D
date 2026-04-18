import { setTheme, setRevealStrategy } from './actions';
import gameReducer from './reducer';
import type { GameState } from './types';

describe('Game Theme Reducer', () => {
  const initialState: GameState = {
    winner: null,
    losers: [],
    allNames: [],
    isScrollThrottled: false,
    currentThemeId: 'spacia',
    currentRevealStrategy: 'default',
    currentAnimationPackageId: 'text-3d',
  };

  describe('SET_THEME', () => {
    it('should set the current theme ID', () => {
      const action = setTheme('neon');
      const newState = gameReducer(initialState, action);

      expect(newState.currentThemeId).toBe('neon');
      expect(newState).toEqual({
        ...initialState,
        currentThemeId: 'neon',
      });
    });

    it('should switch from one theme to another', () => {
      let state = gameReducer(initialState, setTheme('flaming'));
      expect(state.currentThemeId).toBe('flaming');

      state = gameReducer(state, setTheme('spacia'));
      expect(state.currentThemeId).toBe('spacia');
    });

    it('should preserve other game state when changing theme', () => {
      const stateWithWinner: GameState = {
        ...initialState,
        winner: 'Alice',
        losers: ['Bob', 'Charlie'],
      };

      const action = setTheme('neon');
      const newState = gameReducer(stateWithWinner, action);

      expect(newState.winner).toBe('Alice');
      expect(newState.losers).toEqual(['Bob', 'Charlie']);
      expect(newState.currentThemeId).toBe('neon');
    });
  });

  describe('SET_REVEAL_STRATEGY', () => {
    it('should set the current reveal strategy', () => {
      const action = setRevealStrategy('default');
      const newState = gameReducer(initialState, action);

      expect(newState.currentRevealStrategy).toBe('default');
    });

    it('should preserve other state when changing strategy', () => {
      const stateWithTheme = {
        ...initialState,
        currentThemeId: 'flaming',
      };

      const action = setRevealStrategy('default');
      const newState = gameReducer(stateWithTheme, action);

      expect(newState.currentRevealStrategy).toBe('default');
      expect(newState.currentThemeId).toBe('flaming');
    });
  });
});
