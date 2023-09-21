import { logger } from "../../helpers/loggers/logger";
import {backendApiAxios} from "./axiosBaseConfig";
import {backendApiUrls} from '../../constants/backendApiEndpoints';

backendApiAxios.interceptors.request.use( request => {
    if(request.url?.startsWith(backendApiUrls.authorization)){
        logger.debug("authorization end point");
        return request;
    }
    const token = localStorage.getItem('token');
    if(token){
        request.headers.Authorization = `Bearer ${token}`;
    }
    logger.error("authorization token is missing");
    return request;
});

backendApiAxios.interceptors.response.use( response =>{
    if(response.status===401){
        logger.error("invalid token");
    }

    window.location.href = '/login';
    return response;
},error=>{
    return Promise.reject(error);
})


export default backendApiAxios;
