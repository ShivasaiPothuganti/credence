import { backend } from '@/services/api/Network/HttpHelper';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import {backendApiUrls} from '@/constants/backendApiEndpoints'; 
import TransactionList from '@/components/ui/TransactionList';
import { FormGeneratorData } from '@/TypeDefinitions/FormGeneratorData';
import Form from '@/components/ui/form';
import { logger } from '@/helpers/loggers/logger';

function TransactionsPage() {

  const [transactionList,setTransactionsList] = useState([]);


  const addTransactionFormGenerator:FormGeneratorData[] = [
	{
		type:'text',
		placeholder:'Title ',
		name:'title'
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
  function handleAddTransactionSubmit(data:unknown){
	logger.debug(data)
  }

  useEffect(()=>{
    backend.get(backendApiUrls.getListOfUsersTransactions).then((response:AxiosResponse)=>{
      if(response&&response.data){
        setTransactionsList(response.data)
      }
    })
  },[])

  return (
    <section className='h-screen w-full p-10 flex items-center justify-center ' >
      <div className="transactions-container h-full flex-[0.7]">
		<TransactionList transactions={transactionList} />
      </div>
      <div className="transactionPage-rightPanel-container flex-[0.3]">
        <div className="transactionPage-rightPanel ">
          <Form generatorData={addTransactionFormGenerator} onSubmit={handleAddTransactionSubmit} />
        </div>
      </div>
    </section>
  )
}

export default TransactionsPage;