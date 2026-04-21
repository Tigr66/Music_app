import axios, { type InternalAxiosRequestConfig } from "axios";

const BASE_URL: string = "http://localhost:8000";

export const musicApi = axios.create({
    baseURL: BASE_URL,
});

musicApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("user_token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

musicApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("user_token");
        }
        return Promise.reject(error);
    },
);
