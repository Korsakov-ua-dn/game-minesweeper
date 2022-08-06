import { put, takeEvery, all, select, call, take } from 'redux-saga/effects'
import { getCorrectAnswerList } from '../utils/getCorrectAnswerList';
import { getSteps } from '../utils/getSteps';
import { delay } from '../utils/delay';
import { 
  viewStart,
  setGameParams,
  setBid,
  setSteps,
  setCorrectAnswerList,
  viewWin,
  clearActiveCeil,
  pressStart,
  viewLose,
} from './reducers/game-reducer'



// worker Sagas
export function* pressStartWorker() {
  // закрываем модалку
  yield put(viewStart(false))
  
  // выставляем настройки игры соответственно уровню сложности
  const level = yield select(state => state.game.level)

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

  yield put(setGameParams(gameParams));

  // генерируем ставку
  // yield put(setBid());

  const bid = yield select(state => state.game.bid)
  const aspectRatio = gameParams.aspectRatio;
  const сoefficient = gameParams.сoefficient;

  // получаю рандомно сгенерированный набор уникальных значений в заданном диапозоне (new Set)
  const listOfSteps = getSteps(aspectRatio, bid, сoefficient)
  // добавляем список шагов для текущей игры
  yield put(setSteps([...listOfSteps]));

  // добавляем правильный ответ для текущей игры (список чисел)
  const correctAnswerlist = getCorrectAnswerList(listOfSteps, bid)
  yield put(setCorrectAnswerList(correctAnswerlist))

}

export function* winWorker() {
  const bid = yield select(state => state.game.bid)
  yield put(setBid(null)) // скроет игровое поле
  yield put(viewWin(true))
  yield put(clearActiveCeil()) // очистит список активных ячеек

  if (bid === 9) {
    yield call(delay, 2000)
    yield put(viewWin(false)) // заменить другой модалкой, без кнопки!!!
    yield put(viewStart(true)) // открывает стартовое диалоговое окно игры
    
  } else {
    yield take("GAME/NEXT_ROUND")
    yield put(viewWin(false))
    yield put(pressStart( bid + 1 ))
  }
}

export function* LoseWorker() {
  const aud = new Audio();
  aud.src = '/boom.mp3';
  aud.play()

  yield call(delay, 0)
  yield put(setBid(null)); // скроет игровое поле до появления новой ставки

  yield call(delay, 1000)
  yield put(viewLose(true)) // открывает попап "You Lose"

  yield call(delay, 2000)
  yield put(viewLose(false))
  yield put(clearActiveCeil()) // очистит список активных ячеек
  yield put(viewStart(true)) // открывает стартовое диалоговое окно игры
}

// watcher Sagas
export function* start() {
  yield takeEvery('GAME/PRESS_START', pressStartWorker)
}

export function* win() { 
  yield takeEvery('GAME/WIN', winWorker)
}

export function* lose() { 
  yield takeEvery('GAME/LOSE', LoseWorker)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    start(),
    win(),
    lose(),
  ])
}