import { GroupTransaction } from '@/TypeDefinitions/GroupTransaction'
import React from 'react'
import GroupTransactionCard from './GroupTransactionCard/GroupTransactionCard'

type InputProps = {
    transactions:GroupTransaction[]
}

export default function GroupTransactionsList({transactions}:InputProps) {
  return (
    <section className='h-full flex flex-col gap-2 w-full p-4 overflow-y-auto overflow-x-hidden' >
        {
            
            transactions.map((transaction:GroupTransaction)=>{
                return <GroupTransactionCard transaction={transaction} />
            })
        }
    </section>
  )
}
