import { TTransaction } from '@/TypeDefinitions/Transaction';
import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

type TransactionProp = {
    transaction:TTransaction;
}

function Transaction({transaction}:TransactionProp) {

    const {title,price,addedOn,category,description,groupId,roomId,transactionId,userId} = transaction;

  return (
    <Card className='flex' >
        <div className="flex-[0.8]">
            <CardHeader>
                <div className="card-title-container flex gap-12">
                    <CardTitle>{title}</CardTitle>
                    <p className=' bg-primaryBlack text-primaryWhite pt-1 pb-1 pr-3 pl-3 rounded-3xl ' > {category} </p>
                </div>
                <CardDescription > <p className='mt-2' > {description} </p>  </CardDescription>
            </CardHeader>
            <CardContent>
                <p>{addedOn}</p>
            </CardContent>
        </div>
        <div className="flex-[0.2] flex items-center justify-center">
            <h1 className='text-2xl font-bold' >₹ {price} </h1>
        </div>
    </Card>
    // <div className='w-full h-16 flex ' >
    //     <div className="transaction-left flex-[0.2]">
    //         <div className="caterogry-container rounded-full h-[80%]">
    //             <h1>{category}</h1>
    //         </div>
    //     </div>
    //     <div className="transaction-center flex[0.6] ">
    //         <div className="transaction-heading">
    //             <h1> {title} </h1>
    //         </div>
    //         <div className="transaction-descriptiom">
    //             <p> {description} </p>
    //         </div>
    //         <div className="transaction-dates flex justify-between">
    //             <p> {addedOn} </p>
    //             <p> {createdOn} </p>
    //         </div>
    //     </div>
    //     <div className="transaction-right flex-[0.2]">
    //         <h1> ₹{price} </h1>
    //     </div>
    // </div>
  )
}

export default Transaction;