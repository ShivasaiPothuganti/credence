/* eslint-disable no-mixed-spaces-and-tabs */
import { TBill } from "@/TypeDefinitions/Bill";
import { FormGeneratorData } from "@/TypeDefinitions/FormGeneratorData";
import Form from "@/components/ui/form";
import { logger } from "@/helpers/loggers/logger";
import { billsService } from "@/services/api/BillsService";
import { useEffect, useState } from "react";
import BillsList from "./BillsList/BillsList";
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import SearchBar from "@/components/ui/searchbar";
import FilterBills from "@/components/FilterBills/FilterBills";
import { Button } from "@/components/ui/button";


function RemindersPage() {
  const [bills, setBills] = useState<TBill[]>([]);
  const [filteredBills,setFilteredBills] = useState<TBill[]>(null);
  const [billDueStatus,setBillDueStatus] = useState(false);


  const addBillFormGenerator:FormGeneratorData[] = [
	{
		name:'title',
		type:'text',
		placeholder:'Title'
	},
	{
		name:'price',
		type:'number',
		placeholder:'Amount'
	},
	{
		name:'expiryDate',
		type:'date',
		placeholder:'ExpiryDate'
	},
	{
		name:'description',
		type:'textarea',
		placeholder:'Description'
	},
	{
		name:'submit',
		type:'submit',
		value:'Add Bill'
	}
  ]

  useEffect(() => {
    async function getBills() {
      try{
		const response = await billsService.getBills();
		if(response&&response.data){
			logger.debug(response.data)
			setBills(response.data);
		}
	  }
	  catch(error){
		logger.warn(error);
	  }
    }
    getBills();
  }, []);

  async function addBill(data:TBill):Promise<void>{
	console.log(data)
	try{
		const response = await billsService.addBill(data);
		if(response&&response.data){
			setBills((previousState)=>{
				return [...previousState,response.data];
			});
		}
	}
	catch(error){
		toast({
			variant:'destructive',
			title:'Failed to add Bill'
		})
	}
  }

  async function toggleBillStatus(billId:number){
	try{
		const response = await billsService.toggleStatus(billId);
		if(response&&response.data){
			setBills((previousState)=>{
				return previousState.map((bill,index,array)=>{
					if(bill.id==billId) array[index].status = !bill.status;
					return bill;
				});
				
			})
		}
	}
	catch(error){
		toast({
			title:"unable to toggle",
			variant:'destructive'
		})
	}
  }

  function filterBillsByStatus(dueBillToggleValue:boolean){
	setBillDueStatus(dueBillToggleValue);
		if(dueBillToggleValue===true){
			if(filteredBills!=null){
				const activeBills = filteredBills.filter((bill)=>bill.status);
				setFilteredBills(activeBills);
			}
			else{
				const activeBills = bills.filter((bill)=>bill.status);
				setFilteredBills(activeBills);
			}
		}
		else{
			setFilteredBills(null);
		}
  }

  async function deleteBill(billId:number){
	try{
		const response = await billsService.deleteBill(billId);
		if(response&&response.data){
			setBills((previousState)=>{
				return previousState.filter((bill)=>{
					return bill.id!==billId
				})
			})
		}
	}
	catch(error){
		toast({
			title:'Unable to delete the bill',
			variant:'destructive'
		})
	}

  }

  function searchBill(searchQuery:string){
	searchQuery = searchQuery.trim();
	if(searchQuery===""||searchQuery===null){
		setFilteredBills([]);
	}

	const resultBills = bills.filter((bill)=>{
		return bill.title.includes(searchQuery);
	});
	setFilteredBills(resultBills);
  }

  return (
    <section className="h-full w-full flex justify-center p-10 items-center">
      <div className="remainder_container h-full w-full flex ">
		<div className="display_bill flex-[0.85] flex flex-col h-full gap-10 ">
			<div className="filter flex justify-between ">
				<SearchBar getSearchQuery={searchBill} />
				<div className="filter_options_container flex gap-10">
					<Button onClick={()=>{ setBillDueStatus(false); setFilteredBills(null) }} >Show all bills</Button>
					<FilterBills bills={bills} setFilteredBills={setFilteredBills} />
					<div className="flex gap-5">
						<Switch 
							checked={billDueStatus}
							onCheckedChange={filterBillsByStatus}
						/>
						<h1 className="text-lg font-semibold" >Bills Due</h1>
					</div>
				</div>
			</div>
			<BillsList bills={ filteredBills? filteredBills:bills } deleteBillHandler={deleteBill} toggleBillStatusHandler={toggleBillStatus} />
		</div>
		<div className="add_bill flex-[0.25] pt-20 pl-10 pr-5 ">
			<Form generatorData={addBillFormGenerator} onSubmit={addBill} />
		</div>
	  </div>
    </section>
  );
}

export default RemindersPage;
