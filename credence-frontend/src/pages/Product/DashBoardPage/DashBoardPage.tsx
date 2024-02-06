import { TBill } from "@/TypeDefinitions/Bill"
import { TTransaction } from "@/TypeDefinitions/Transaction"
import { TUserDetails } from "@/TypeDefinitions/UserDetails";
import { toast } from "@/components/ui/use-toast"

import { billsService } from "@/services/api/BillsService"
import { transactionService } from "@/services/api/TransactionsService"
import { userDetailsService } from "@/services/api/UserDetailsService";
import { AxiosResponse } from "axios"
import { useEffect, useState } from "react";
import UserProfile from "./UserProfile/UserProfile";
import TopPriorityBillsBanner from "@/components/ui/TopPriorityBillsBanner/TopPriorityBillsBanner";
import { Doughnut } from "react-chartjs-2";
import DhoughNutChart from "@/components/ui/DhoughNutChart/DhoughNutChart";
import LineChart from "@/components/ui/LineChart/LineChart";
import TransactionTable from "@/components/TransactionTable/TransactionTable";

function DashBoardPage() {

	const [transactions,setTransactions] = useState<TTransaction[]>([]);
	const [topPriorityBills,setTopPriorityBills] = useState<TBill[]>([]);
	const [userDetails,setUserDetails] = useState<TUserDetails>({
		userEmail:'',
		userId:null,
		userName:'',
		gender:null
	});

	const date = new Date().toDateString()

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
	},[]);

	useEffect(()=>{
		userDetailsService.getUserDetails().then((response)=>{
			setUserDetails(response.data);
		}).catch((_err)=>{
			toast({
				title:'failed to fetch the userDetails',
				variant:'destructive'
			})
		})
	},[])

  return (
    <section className='h-full w-full  flex items-center justify-center p-3 pl-5 gap-4 ' >
        <div className="stas_section h-full flex-[0.75] overflow-y-scroll">
			<div className="dashboard_header mt-5">
				<h1 className="text-2xl font-medium " >Dashboard</h1>
				<p className="text-base text-gray-400 mt-1" > {date} </p>
			</div>
			<div className="topreminders_section w-full mt-6">
				<TopPriorityBillsBanner topPriorityBills={topPriorityBills} />
			</div>
			<div className="graphs h-[30rem] flex w-full justify-between ">
				<div className="graph_left w-[45%] ">
					<DhoughNutChart transactions={transactions} />
				</div>
				<div className="graph_right w-[45%] ">
					<LineChart transactions={transactions} />
				</div>
			</div>
			<div className="transaction_tables mt-16 ">
				<TransactionTable transactions={transactions} />
			</div>
		</div>
		<div className="user_profile_section h-full flex-[0.25] ">
			<UserProfile userDetails={userDetails} />
		</div>
    </section>
  )
}

export default DashBoardPage;

