import React from 'react'
import TopPriorityBillCard from '../TopPriorityBillCard/TopPriorityBillCard'
import { TBill } from '@/TypeDefinitions/Bill'


type TopPriorityBillCardProps = {
    topPriorityBills:TBill[]
}


function TopPriorityBillsBanner({topPriorityBills}:TopPriorityBillCardProps) {
  return (
    <div className='w-full h-[10rem] overflow-x-scroll flex gap-96 rounded-md'>
        {
            topPriorityBills.map((bill)=>{
                return <TopPriorityBillCard bill={bill} />
            })
        }
    </div>
  )
}

export default TopPriorityBillsBanner