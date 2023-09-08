import axios from "axios";

class HttpClient {
    post(){
        return axios.post('',{});
    }
}

export const http = new HttpClient();