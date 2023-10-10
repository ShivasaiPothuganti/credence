
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import TransactionList from '@/components/ui/TransactionList';
import { FormGeneratorData } from '@/TypeDefinitions/FormGeneratorData';
import Form from '@/components/ui/form';
import { logger } from '@/helpers/loggers/logger';
import { transactionService } from '@/services/api/TransactionsService';
import { TTransaction } from '@/TypeDefinitions/Transaction';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';

function TransactionsPage() {

  const [transactionList,setTransactionsList] = useState<TTransaction[]>([]);


  const addTransactionFormGenerator:FormGeneratorData[] = [
	{
		type:'text',
		placeholder:'Title ',
		name:'title',
		elementProps:{
			required:true,
			minLength:3,
		}
	},
	{
		type:'text',
		placeholder:'price ',
		name:'price'
	},
	{
		type:'textarea',
		placeholder:'Description',
		name:'description'
	},
	{
		type:'date',
		placeholder:'Date',
		name:'dateOfTransaction'
	},
	{
		type:'select',
		placeholder:'Select Category',
		name:'category',
		elementProps:{
			selectPlaceholder:'Category',
			selectLabel:'Category',
			selectItems:[
				{
					value:'food',
					text:'Food'
				},
				{
					value:'movie',
					text:'Movie'
				},
				{
					value:'travelling',
					text:'Travelling'
				},
				{
					value:'shopping',
					text:'Shopping'
				}
			]
		}
	},
	{
		type:'submit',
		name:'addTransaction',
		value:'AddTransaction'
	}
  ]
  function handleAddTransactionSubmit(transaction:TTransaction){
	transactionService.addTransaction(transaction).then((response:AxiosResponse)=>{
		const newTransaction:TTransaction = response.data;
		toast({
			title:'Transaction added!',
			variant:'default'
		})
		setTransactionsList([...transactionList,newTransaction]);
	})
	.catch((err)=>{
		toast({
			title:'Unable to add the Transaction',
			variant:'destructive'
		})
	})
  }

  function handleDeleteTransaction(id:number){
	transactionService.deleteTransaction(id).then((response)=>{
		if(response&&response.status===200){
			setTransactionsList((previousState)=>{
				return previousState.filter((transaction)=> transaction.transactionId!==id )
			})
		}
		toast({
			title:'Transaction Deleted',
			variant:'default'
		})
	}).catch((err)=>{
		logger.debug(err);
		toast({
			title:'Unexpected error',
			variant:'destructive'
		})
	})
  }


  useEffect(()=>{
    transactionService.getAllTransactions().then((response:AxiosResponse)=>{
      if(response&&response.data){
        setTransactionsList(response.data)
      }
    }).catch((error)=>{
		toast({
			title:'Unable to get the transactions',
			variant:'destructive'
		})
	})
  },[])

  return (
    <section className=' bg-white h-screen w-full p-10 flex items-center justify-center ' >
		<Toaster />
      <div className="transactions-container h-full flex-[0.7]">
		<TransactionList deleteTransactions = {handleDeleteTransaction} transactions={transactionList} />
      </div>
      <div className=" bg-white transactionPage-rightPanel-container h-full p-5 flex-[0.3]">
        <div className="transactionPage-rightPanel h-full rounded-lg p-7 ">
          <Form generatorData={addTransactionFormGenerator} onSubmit={handleAddTransactionSubmit} />
		  <div className="filterOptions">
			{/* 

				title
				range of date
				category
				roomsOnly
				groupsOnly
				personal Transactions.....
				range Of price
				

			 */}
		  </div>
        </div>
      </div>
    </section>
  )
}

export default TransactionsPage;