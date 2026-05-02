import gameReducer from './reducer';
import { resetWinner, setGameState } from './actions';
import type { GameState } from './types';

// This test suite focuses on the overall game reducer, ensuring that it correctly handles setting the game state and resetting the winner.
// It verifies that the game state is updated as expected when a new state is set and that only the winner and losers are reset when the resetWinner action is dispatched, while other properties of the game state remain unchanged.
describe('game reducer', () => {
  const initialState: GameState = {
    winner: null,
    losers: [],
    allNames: [],
    isScrollThrottled: false,
    currentThemeId: 'spacia',
    currentRevealStrategy: 'default',
    currentSceneId: 'generic',
    currentAnimationPackageId: 'text-3d',
  };

  it('sets the game state when asked', () => {
    const nextState = {
      winner: 'Alice',
      losers: ['Bob', 'Charlie'],
      allNames: ['Alice', 'Bob', 'Charlie'],
      isScrollThrottled: false,
      currentThemeId: 'spacia',
      currentRevealStrategy: 'default',
      currentSceneId: 'generic',
      currentAnimationPackageId: 'text-3d',
    };

    expect(gameReducer(initialState, setGameState(nextState))).toEqual(nextState);
  });

  it('resets only current winner and losers', () => {
    const state: GameState = {
      winner: 'Alice',
      losers: ['Bob', 'Charlie'],
      allNames: ['Alice', 'Bob', 'Charlie'],
      isScrollThrottled: false,
      currentThemeId: 'spacia',
      currentRevealStrategy: 'default',
      currentSceneId: 'generic',
      currentAnimationPackageId: 'text-3d',
    };

    expect(gameReducer(state, resetWinner())).toEqual({
      winner: null,
      losers: [],
      allNames: ['Alice', 'Bob', 'Charlie'],
      isScrollThrottled: false,
      currentThemeId: 'spacia',
      currentRevealStrategy: 'default',
      currentSceneId: 'generic',
      currentAnimationPackageId: 'text-3d',
    });
  });
});
