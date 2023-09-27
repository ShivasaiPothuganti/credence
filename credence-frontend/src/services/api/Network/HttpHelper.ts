import {AxiosInstance, AxiosResponse } from "axios";
import backendApiAxios from "./HttpInterceptors";

function addHttpMethods(instance:AxiosInstance){
    const httpMethods  = {
        post:(apiEndpoint:string,data:unknown):Promise<AxiosResponse>=>{
            return instance.post(apiEndpoint,data);
        },
        get:(apiEndpoint:string,options={}):Promise<AxiosResponse>=>{
            console.log(options);
            return instance.get(apiEndpoint);
        },
        put:(apiEndpoint:string,data:unknown):Promise<AxiosResponse>=>{
            return instance.put(apiEndpoint,data);
        },
        delete:(apiEndpoint:string):Promise<AxiosResponse>=>{
            return instance.delete(apiEndpoint);
        },
        patch:(apiEndpoint:string,data:unknown):Promise<AxiosResponse>=>{
            return instance.patch(apiEndpoint,data);
        }
    }
    return httpMethods;
}

const backend  = addHttpMethods(backendApiAxios);

export {
    backend
};

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