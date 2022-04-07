import { AxiosResponse } from 'axios';
import $api from '../http';
import { IAuthResponse } from '../interfaces/index';

class AuthService {
    registration(
        email: string,
        password: string
    ): Promise<AxiosResponse<IAuthResponse>> {
        return $api
            .post('/auth/registration', { email, password })
            .then((response) => response.data);
    }

    login(
        email: string,
        password: string
    ): Promise<AxiosResponse<IAuthResponse>> {
        return $api
            .post('/auth/login', { email, password })
            .then((response) => response.data);
    }

    logout(): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post('/auth/logout');
    }
}

export default new AuthService();
