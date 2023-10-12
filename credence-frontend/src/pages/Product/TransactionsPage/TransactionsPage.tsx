/* eslint-disable no-mixed-spaces-and-tabs */

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
import { categoryService } from '@/services/api/CategoryService';
import SearchBar from '@/components/ui/searchbar';
import FilterTransactions from '@/components/FilterTransactions/FilterTransactions';

function attachCategoriesToFormData(formDataGeneratorData:FormGeneratorData[],categories:string[]){
	formDataGeneratorData.forEach((_element,index,array)=>{
		if(array[index].type === 'select'&&array[index].elementProps){
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(array[index].elementProps as any )['selectItems'] = categories;
		}
	});
	return formDataGeneratorData;
}

function TransactionsPage() {

  const [transactionList,setTransactionsList] = useState<TTransaction[]>([]);


  const [addTransactionFormGenerator,setAddTransactionFormGenerator] = useState<FormGeneratorData[]>([
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
			selectItems:[]
		}
	},
	{
		type:'submit',
		name:'addTransaction',
		value:'Add'
	}
  ]);

  
  
  function handleAddTransactionSubmit(transaction:TTransaction){
	transactionService.addTransaction(transaction).then((response:AxiosResponse)=>{
		const newTransaction:TTransaction = response.data;
		toast({
			title:'Transaction added!',
			variant:'default'
		})
		setTransactionsList([...transactionList,newTransaction]);
	})
	.catch(()=>{
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
	categoryService.getCategories().then((response:AxiosResponse)=>{
		logger.debug("got the categories",response)
		const categories = response.data;
		setAddTransactionFormGenerator((previousState)=>{
			const newState = attachCategoriesToFormData(previousState,categories);
			return newState;
		});
	})
	.catch((error)=>{
		logger.debug(error);
		toast({
			title:'unable to get the categories',
			variant:'destructive'
		})
	})
  },[])

  useEffect(()=>{
    transactionService.getAllTransactions().then((response:AxiosResponse)=>{
      if(response&&response.data){
        setTransactionsList(response.data)
      }
    }).catch(()=>{
		toast({
			title:'Unable to get the transactions',
			variant:'destructive'
		})
	})
  },[])

  return (
    <section className=' bg-white h-screen w-full p-10 flex items-center justify-center ' >
		<Toaster />
    	<div className="transactions-body h-full flex-[0.7]">
			<div className="transaction-filters flex justify-between pt-10 pb-10 ">
				<SearchBar setSearchQuery={()=>{}} />
				<FilterTransactions />
			</div>
			<div className="transactions-container h-auto w-full flex-[0.7]">
				<TransactionList deleteTransactions = {handleDeleteTransaction} transactions={transactionList} />
			</div>
		</div>
		<div className=" bg-white transactionPage-rightPanel-container h-full p-5 flex-[0.3]">
			<div className="transactionPage-rightPanel h-full rounded-lg p-7 ">
				<h1 className='p-6 text-center text-lg font-bold font-primary' >AddTransaction</h1>
			<Form generatorData={addTransactionFormGenerator} onSubmit={handleAddTransactionSubmit} />
				{/* 
					range of date
					category
					range Of price
				*/}
			</div>
		</div>
    </section>
  )
}

export default TransactionsPage;
