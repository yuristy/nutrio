import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { API_URL, token } from '../variables.js';

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

export default $api;
