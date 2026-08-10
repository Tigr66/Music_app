import axios, { type InternalAxiosRequestConfig } from "axios";
import { store } from "../store/store";
import { logoutUserThunk } from "../store/musicSlice/musicThunks";

const BASE_URL: string = "http://localhost:8000";

export const musicApi = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

musicApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("access_token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

musicApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        try {
            const originalRequest = error.config;

            if (error.response?.status !== 401) return Promise.reject(error);

            const response = await axios.post(
                `${BASE_URL}/auth/refresh`,
                {},
                {
                    withCredentials: true,
                },
            );
            const newAccessToken = response.data.accessToken;

            localStorage.setItem("access_token", newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return musicApi(originalRequest);
        } catch (refreshError) {
            store.dispatch(logoutUserThunk());
            return Promise.reject(refreshError);
        }
    },
);
