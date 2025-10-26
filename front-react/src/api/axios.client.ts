import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getToken } from "./token.service.ts";

let csrfToken: string | null = null;


const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "/api",
    timeout: 8000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

http.interceptors.request.use((config) => {
    if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
    }
    return config;
});

http.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            const token = await getToken();

            if (token) {
                csrfToken = token;
                originalRequest.headers = {
                    ...originalRequest.headers,
                    'X-CSRF-Token': csrfToken,
                };
                return http(originalRequest);
            }
        }

        return Promise.reject(error);
    }
);

export { http };