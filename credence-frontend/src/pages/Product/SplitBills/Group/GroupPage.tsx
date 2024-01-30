import { Group } from '@/TypeDefinitions/Group'
import { TTransaction } from '@/TypeDefinitions/Transaction'
import TransactionList from '@/components/ui/TransactionList'
import { Button } from '@/components/ui/button'
import { backendApiUrls } from '@/constants/backendApiEndpoints'
import { backend } from '@/services/api/Network/HttpHelper'
import { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import RightNavigationPanel from './RightNavigationPanel/RightNavigationPanel'

type GroupInput = {
    group: Group
}

export default function GroupPage({group}:GroupInput) {

  const [transactionsList, setTransactionsList] = useState([] as TTransaction[])
  const [filteredList, setFilteredList] = useState<TTransaction[]>([]);

  useEffect(()=>{
    loadTransactions();
  },[])

  function loadTransactions(){
    backend.get(backendApiUrls.getGroupTransactions+group.groupId).then((response:AxiosResponse)=>{
      setTransactionsList(response.data)
      setFilteredList(response.data)
      console.log(transactionsList)
    })
  }

  function deleteTransactions(){

  }


    function leaveRoom() {
    }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div className="h-20 rounded-lg bg-primaryBlack text-primaryWhite flex flex-row m-4 p-4 justify-between items-center">
        <div className="flex flex-[0.6] justify-end">
          <h1 className="text-3xl">{group.groupTitle} </h1>
        </div>
        <div className="" onClick={leaveRoom}>
          <Button variant="destructive">Leave</Button>
        </div>
      </div>
      <div className="flex w-full h-full justify-start align-top ">
        <div className="rooms-list flex-[0.7]">
          <div className="p-4 flex justify-between">
            {/* <SearchBar getSearchQuery={searchTransactionsByTitle} /> */}
            <Button onClick={()=>{loadTransactions()}} >
              Show All Transactions
            </Button>
          </div>
          <div className="rooms-list h-[79%] scroll-smooth overflow-x-hidden overflow-y-scroll">
            <TransactionList
              transactions={filteredList}
              deleteTransactions={deleteTransactions}
            />
          </div>
      </div>
      <div className="right-navigation-panel flex flex-[0.25] h-[95%] rounded-[2rem] pt-4 pl-4 m-auto ">
          <RightNavigationPanel
            group={group}
            loadTransactions={loadTransactions}
          />
        </div>
    </div>
    </div>
  )
}
