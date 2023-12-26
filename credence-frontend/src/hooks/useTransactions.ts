import { transactionService } from "@/services/api/TransactionsService";
import { useEffect } from "react";

function useTransactions(){


    useEffect(()=>{


        transactionService.getAllTransactions();



    },[]);
}