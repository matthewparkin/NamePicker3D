import gameReducer from './reducer';
import { resetWinner, setGameState } from './actions';
import type { GameState } from './types';

describe('game reducer', () => {
  const initialState: GameState = {
    winner: null,
    losers: [],
    allNames: [],
    isScrollThrottled: false,
  };

  it('sets the game state when asked', () => {
    const nextState = {
      winner: 'Alice',
      losers: ['Bob', 'Charlie'],
      allNames: ['Alice', 'Bob', 'Charlie'],
      isScrollThrottled: false,
    };

    expect(gameReducer(initialState, setGameState(nextState))).toEqual(nextState);
  });

  it('resets only current winner and losers', () => {
    const state: GameState = {
      winner: 'Alice',
      losers: ['Bob', 'Charlie'],
      allNames: ['Alice', 'Bob', 'Charlie'],
      isScrollThrottled: false,
    };

    expect(gameReducer(state, resetWinner())).toEqual({
      winner: null,
      losers: [],
      allNames: ['Alice', 'Bob', 'Charlie'],
      isScrollThrottled: false,
    });
  });
});
