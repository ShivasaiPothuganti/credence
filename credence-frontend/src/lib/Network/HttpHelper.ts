import { instance } from "./HttpInterceptors";
class HttpClient {

    post(url:string){
        return instance.post(url);
    }
    get(url:string){
        return instance.get(url);
    }

    put(url:string){
        return instance.put(url);
    }

    patch(url:string){
        return instance.patch(url)
    }

    delete(url:string){
        return instance.delete(url);
    } 
}

export const http = new HttpClient();