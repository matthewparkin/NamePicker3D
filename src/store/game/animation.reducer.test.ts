import { setAnimationPackage } from './actions';
import gameReducer from './reducer';
import type { GameState } from './types';

describe('Game Animation Package Reducer', () => {
  const initialState: GameState = {
    winner: null,
    losers: [],
    allNames: [],
    isScrollThrottled: false,
    currentThemeId: 'spacia',
    currentRevealStrategy: 'default',
    currentAnimationPackageId: 'text-3d',
  };

  describe('SET_ANIMATION_PACKAGE', () => {
    it('should set the current animation package ID', () => {
      const action = setAnimationPackage('particles');
      const newState = gameReducer(initialState, action);

      expect(newState.currentAnimationPackageId).toBe('particles');
      expect(newState).toEqual({
        ...initialState,
        currentAnimationPackageId: 'particles',
      });
    });

    it('should switch from one animation package to another', () => {
      let state = gameReducer(initialState, setAnimationPackage('hologram'));
      expect(state.currentAnimationPackageId).toBe('hologram');

      state = gameReducer(state, setAnimationPackage('voxel'));
      expect(state.currentAnimationPackageId).toBe('voxel');
    });

    it('should preserve other game state when changing animation package', () => {
      const stateWithWinner: GameState = {
        ...initialState,
        winner: 'Alice',
        losers: ['Bob', 'Charlie'],
        currentThemeId: 'neon',
        currentRevealStrategy: 'default',
      };

      const action = setAnimationPackage('particles');
      const newState = gameReducer(stateWithWinner, action);

      expect(newState.winner).toBe('Alice');
      expect(newState.losers).toEqual(['Bob', 'Charlie']);
      expect(newState.currentThemeId).toBe('neon');
      expect(newState.currentRevealStrategy).toBe('default');
      expect(newState.currentAnimationPackageId).toBe('particles');
    });

    it('should allow independent theme and animation package selection', () => {
      // Start with default
      let state = gameReducer(initialState, setAnimationPackage('text-3d'));
      expect(state.currentAnimationPackageId).toBe('text-3d');

      // Change animation
      state = gameReducer(state, setAnimationPackage('organic'));
      expect(state.currentAnimationPackageId).toBe('organic');
      expect(state.currentThemeId).toBe('spacia'); // Still original theme

      // Change theme independently
      state = gameReducer(state, setAnimationPackage('particles'));
      expect(state.currentAnimationPackageId).toBe('particles');
    });
  });

  describe('Multiple Configuration Changes', () => {
    it('should support independent animation package selection', () => {
      let state = initialState;

      // Change animation
      state = gameReducer(state, setAnimationPackage('hologram'));
      expect(state.currentAnimationPackageId).toBe('hologram');
      expect(state.currentThemeId).toBe('spacia');

      // Change animation again (theme remains unchanged)
      state = gameReducer(state, setAnimationPackage('voxel'));
      expect(state.currentAnimationPackageId).toBe('voxel');
      expect(state.currentThemeId).toBe('spacia');

      // Change back to particles
      state = gameReducer(state, setAnimationPackage('particles'));
      expect(state.currentAnimationPackageId).toBe('particles');
      expect(state.currentThemeId).toBe('spacia');
    });
  });

  describe('Initial State', () => {
    it('should have text-3d as default animation package', () => {
      expect(initialState.currentAnimationPackageId).toBe('text-3d');
    });

    it('should have spacia as default theme with text-3d animation', () => {
      expect(initialState.currentThemeId).toBe('spacia');
      expect(initialState.currentAnimationPackageId).toBe('text-3d');
    });
  });
});
