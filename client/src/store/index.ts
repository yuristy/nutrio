import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootWatcher } from './sagas';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const saga = createSagaMiddleware();

const store = createStore(
    rootReducer,
    compose(applyMiddleware(saga), composeWithDevTools())
);

saga.run(rootWatcher);

export default store;
