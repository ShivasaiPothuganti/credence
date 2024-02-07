import { backendApiUrls } from "@/constants/backendApiEndpoints";
import { backend } from "./Network/HttpHelper";
import { AxiosResponse } from "axios";


class CategoryService{

    addCategory(categories:string[]):Promise<AxiosResponse<unknown,unknown>>{
        const requestBody = {
            categories:categories
        }
       return backend.put(backendApiUrls.updateCategories,requestBody);
    }

    getCategories():Promise<AxiosResponse<unknown,unknown>>{
        return backend.get(backendApiUrls.getCategories);
    }

    deleteCategory(categories:string[]):Promise<AxiosResponse<unknown,unknown>>{
        const requestBody = {
            categories:categories
        }
        return backend.delete(backendApiUrls.deleteCategories,requestBody);
    }

}

export const categoryService = new CategoryService();