import authWatcher from './authSaga';

export function* rootWatcher() {
    yield authWatcher();
}
