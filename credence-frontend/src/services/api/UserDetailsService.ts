import { backendApiUrls } from "@/constants/backendApiEndpoints";
import { backend } from "./Network/HttpHelper";

class UserDetailsService{
    getUserDetails(){
        return backend.get(backendApiUrls.getUserDetails);
    }
}

export const userDetailsService = new UserDetailsService();