import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./store/store";
import StartGamePopup from './components/common/StartGamePopup/StartGamePopup';
import YouWinPopup from './components/common/YouWinPopup/YouWinPopup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <StartGamePopup/>
      <YouWinPopup/>
    </Provider>
  </React.StrictMode>
);