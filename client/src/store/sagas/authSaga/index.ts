import { put, takeEvery } from 'redux-saga/effects';
import AuthService from '../../../services/authService';
import {
    IAuthInfo,
    IAction,
    IAuthResponse,
    IUserInfo,
} from '../../../interfaces';
import { setUserInfo } from '../../reducers/authReducer/authActions';
import { setLoginLoading, setRegLoading, setLogoutLoading } from '../../reducers/uiReducer/uiActions';

function* registrationWorker(action: IAction<IAuthInfo>) {
    yield put(setRegLoading(true))
    const { email, password } = yield action.payload;
    const response: IAuthResponse = yield AuthService.registration(
        email,
        password
    );
    yield localStorage.setItem('token', response.accessToken)
    const userInfo: IUserInfo = { isAuthenticated: false, user: response.user };
    yield put(setUserInfo(userInfo));
    yield put(setRegLoading(false))
}
function* loginWorker(action: IAction<IAuthInfo>) {
    yield put(setLoginLoading(true))
    const { email, password } = yield action.payload;
    const response: IAuthResponse = yield AuthService.login(
        email,
        password
    );
    yield localStorage.setItem('token', response.accessToken)
    const userInfo: IUserInfo = { isAuthenticated: true, user: response.user };

    yield put(setUserInfo(userInfo));
    yield put(setLoginLoading(false))
}

function* logoutWorker(action: IAction<IAuthInfo>) {
    yield put(setLogoutLoading(true))
    yield action.payload;
    yield AuthService.logout();
    yield localStorage.removeItem('token')
    const userInfo: IUserInfo = {
        isAuthenticated: false, user: {
            email: '',
            id: '',
            roles: [],
            isActivated: false,
        }
    };

    yield put(setUserInfo(userInfo));
    yield put(setLogoutLoading(false))
}

function* authWatcher() {
    yield takeEvery('DO_REGISTRATION', registrationWorker);
    yield takeEvery('DO_LOGIN', loginWorker);
    yield takeEvery('DO_LOGOUT', logoutWorker);
}

export default authWatcher;
