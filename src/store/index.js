import { createStore , applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga'

import todoApp from './reducer';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
  // other store enhancers if any
);


const appStore =  createStore(
  todoApp,
  enhancer
)

sagaMiddleware.run(saga);

export default appStore;