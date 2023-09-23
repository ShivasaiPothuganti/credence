import {AxiosResponse } from "axios";
import backendApiAxios from "./HttpInterceptors";


const backend  = {
    post:(apiEndpoint:string,data:unknown):Promise<AxiosResponse>=>{
        return backendApiAxios.post(apiEndpoint,data);
    },
    get:(apiEndpoint:string,options={}):Promise<AxiosResponse>=>{
        console.log(options);
        return backendApiAxios.get(apiEndpoint);
    },
    put:(apiEndpoint:string,data:unknown):Promise<AxiosResponse>=>{
        return backendApiAxios.put(apiEndpoint,data);
    },
    delete:(apiEndpoint:string):Promise<AxiosResponse>=>{
        return backendApiAxios.delete(apiEndpoint);
    },
    patch:(apiEndpoint:string,data:unknown):Promise<AxiosResponse>=>{
        return backendApiAxios.patch(apiEndpoint,data);
    }
}

export {backend};

/**
 * 
 * url
 * method
 * baseUrl
 * transformRequest : function
 * transformResponse : function
 * headers
 * params
 * paramsSerializer : Function
 * data : { }
 * timeout ; 
 * withCredentials : boolean = false;
 * adapter : function (config) -> custom request handler 
 * auth : { username:'',password:'' }
 * responseType
 * onUploadProgress
 * onDownloadProgress
 * maxContentLength
 * maxBodyLength
 * validateStatus : function(status)->boolean
 * proxy:{}
 * 
 */