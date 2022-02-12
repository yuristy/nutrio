import { put, takeEvery } from 'redux-saga/effects';
import AuthService from '../../../services/authService';
import {
    IAuthInfo,
    IAction,
    IAuthResponse,
    IUserInfo,
} from '../../../interfaces';
import { setUserInfo } from '../../reducers/authReducer/authActions';

function* registrationWorker(action: IAction<IAuthInfo>) {
    const { email, password } = yield action.payload;
    const response: IAuthResponse = yield AuthService.registration(
        email,
        password
    );
    const userInfo: IUserInfo = { isAuthenticated: false, user: response.user };
    yield put(setUserInfo(userInfo));
}
function* loginWorker() {}

function* authWatcher() {
    yield takeEvery('DO_REGISTRATION', registrationWorker);
    yield takeEvery('DO_LOGIN', loginWorker);
}

export default authWatcher;
