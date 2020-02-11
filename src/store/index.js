import { createStore , applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'

import todoApp from './reducer';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware()

const appStore =  createStore(
    todoApp,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(saga);

export default appStore;