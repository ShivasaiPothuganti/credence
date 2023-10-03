import { backend } from "./Network/HttpHelper";
import { storageService } from "../Storage/storageService";
import { UserCredentials } from "@/TypeDefinitions/UserCredentials";
import { AxiosResponse } from "axios";
import { logger } from "@/helpers/loggers/logger";

class AuthenticationService{


    login(userCredentials:UserCredentials):Promise<AxiosResponse>{
        const {userName,password,userEmail} = userCredentials;
        const requestBody = {userName,password,userEmail};
        logger.debug(requestBody);
        return backend.post('/authenticate/login',requestBody);
    }

    register(userCredentials:UserCredentials):Promise<AxiosResponse>{
        const {userName,password,userEmail} = userCredentials;
        const requestBody = {userName,password,userEmail};
        logger.debug(requestBody);
        return backend.post('/authenticate/register',requestBody);
    }

    authenticate(mode:string,userCredentials:UserCredentials):Promise<AxiosResponse>{
        logger.debug(userCredentials);
        if(mode==='login'){
           return this.login(userCredentials);
        }
        else {
           return this.register(userCredentials);
        }
    }


    setToken(token:string):void{
        storageService.setItem('authenticationToken',token)
    }   

    getToken():string|null{
        return storageService.getItem('authenticationToken');
    }

    removeToken():void{
        return storageService.removeItem('authenticationToken');
    }

}

const authenticationService = new AuthenticationService;
export {authenticationService};