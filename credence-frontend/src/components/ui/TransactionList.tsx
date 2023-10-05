import { TTransaction } from '@/TypeDefinitions/Transaction';
import  Transaction  from '@/components/ui/Transaction';
import React from 'react';


type TTransactionList = {
    transactions:TTransaction[]
}

function TransactionList({transactions}:TTransactionList) {


  return (
    <section className='h-full flex flex-col gap-2 w-full p-4 overflow-y-auto overflow-x-hidden' >
        {
            
            transactions.map((transaction:TTransaction)=>{
                return <Transaction transaction={transaction} />
            })
        }
    </section>
  )
}

export default TransactionList