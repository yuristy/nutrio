import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import { API_URL, token } from '../variables.js';
import { IAuthResponse } from '../interfaces/index.js';

const $api: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
    };
    return config;
});

$api.interceptors.response.use((config: AxiosResponse) => {
    return config;
}, async (error) => {
    try {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            const response: AxiosResponse<IAuthResponse> = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken)
            return $api.request(originalRequest);
        }
    }
    catch (e) {
        console.log('НЕ АВТОРИЗОВАН');
    }
    throw error;
});

export default $api;
