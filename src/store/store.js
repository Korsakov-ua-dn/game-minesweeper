import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import { gameReducer } from "./reducers/game-reducer";
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

// import thunkMiddleware from 'redux-thunk';

const sagaMiddleware = createSagaMiddleware()

const reducers = combineReducers({
    game: gameReducer,
});

const store = createStore(reducers, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga, store.dispatch, store.getState)

export default store;