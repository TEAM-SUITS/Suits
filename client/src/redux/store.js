import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './storage';

/* ------------------------------- middlewares ------------------------------ */

const middlewares = [logger, thunk];

/* ---------------------------------- store --------------------------------- */

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

/* ------------------------ store provider component ------------------------ */

export const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
