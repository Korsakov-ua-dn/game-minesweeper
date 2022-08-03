import { put, takeEvery, all, select, call } from 'redux-saga/effects'
import { setOpenStart, setGameParams } from './reducers/game-reducer'

// const delay = (ms) => new Promise(res => setTimeout(res, ms))
const getLevel = state => state.level;

// Our worker Saga: will perform the async increment task
export function* pressStartAsync() {
  // yield delay(1000)
  console.log("start 1");
  yield put(setOpenStart(false))
  const level = yield select(getLevel)
  console.log("start 2");
  console.log("level: ", level);

  let gameParams = {
    aspectRatio: 3, // соотношение сторон игрового поля
    delay: 3, // задержка до взрыва в минутах
    сoefficient: 1, // коэффициент увеличивающий игровые числа
  }

  switch (level) {
    case "medium": 
      gameParams = {...gameParams, delay: 2};
      break;
    case "hard": 
      gameParams = {...gameParams, aspectRatio: 4, delay: 2};
      break;
    case "extra hard": 
      gameParams = { aspectRatio: 4, delay: 1.5, сoefficient: 2};
      break;
    default: gameParams = {...gameParams};
  }

  const response = yield call(setGameParams, gameParams);
  console.log("start 3");

  // yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* start(dispatch, getState) {
  
  yield takeEvery('GAME/PRESS_START', pressStartAsync)
}


// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga(dispatch, getState) {
  yield all([
    // helloSaga(),
    start(dispatch, getState)
  ])
}