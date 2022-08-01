import { getCorrectAnswerList } from "../../utils/getCorrectAnswerList";
import { getSteps } from "../../utils/getSteps";

const initialState = {
    isOpenStart: true,
    isWinView: false,
    isLoseView: false,
    activeCeilsList: [],
    bid: null,
    listOfSteps: [],
    correctAnswerList: [],
    level: "easy",
    gameParams: {
      aspectRatio: null,
      timer: null,
      bidCoefficient: null,
    },
  };

export const gameReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GAME/SET_BID":
      case "GAME/SET_LEVEL":
      case "GAME/SET_STEPS":
      case "GAME/VIEW_WIN":
      case "GAME/VIEW_LOSE":
      case "GAME/SET_CORRECT-ANSWER_LIST":
      case "GAME/SET_OPEN_START":
      case "GAME/SET_DISABLE":
      case "GAME/SET_GAME_PARAMS":
        return { ...state, ...action.payload };

      case "GAME/TOGGLE_ACTIVE_CEIL": {
        if (state.activeCeilsList.find( id => id === action.ceilId)) {
          return { ...state, activeCeilsList: state.activeCeilsList.filter(id => id !== action.ceilId) }
        } else {
          return { ...state, activeCeilsList: [...state.activeCeilsList, action.ceilId] }
        }
      }
      
      case "GAME/CLEAR_ACTIVE_CEIL": {
        return { ...state, activeCeilsList: [] };
      }
  
      default:
        return state;
    }
  };

//actions
export const setLevel = (level) => ({
    type: "GAME/SET_LEVEL",
    payload: { level },
  });

export const setBid = (bid) => ({
    type: "GAME/SET_BID",
    payload: { bid },
  });

export const setSteps = (listOfSteps) => ({
    type: "GAME/SET_STEPS",
    payload: { listOfSteps },
  });

export const viewWin = (isWinView) => ({
    type: "GAME/VIEW_WIN",
    payload: { isWinView },
  });

export const viewLose = (isLoseView) => ({
    type: "GAME/VIEW_LOSE",
    payload: { isLoseView },
  });

export const setOpenStart = (isOpenStart) => ({
    type: "GAME/SET_OPEN_START",
    payload: { isOpenStart },
  });

export const setCorrectAnswerList = (correctAnswerList) => ({
    type: "GAME/SET_CORRECT-ANSWER_LIST",
    payload: { correctAnswerList },
  });

export const setGameParams = (gameParams) => ({
    type: "GAME/SET_GAME_PARAMS",
    payload: { gameParams: {...gameParams} },
  });

export const clearActiveCeil = { type: "GAME/CLEAR_ACTIVE_CEIL" }
  
export const toggleActiveCeil = (ceilId) => ({
    type: "GAME/TOGGLE_ACTIVE_CEIL",
    ceilId,
  });
  
//thunk

export const pressStartTC = (bid = 2) => (dispatch) => {
  // закрываем модалку
  dispatch(setOpenStart(false));

  // выставляем настройки игры соответственно уровню сложности
  dispatch(addGameParamsTC());

  // генерируем ставку
  // const bid = getRandomInt(2, 9)
  dispatch(setBid(bid));

  // добавляем список шагов для текущей игры
  dispatch(addListOfStepsTC());

  // добавляем правильный ответ для текущей игры (список чисел)
  dispatch(addCorrectAnswerListTC());

};

// настройки сложности игры
export const addGameParamsTC = () => (dispatch, getState) => {
  const level = getState().game.level;
  let gameParams = {
    aspectRatio: 3,
    timer: 3,
    bidCoefficient: 1,
  }

  switch (level) {
    case "medium": 
      gameParams = {...gameParams, timer: 2};
      break;
    case "hard": 
      gameParams = {...gameParams, aspectRatio: 4, timer: 2};
      break;
    case "extra hard": 
      gameParams = { aspectRatio: 4, timer: 1.5, bidCoefficient: 2};
      break;
    default: gameParams = {...gameParams};
  }

  dispatch(setGameParams(gameParams));
};

export const addListOfStepsTC = () => (dispatch, getState) => {
  const bid = getState().game.bid;
  const aspectRatio = getState().game.gameParams.aspectRatio;
  const bidCoefficient = getState().game.gameParams.bidCoefficient;

  // получаю рандомно сгенерированный набор уникальных значений в заданном диапозоне (new Set)
  const listOfSteps = getSteps(aspectRatio, bid, bidCoefficient)
  dispatch(setSteps([...listOfSteps]));

};

export const addCorrectAnswerListTC = () => (dispatch, getState) => {
  const bid = getState().game.bid;
  const listOfSteps = getState().game.listOfSteps;
  const correctAnswerlist = getCorrectAnswerList(listOfSteps, bid)
  dispatch(setCorrectAnswerList(correctAnswerlist));
};

export const viewWinTC = () => (dispatch, getState) => {
  const bid = getState().game.bid;
  dispatch(setBid(null)); // скроет игровое поле до появления новой ставки
  dispatch(viewWin(true)) // открывает попап "You WIN"

  if (bid === 9) {
    setTimeout(() => {
      dispatch(viewWin(false))
      dispatch(clearActiveCeil) // очистит список активных ячеек
      dispatch(setOpenStart(true)) // открывает стартовое диалоговое окно игры
    }, 1000)
  } else {
    setTimeout(() => {
      dispatch(viewWin(false))
      dispatch(clearActiveCeil)
      dispatch(pressStartTC(bid + 1))
    }, 1000)
  }
};

export const viewLoseTC = () => (dispatch) => {
  dispatch(setBid(null)); // скроет игровое поле до появления новой ставки
  dispatch(viewLose(true)) // открывает попап "You WIN"
 
  setTimeout(() => {
    dispatch(viewLose(false))
    dispatch(clearActiveCeil) // очистит список активных ячеек
    dispatch(setOpenStart(true)) // открывает стартовое диалоговое окно игры
  }, 2000)
};