import { TTransaction } from '@/TypeDefinitions/Transaction';
import  Transaction  from '@/components/ui/Transaction';
import React from 'react';


type TTransactionList = {
    transactions:TTransaction[],
    // eslint-disable-next-line @typescript-eslint/ban-types
    deleteTransactions:Function
}

function TransactionList({transactions,deleteTransactions}:TTransactionList) {


  return (
    <section className='h-full flex flex-col gap-2 w-full p-4 overflow-y-auto overflow-x-hidden' >
        {
          transactions.map((transaction:TTransaction)=>{
              return <Transaction deleteTransaction={deleteTransactions} transaction={transaction} />
          })
        }
    </section>
  )
}

export default TransactionList