import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/index'
import api from '../middleware/api'
import createSagaMiddleWare from 'redux-saga';
import rootSaga from '../sagas/index'
const sagaMiddleWare = createSagaMiddleWare();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(rootSaga);