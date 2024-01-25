import { backendApiUrls } from "@/constants/backendApiEndpoints";
import { backend } from "./Network/HttpHelper";
import { TBill } from "@/TypeDefinitions/Bill";
import { AxiosResponse } from "axios";
import { logger } from "@/helpers/loggers/logger";

class BillsService{
    addBill(bill:TBill):Promise<AxiosResponse>{
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

    getRecentBills(numberOfBills:number):Promise<AxiosResponse>{
        return backend.get(backendApiUrls.getRecentBills+numberOfBills);
    }

    getBillsByStatus(bills:TBill[],status:boolean):TBill[]{
        if(status===true){
            return this.getActiveBills(bills);
        }
        else{
            return this.getInactiveBills(bills);
        }
    }

    private getActiveBills(bills:TBill[]):TBill[]{
        return bills.filter((bill)=>bill.status===true);
    }

    private getInactiveBills(bills:TBill[]):TBill[]{
        return bills.filter((bill)=>bill.status===false);
    }

}

export const billsService = new BillsService();

