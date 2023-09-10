import axios from "axios";
axios.interceptors.request.use( req => {
    console.log("intercepted the request");
    console.log(req);
    return req;
});