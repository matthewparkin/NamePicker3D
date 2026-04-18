import { call, put } from 'redux-saga/effects';
import { initGameSaga, pickAgainSaga, pickNameSaga, resetWinnerSaga } from './sagas';
import { setGameState, pickNameRequest } from './actions';
import { updateUrl } from '../../utils/query';
import type { GameState } from './types';

describe('game sagas', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('initializes state from the URL', () => {
    window.history.replaceState(
      {},
      '',
      '?winner=Alice&losers=Bob%2CCharlie&names=Alice%2CBob%2CCharlie'
    );
    const generator = initGameSaga();

    expect(generator.next().value).toEqual(
      put(
        setGameState({
          winner: 'Alice',
          losers: ['Bob', 'Charlie'],
          allNames: ['Alice', 'Bob', 'Charlie'],
          isScrollThrottled: false,
          currentThemeId: 'spacia',
          currentRevealStrategy: 'default',
          currentAnimationPackageId: 'text-3d',
        })
      )
    );
    expect(generator.next().done).toBe(true);
  });

  it('picks a winner from names and updates the URL', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    const names = ['Alice', 'Bob', 'Charlie'];
    const generator = pickNameSaga(pickNameRequest(names));

    const selectEffect = generator.next().value;
    expect(selectEffect).toHaveProperty('payload.selector');

    expect(
      generator.next({
        winner: null,
        losers: [],
        allNames: [],
        isScrollThrottled: false,
        currentThemeId: 'spacia',
        currentRevealStrategy: 'default',
        currentAnimationPackageId: 'text-3d',
      }).value
    ).toEqual(
      put(
        setGameState({
          winner: 'Bob',
          losers: ['Alice', 'Charlie'],
          allNames: names,
          isScrollThrottled: false,
          currentThemeId: 'spacia',
          currentRevealStrategy: 'default',
          currentAnimationPackageId: 'text-3d',
        })
      )
    );
    expect(generator.next().value).toEqual(call(updateUrl, 'Bob', ['Alice', 'Charlie'], names));
    expect(generator.next().done).toBe(true);
  });

  it('does nothing when pickNameSaga receives an empty list', () => {
    const generator = pickNameSaga(pickNameRequest([]));
    expect(generator.next().done).toBe(true);
  });

  it('picks again from losers and updates the URL', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    const gameState: GameState = {
      winner: 'Alice',
      losers: ['Bob', 'Charlie', 'Dana'],
      allNames: ['Alice', 'Bob', 'Charlie', 'Dana'],
      isScrollThrottled: false,
      currentThemeId: 'spacia',
      currentRevealStrategy: 'default',
      currentAnimationPackageId: 'text-3d',
    };
    const generator = pickAgainSaga();

    const selectEffect = generator.next().value;
    expect(selectEffect).toHaveProperty('payload.selector');

    expect(generator.next(gameState).value).toEqual(
      put(
        setGameState({
          winner: 'Charlie',
          losers: ['Bob', 'Dana'],
          allNames: ['Alice', 'Bob', 'Charlie', 'Dana'],
          isScrollThrottled: false,
          currentThemeId: 'spacia',
          currentRevealStrategy: 'default',
          currentAnimationPackageId: 'text-3d',
        })
      )
    );
    expect(generator.next().value).toEqual(
      call(updateUrl, 'Charlie', ['Bob', 'Dana'], gameState.allNames)
    );
    expect(generator.next().done).toBe(true);
  });

  it('picks again with no losers and does nothing', () => {
    const generator = pickAgainSaga();
    const selectEffect = generator.next().value;
    expect(selectEffect).toHaveProperty('payload.selector');
    expect(
      generator.next({
        winner: 'Alice',
        losers: [],
        allNames: [],
        isScrollThrottled: false,
        currentThemeId: 'spacia',
        currentRevealStrategy: 'default',
        currentAnimationPackageId: 'text-3d',
      }).done
    ).toBe(true);
  });

  it('resets the winner and updates the URL', () => {
    const gameState: GameState = {
      winner: 'Alice',
      losers: ['Bob', 'Charlie'],
      allNames: ['Alice', 'Bob', 'Charlie'],
      isScrollThrottled: false,
      currentThemeId: 'spacia',
      currentRevealStrategy: 'default',
      currentAnimationPackageId: 'text-3d',
    };
    const generator = resetWinnerSaga();

    const selectEffect = generator.next().value;
    expect(selectEffect).toHaveProperty('payload.selector');

    expect(generator.next(gameState).value).toEqual(
      put(
        setGameState({
          winner: null,
          losers: [],
          allNames: ['Alice', 'Bob', 'Charlie'],
          isScrollThrottled: false,
          currentThemeId: 'spacia',
          currentRevealStrategy: 'default',
          currentAnimationPackageId: 'text-3d',
        })
      )
    );
    expect(generator.next().value).toEqual(call(updateUrl, null, [], gameState.allNames));
    expect(generator.next().done).toBe(true);
  });
});
