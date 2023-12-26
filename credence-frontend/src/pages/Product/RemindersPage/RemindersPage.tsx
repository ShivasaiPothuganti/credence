/* eslint-disable no-mixed-spaces-and-tabs */
import { Bill } from "@/TypeDefinitions/Bill";
import { FormGeneratorData } from "@/TypeDefinitions/FormGeneratorData";
import Form from "@/components/ui/form";
import { logger } from "@/helpers/loggers/logger";
import { billsService } from "@/services/api/BillsService";
import React, { useEffect, useState } from "react";

function RemindersPage() {
  const [bills, setBills] = useState<Bill[]>([]);


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

  async function addBill(data:Bill):Promise<void>{
	console.log(data)
	try{
		const response = await billsService.addBill(data);
		logger.debug(response);
	}
	catch(error){
		logger.warn(error);
	}
  }

  function toggleBillStatus(billId:number):void{
	
  }

  function deleteBill(billId:number):void{

  }

  return (
    <section className="h-full w-full flex justify-center items-center">
      <div className="remainder_container">
		<div className="display_bill">
			{bills.map((bill) => {
			return <h1>{bill.title}</h1>;
			})}
		</div>
		<div className="add_bill">
			<Form generatorData={addBillFormGenerator} onSubmit={addBill} />
		</div>
	  </div>
    </section>
  );
}

export default RemindersPage;
