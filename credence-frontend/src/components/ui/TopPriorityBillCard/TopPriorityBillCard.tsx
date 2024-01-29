import { TBill } from '@/TypeDefinitions/Bill';
import { IconFactory } from '@/assets/Icons/IconsFactory';
import React from 'react';
import {transformISOtoDateTime} from '@/utils/formatDate';

type TopPriorityBillCardProp = {
    bill:TBill
}

function TopPriorityBillCard({bill}:TopPriorityBillCardProp) {
  return (
    <div className='flex h-[6rem] w-[20rem] border p-4 rounded-3xl  ' >
      <div className="priorityBill_left h-full flex-[0.3] ">
        <div className="billImageHolder flex justify-center items-center !h-full w-[70%] bg-black rounded-full">
          <img className='h-[40%] w-[40%]' src={IconFactory.BillsIcon} />
        </div>
      </div>
      <div className="priorityBill_right h-full flex-[0.7] relative">
			<div className="billdetails_holder flex flex-col ">
				<h1 className='font-bold font-primary text-[1.1rem] ' > {bill.title} </h1>
				<p className='text-[1rem] font-semibold text-gray-500 ' > ₹ {bill.price} </p>
				<p className='absolute bottom-0 right-0 text-[0.8rem] font-semibold  italic' > {transformISOtoDateTime(bill.expiryDate)} </p>
			</div>
      </div>
    </div>
  )
}

export default TopPriorityBillCard