import { backend } from '@/services/api/Network/HttpHelper';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import {backendApiUrls} from '@/constants/backendApiEndpoints'; 

function TransactionsPage() {

  const [transactionList,setTransactionsList] = useState([]);

  useEffect(()=>{
    backend.get(backendApiUrls.getListOfUsersTransactions).then((response:AxiosResponse)=>{
      if(response&&response.data){
        setTransactionsList(response.data)
      }
    })
  },[])

  return (
    <section className='h-full w-full flex items-center justify-center ' >
      {
        transactionList.map((transaction:{title:string},index)=>{
          return <h1 key={index} >{transaction.title}</h1>
        })
      }
    </section>
  )
}

export default TransactionsPage;