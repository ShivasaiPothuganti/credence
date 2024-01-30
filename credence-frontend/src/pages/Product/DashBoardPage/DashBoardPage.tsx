import { TBill } from "@/TypeDefinitions/Bill"
import { TTransaction } from "@/TypeDefinitions/Transaction"
import DhoughNutChart from "@/components/ui/DhoughNutChart/DhoughNutChart";
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
        <div className="stas_section h-full flex-[0.7] ">
			<DhoughNutChart transactions={transactions} renderChartBasedOn='TransactionType' />
		</div>
		<div className="user_profile_section h-full flex-[0.3] ">

		</div>
    </section>
  )
}

export default DashBoardPage;

