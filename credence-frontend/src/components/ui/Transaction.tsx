import { TTransaction } from '@/TypeDefinitions/Transaction';
import React from 'react';

type TransactionProp = {
    transaction:TTransaction;
}

function Transaction({transaction}:TransactionProp) {

    const {title,price,addedOn,category,createdOn,description,groupId,roomId,transactionId,userId} = transaction;

  return (
    <div className='w-full h-16 flex ' >
        <div className="transaction-left flex-[0.2]">
            <div className="caterogry-container rounded-full h-[80%]">
                <h1>{category}</h1>
            </div>
        </div>
        <div className="transaction-center flex[0.6] ">
            <div className="transaction-heading">
                <h1> {title} </h1>
            </div>
            <div className="transaction-descriptiom">
                <p> {description} </p>
            </div>
            <div className="transaction-dates flex justify-between">
                <p> {addedOn} </p>
                <p> {createdOn} </p>
            </div>
        </div>
        <div className="transaction-right flex-[0.2]">
            <h1> ₹{price} </h1>
        </div>
    </div>
  )
}

export default Transaction;