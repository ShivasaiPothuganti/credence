import { backendApiUrls } from "@/constants/backendApiEndpoints";
import { backend } from "./Network/HttpHelper";
import { AxiosResponse } from "axios";

class CategoryService{

    addCategory(categories:string[]):Promise<AxiosResponse<unknown,unknown>>{
       return backend.put(backendApiUrls.updateCategories,categories);
    }

    getCategories():Promise<AxiosResponse<unknown,unknown>>{
        return backend.get(backendApiUrls.getCategories);
    }

    deleteCategory(categories:string[]):Promise<AxiosResponse<unknown,unknown>>{
        return backend.delete(backendApiUrls.deleteCategories,categories);
    }

}

export const categoryService = new CategoryService();