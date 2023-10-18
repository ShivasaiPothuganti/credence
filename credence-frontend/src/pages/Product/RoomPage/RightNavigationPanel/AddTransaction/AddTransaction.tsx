import { FormGeneratorData } from '@/TypeDefinitions/FormGeneratorData';
import { RoomTransaction } from '@/TypeDefinitions/RoomTransaction';
import Form from '@/components/ui/form'
import { backend } from '@/services/api/Network/HttpHelper';
import { useState } from 'react'

type InputProps = {
    roomId:string|undefined,
    loadTransactions:Function
}

function AddTransaction({roomId, loadTransactions}:InputProps) {

    const [addTransactionFormGenerator,setAddTransactionFormGenerator] = useState<FormGeneratorData[]>([
        {
            type:'text',
            placeholder:'Title ',
            name:'title',
            elementProps:{
                required:true,
                minLength:3,
            }
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

      function addRoomTransaction(data:RoomTransaction){
        backend.post(`/transactions/rooms/${roomId}`,data).then(()=>{
            loadTransactions();
        })
      }

  return (
    <>
    <h1 className="font-primary font-bold flex justify-center">Add a Transaction</h1>
        <Form generatorData={addTransactionFormGenerator} onSubmit={addRoomTransaction} />
    </>
  )
}

export default AddTransaction