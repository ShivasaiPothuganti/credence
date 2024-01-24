import { TTransaction } from "@/TypeDefinitions/Transaction"
import TransactionTable from "@/components/TransactionTable/TransactionTable"
import { toast } from "@/components/ui/use-toast"
import { transactionService } from "@/services/api/TransactionsService"
import { AxiosResponse } from "axios"
import { useEffect, useState } from "react";


function DashBoardPage() {


	const [transactions,setTransactions] = useState<TTransaction[]>([]);



	useEffect(()=>{
		transactionService.getAllTransactions().then((response:AxiosResponse)=>{
			setTransactions(response.data);
		}).catch(()=>{
			toast({
				title:'unable to fetch transctions',
				variant:'destructive'
			})
		})
	},[]);

  return (
    <section className='h-full w-full flex items-center justify-center' >
        <TransactionTable transactions={transactions} />
    </section>
  )
}

export default DashBoardPage