import axios, { InternalAxiosRequestConfig, Method } from 'axios';

const AxiosInstance = () => {
    const instance = axios.create({
        baseURL: 'http://localhost:3000',
    });

    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig<any>) => {
            const token = localStorage.getItem('authToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    return instance;
};

export default AxiosInstance;