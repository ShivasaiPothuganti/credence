import { instance } from "./axiosConfig";

instance.interceptors.request.use(function(config){
    // const headers = {

    // }
    // config.transformRequest(config,headers);
    return config;
},function(error){
    console.log(error);
});


export {instance};