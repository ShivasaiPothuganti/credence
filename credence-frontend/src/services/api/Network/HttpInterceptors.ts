import { logger } from "../../../helpers/loggers/logger";
import {backendApiAxios} from "./axiosBaseConfig";
import {backendApiUrls} from '../../../constants/backendApiEndpoints';
import { authenticationService } from "../Authentication";


backendApiAxios.interceptors.request.use( request => {
    if(request.url?.startsWith(backendApiUrls.authorization)){
        logger.debug("authenticating the user....");
        return request;
    }
    const token = localStorage.getItem('authenticationToken');
    if(token){
        logger.debug(token,"token found")
        request.headers.Authorization = `Bearer ${token}`;
        return request;
    }
    window.location.href = '/authenticate?mode=login';
    return request;
});

backendApiAxios.interceptors.response.use( response =>{
    return response;
},error=>{
    if(error.response.status===401){
        authenticationService.removeToken();
        window.location.href = '/authenticate?mode=login';
    }
    else if(error.response.status===403){
        logger.error("forbidden request");
    }
    return Promise.reject(error);
})


export default backendApiAxios;
