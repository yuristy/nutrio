import $api from '../http';
import { AxiosResponse } from 'axios';
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
}

export default new AuthService();
