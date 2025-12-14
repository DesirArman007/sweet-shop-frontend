import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', 
});

api.interceptors.request.use(
    (config) => {
        try {
            const token = localStorage.getItem('token');
            
            // STRICT CHECK: Only attach token if it is real
            // This prevents sending "Bearer null" or "Bearer undefined"
            if (token && token !== "null" && token !== "undefined" && token !== "") {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (e) {
            console.warn("LocalStorage access blocked");
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;