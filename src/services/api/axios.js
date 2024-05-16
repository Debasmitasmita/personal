// import axios from 'axios';
// import { refreshTokenIfNeeded, getAccessToken } from './authService';

// const axiosInstance = axios.create();

// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const accessToken = getAccessToken();
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       await refreshTokenIfNeeded();
//       return axiosInstance(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const axiosPublic= axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});