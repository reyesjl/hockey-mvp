import axios from "axios";
const API_DEV_URL = import.meta.env.VITE_API_BACKEND_DEV;
const API_PROD_URL = import.meta.env.VITE_API_BACKEND_PROD;
const API_BASE_URL = import.meta.env.VITE_NODE_ENV === 'production' ? API_PROD_URL : API_DEV_URL;

export const apiConfig = {
    baseURL: API_BASE_URL,
};

export const axiosInstance = axios.create(apiConfig);