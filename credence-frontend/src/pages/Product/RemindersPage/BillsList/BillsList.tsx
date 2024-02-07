/* eslint-disable @typescript-eslint/ban-types */
import { TBill } from '@/TypeDefinitions/Bill'
import React from 'react'
import BillCard from '../BillCard/BillCard'

type BillsListProps = {
    bills:TBill[],
    deleteBillHandler:Function,
    toggleBillStatusHandler:Function
}

function BillsList({bills,deleteBillHandler,toggleBillStatusHandler}:BillsListProps) {
  return (
    <div className='w-full h-full overflow-scroll content-start flex flex-wrap gap-10' >
        {
            bills.map((bill)=>{
                return <BillCard toggleBillStatusHandler={toggleBillStatusHandler} deleteBillHandler={deleteBillHandler} bill={bill} key={bill.id} />
            })
        }       
    </div>
  )
}

export default BillsList