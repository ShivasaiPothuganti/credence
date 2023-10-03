import { logger } from "../../../helpers/loggers/logger";
import {backendApiAxios} from "./axiosBaseConfig";
import {backendApiUrls} from '../../../constants/backendApiEndpoints';
import { authenticationService } from "../Authentication";

backendApiAxios.interceptors.request.use( request => {
    if(request.url?.startsWith(backendApiUrls.authorization)){
        logger.debug("authenticating the user....");
        return request;
    }
    const token = localStorage.getItem('token');
    if(token){
        request.headers.Authorization = `Bearer ${token}`;
    }
    else{
        logger.error('authorization token is missing');
    }
    return request;
});

backendApiAxios.interceptors.response.use( response =>{
    if(response.status===401){
        logger.error("invalid token");
        authenticationService.removeToken();
    }
    return response;
},error=>{
    return Promise.reject(error);
})


export default backendApiAxios;
