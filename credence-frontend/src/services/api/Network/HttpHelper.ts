import {AxiosInstance, AxiosResponse } from "axios";
import backendApiAxios from "./HttpInterceptors";

function addHttpMethodsToInstance(instance:AxiosInstance){
    const httpMethods  = {
        post:(apiEndpoint:string,requestBody:unknown):Promise<AxiosResponse>=>{
            return instance.post(apiEndpoint,requestBody);
        },
        get:(apiEndpoint:string):Promise<AxiosResponse>=>{
            return instance.get(apiEndpoint);
        },
        put:(apiEndpoint:string,requestBody:unknown):Promise<AxiosResponse>=>{
            return instance.put(apiEndpoint,requestBody);
        },
        delete:(apiEndpoint:string,requestBody:unknown=null):Promise<AxiosResponse>=>{
            return instance.delete(apiEndpoint,{data:requestBody});
        },
        patch:(apiEndpoint:string,data:unknown):Promise<AxiosResponse>=>{
            return instance.patch(apiEndpoint,data);
        }
    }
    return httpMethods;
}

const backend  = addHttpMethodsToInstance(backendApiAxios);

export {
    backend
};

