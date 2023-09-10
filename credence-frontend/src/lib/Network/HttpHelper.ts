import axios from "axios";

class HttpClient {

    baseUrl = 'http://localhost:3000'
    post(){
        return axios.post('',{});
    }
    get(){
        return axios.get(this.baseUrl);
    }

    put(){

    }

    patch(){

    }

    delete(){
        
    }

    
}

export const http = new HttpClient();