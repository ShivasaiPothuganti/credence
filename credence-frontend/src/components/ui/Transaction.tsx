import { TTransaction } from '@/TypeDefinitions/Transaction';
import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { transformISOtoDateTime } from '@/utils/formatDate';
import { Button } from './button';
import {IconFactory} from '@/assets/Icons/IconsFactory';

type TransactionProp = {
    transaction:TTransaction,
    deleteTransaction:Function
}

function Transaction({transaction,deleteTransaction}:TransactionProp) {

    const {title,price,dateOfTransaction,category,description,groupId,roomId,transactionId,userId} = transaction;

  return (
    <Card className='group flex relative' >
        <div className="flex-[0.8]">
            <CardHeader>
                <div className="card-title-container flex gap-12">
                    <CardTitle>{title}</CardTitle>
                    <p className=' bg-primaryBlack text-primaryWhite pt-1 pb-1 pr-3 pl-3 rounded-3xl ' > {category} </p>
                </div>
                <CardDescription > <p className='mt-2' > {description} </p>  </CardDescription>
            </CardHeader>
            <CardContent>
                <p >{transformISOtoDateTime(dateOfTransaction)}</p>
            </CardContent>
        </div>
        <div className="flex-[0.2] flex items-center justify-center">
            <h1 className='text-2xl font-bold' >₹ {price} </h1>
        </div>
        <div className=" hidden group-hover:block transaction-delete absolute bottom-2 right-2">
            <Button onClick={()=>{deleteTransaction(transactionId)}} variant='destructive' >
                <img className='h-full' src={IconFactory.DeleteIcon} alt="" />
            </Button>
        </div>
    </Card>
  )
}

export default Transaction;