import axios, { AxiosInstance } from "axios";
const backendApiAxios:AxiosInstance = axios.create({
    baseURL:import.meta.env.BACKEND_URL,
    timeout:5000
});

export {backendApiAxios};