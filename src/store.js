import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducer from './redux/reducers/index';

const middlewares = [promise, thunk];
if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('jureb_redux_state');
    if (serializedState) {
      return JSON.parse(serializedState);
    }
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducer,
  persistedState,
  composeEnhancers(applyMiddleware(...middlewares)),
);
