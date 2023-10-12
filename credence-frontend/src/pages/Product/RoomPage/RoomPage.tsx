import { TTransaction } from '@/TypeDefinitions/Transaction'
import TransactionList from '@/components/ui/TransactionList'
import { logger } from '@/helpers/loggers/logger'
import { backend } from '@/services/api/Network/HttpHelper'
import { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import RightNavigationPanel from './RightNavigationPanel/RightNavigationPanel'

type RoomId = {
  roomId:string
}

function RoomPage({roomId}:RoomId) {

  const [transactionsList, setTransactionsList] =useState([] as TTransaction[]);

  useEffect(()=>{
    backend.get(`http://localhost:8080/rooms/${roomId}/transactions`).then((data:AxiosResponse)=>{
      setTransactionsList(data.data);
      logger.warn(data.data, "this is room data")
    })
  })

  function deleteTransactions(){

  }

  return (
    <>
    <div className='rooms-list h-full flex-[0.7] scroll-smooth overflow-auto p-4'>
     <TransactionList transactions={transactionsList} deleteTransactions={deleteTransactions} />   
    </div>
    <div className="right-navigation-panel flex flex-[0.3] h-[95%] rounded-[2rem] ">
        <RightNavigationPanel />
      </div>
    </>
  )
}

export default RoomPage