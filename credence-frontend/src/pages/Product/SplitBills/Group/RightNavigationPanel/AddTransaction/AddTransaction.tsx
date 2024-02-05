import { FormGeneratorData } from '@/TypeDefinitions/FormGeneratorData';
import { Group } from '@/TypeDefinitions/Group';
import Form from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { backendApiUrls } from '@/constants/backendApiEndpoints';
import { backend } from '@/services/api/Network/HttpHelper';
import React, { useState } from 'react'

type InputProps = {
    group: Group,
    loadTransactions: Function
}

export default function AddTransaction({group, loadTransactions}:InputProps) {

  const [addTransactionFormGenerator,setAddTransactionFormGenerator] = useState<FormGeneratorData[]>([
    {
        type:'text',
        placeholder:'Title ',
        name:'title',
        value:group.groupTitle
    },
    {
        type:'text',
        placeholder:'price ',
        name:'price',
        elementProps:{
            required:true,
        }
    },
    {
        type:'textarea',
        placeholder:'Description',
        name:'description'
    },
    {
        type:'date',
        placeholder:'Date',
        name:'dateOfTransaction',
        elementProps:{
            required:true
        }
    },
    {
        type:'submit',
        name:'addTransaction',
        value:'Add'
    }
  ]);

  function addRoomTransaction(data){
    backend.post(backendApiUrls.addGroupTransaction+group.groupId,data).then(()=>{
        loadTransactions();
        toast({
            title: "Transaction added",
            variant: "default"
        })
    })
  }

  return (
    <>
    <h1 className="font-primary font-bold flex justify-center">Add a Transaction</h1>
        <Form generatorData={addTransactionFormGenerator} onSubmit={addRoomTransaction} />
    </>
  )
}
