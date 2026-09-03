import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1"
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