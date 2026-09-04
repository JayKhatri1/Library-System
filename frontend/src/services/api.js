import axios from "axios";

// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1"
// });

const API_URL = import.meta.env.DEV
    ? "http://localhost:5000/api/v1"
    : import.meta.env.VITE_API_URL;


if (!API_URL) {
    throw new Error(
        "VITE_API_URL is missing in production environment."
    );
}


const api = axios.create({
    baseURL: API_URL
});

// ==========================================
// AXIOS REQUEST INTERCEPTOR
// ==========================================

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


// ==========================================
// AXIOS RESPONSE INTERCEPTOR
// ==========================================

api.interceptors.response.use(

    (response) => {
        return response;
    },

    (error) => {

        // Don't redirect automatically here.
        // Login page will handle 401 errors
        // such as "Invalid credentials".

        return Promise.reject(error);
    }

);


export default api;