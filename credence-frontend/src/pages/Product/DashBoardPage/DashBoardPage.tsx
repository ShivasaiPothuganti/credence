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
import DhoughNutChart from "@/components/ui/DhoughNutChart/DhoughNutChart";


function DashBoardPage() {


	const [transactions,setTransactions] = useState<TTransaction[]>([]);
	const [topPriorityBills,setTopPriorityBills] = useState<TBill[]>([]);
	const [userDetails,setUserDetails] = useState<TUserDetails>({
		userEmail:'',
		userId:null,
		userName:'',
		gender:null
	});

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
    <section className='h-full w-full flex items-center justify-center p-3 ' >
        <div className="stas_section h-full flex-[0.75]">

		</div>
		<div className="user_profile_section h-full flex-[0.25] ">
			<UserProfile userDetails={userDetails} />
		</div>
    </section>
  )
}

export default DashBoardPage;

