import axios, { AxiosInstance } from "axios";
const backendApiAxios:AxiosInstance = axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    timeout:2000
});

export {backendApiAxios};