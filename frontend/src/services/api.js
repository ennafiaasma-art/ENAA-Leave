import axios from "axios";

export const api = axios.create({
    baseURL: "http://127.0.0.1:8001/api", // المسار الخاص بالـ Backend
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

// إضافة التوكن تلقائياً مع كل الطلبات إذا كان موجوداً
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;