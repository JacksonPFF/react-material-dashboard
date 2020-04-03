import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';
import rootEpic from '../_epics';

const epicMiddleware = createEpicMiddleware();
const loggerMiddleware = createLogger();

export function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware,
      epicMiddleware,
      loggerMiddleware,
    ),
  );
  epicMiddleware.run(rootEpic);

  return store;
}
