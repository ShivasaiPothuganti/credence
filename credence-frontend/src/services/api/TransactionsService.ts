import { backendApiUrls } from "@/constants/backendApiEndpoints";
import { backend } from "./Network/HttpHelper";
import { TTransaction } from "@/TypeDefinitions/Transaction";


class TransactionService{

    getAllTransactions(){
        return backend.get(backendApiUrls.getListOfUsersTransactions);
    }

    addTransaction(transaction:TTransaction){
        return backend.post(backendApiUrls.addTransaction,transaction);
    }

    deleteTransaction(transactionId:number){
        return backend.delete(backendApiUrls.deleteTransactions+`${transactionId}`);
    }

}


export const transactionService = new TransactionService();