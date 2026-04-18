import { all, call, put, select, takeLatest, delay, fork } from 'redux-saga/effects';
import { parse } from 'qs';
import { parseJsonArray, parseWinner, updateUrl } from '../../utils/query';
import {
  pickNameRequest,
  setGameState,
  INIT_GAME,
  PICK_AGAIN_REQUEST,
  PICK_NAME_REQUEST,
  RESET_WINNER,
  SCROLL_EVENT,
  setScrollThrottle,
} from './actions';
import type { GameState } from './types';
import type { RootState } from '../index';

export const initGameSaga = function* () {
  const params = parse(window.location.search, { ignoreQueryPrefix: true }) as Record<
    string,
    unknown
  >;
  const winner = parseWinner(params.winner as string | string[] | null | undefined);
  const losers = parseJsonArray(params.losers as string | string[] | null | undefined);
  const allNames = parseJsonArray(params.names as string | string[] | null | undefined);
  const currentThemeId =
    parseWinner(params.theme as string | string[] | null | undefined) || 'spacia';
  const currentAnimationPackageId =
    parseWinner(params.animation as string | string[] | null | undefined) || 'text-3d';
  const currentRevealStrategy =
    parseWinner(params.strategy as string | string[] | null | undefined) || 'default';

  const initialState: GameState = {
    winner,
    losers,
    allNames,
    isScrollThrottled: false,
    currentThemeId,
    currentRevealStrategy,
    currentAnimationPackageId,
  };

  yield put(setGameState(initialState));
};

export const pickNameSaga = function* (action: ReturnType<typeof pickNameRequest>) {
  const names = action.payload.names;
  if (names.length === 0) {
    return;
  }

  const game: GameState = yield select((state: RootState) => state.game);
  const { currentThemeId, currentRevealStrategy, currentAnimationPackageId } = game;

  const randomIndex = Math.floor(Math.random() * names.length);
  const winner = names[randomIndex];
  const losers = names.filter((_, index) => index !== randomIndex);

  const nextState: GameState = {
    winner,
    losers,
    allNames: names,
    isScrollThrottled: false,
    currentThemeId,
    currentRevealStrategy,
    currentAnimationPackageId,
  };

  yield put(setGameState(nextState));
  yield call(updateUrl, winner, losers, names);
};

export const pickAgainSaga = function* () {
  const game: GameState = yield select((state: RootState) => state.game);
  const { losers, allNames, currentThemeId, currentRevealStrategy, currentAnimationPackageId } =
    game;
  if (losers.length === 0) {
    return;
  }

  const randomIndex = Math.floor(Math.random() * losers.length);
  const winner = losers[randomIndex];
  const nextLosers = losers.filter((_, index) => index !== randomIndex);

  const nextState: GameState = {
    winner,
    losers: nextLosers,
    allNames,
    isScrollThrottled: false,
    currentThemeId,
    currentRevealStrategy,
    currentAnimationPackageId,
  };

  yield put(setGameState(nextState));
  yield call(updateUrl, winner, nextLosers, allNames);
};

export const resetWinnerSaga = function* () {
  const game: GameState = yield select((state: RootState) => state.game);
  const nextState: GameState = {
    ...game,
    winner: null,
    losers: [],
  };

  yield put(setGameState(nextState));
  yield call(updateUrl, null, [], game.allNames);
};

export const scrollThrottleSaga = function* () {
  const throttleDelay = 50; // Throttle scroll events to every 50ms
  yield takeLatest(SCROLL_EVENT, function* () {
    yield put(setScrollThrottle(true));
    yield delay(throttleDelay);
    yield put(setScrollThrottle(false));
  });
};

const rootSaga = function* () {
  yield all([
    takeLatest(INIT_GAME, initGameSaga),
    takeLatest(PICK_NAME_REQUEST, pickNameSaga),
    takeLatest(PICK_AGAIN_REQUEST, pickAgainSaga),
    takeLatest(RESET_WINNER, resetWinnerSaga),
    fork(scrollThrottleSaga),
  ]);
};

export default rootSaga;
