import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import { gameReducer } from "./reducers/game-reducer";

import thunkMiddleware from 'redux-thunk'

const reducers = combineReducers({
    game: gameReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store;