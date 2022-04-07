import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { rootWatcher } from './sagas';
import rootReducer from './reducers';

const devMode = process.env.REACT_APP_NODE_ENV === 'development';
const saga = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    devTools: devMode,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger, saga),
});

saga.run(rootWatcher);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
