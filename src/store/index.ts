import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import gameReducer from './game/reducer';
import rootSaga from './game/sagas';

const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
  game: gameReducer,
});

export const store = createStore(rootReducer, undefined, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
