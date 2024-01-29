import { TBill } from "@/TypeDefinitions/Bill"
import { TTransaction } from "@/TypeDefinitions/Transaction"
import TopPriorityBillsBanner from "@/components/ui/TopPriorityBillsBanner/TopPriorityBillsBanner"
import { toast } from "@/components/ui/use-toast"
import { billsService } from "@/services/api/BillsService"
import { transactionService } from "@/services/api/TransactionsService"
import { AxiosResponse } from "axios"
import { useEffect, useState } from "react";


function DashBoardPage() {


	const [transactions,setTransactions] = useState<TTransaction[]>([]);
	const [topPriorityBills,setTopPriorityBills] = useState<TBill[]>([]);

	useEffect(()=>{

		function getAllTransactionsOfUser(){
			transactionService.getAllTransactions().then((response:AxiosResponse)=>{
				setTransactions(response.data);
			}).catch(()=>{
				toast({
					title:'unable to fetch transctions',
					variant:'destructive'
				})
			})
		}

		getAllTransactionsOfUser();
	},[]);


	useEffect(()=>{
		
		getTopPriorityBillsOfUser();

		function getTopPriorityBillsOfUser(){
			const numberOfTopPriorityBills = 3;
			billsService.getRecentBills(numberOfTopPriorityBills).then((response:AxiosResponse)=>{
				setTopPriorityBills(response.data);
			}).catch(()=>{
				toast({
					title:'unable to get the bills',
					variant:'destructive'
				})
			})
		}


	},[])

  return (
    <section className='h-full w-full flex items-center justify-center' >
        <TopPriorityBillsBanner topPriorityBills={topPriorityBills} />
    </section>
  )
}

export default DashBoardPage;

