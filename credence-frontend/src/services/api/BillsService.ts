import { backendApiUrls } from "@/constants/backendApiEndpoints";
import { backend } from "./Network/HttpHelper";
import { Bill } from "@/TypeDefinitions/Bill";
import { AxiosResponse } from "axios";
import { logger } from "@/helpers/loggers/logger";

class BillsService{
    addBill(bill:Bill):Promise<unknown>{
        logger.debug(bill);
        // return new Promise<unknown>(()=>{});
        return backend.post(backendApiUrls.addBill,bill);
    }
    getBills():Promise<AxiosResponse>{
       return backend.get(backendApiUrls.getBills);
    }
    deleteBill(id:number):Promise<AxiosResponse>{
        return backend.delete(backendApiUrls.deleteBill+id);
    }
    toggleStatus(id:number):Promise<AxiosResponse>{
        return backend.patch(backendApiUrls.toggleBill+id,null);
    }

    getBillsByStatus(bills:Bill[],status:boolean):Bill[]{
        if(status===true){
            return this.getActiveBills(bills);
        }
        else{
            return this.getInactiveBills(bills);
        }
    }

    private getActiveBills(bills:Bill[]):Bill[]{
        return bills.filter((bill)=>bill.status===true);
    }

    private getInactiveBills(bills:Bill[]):Bill[]{
        return bills.filter((bill)=>bill.status===false);
    }

}

export const billsService = new BillsService();

