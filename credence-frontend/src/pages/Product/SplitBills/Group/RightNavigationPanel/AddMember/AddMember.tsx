import { FormGeneratorData } from '@/TypeDefinitions/FormGeneratorData';
import Form from '@/components/ui/form';
import { backendApiUrls } from '@/constants/backendApiEndpoints';
import { backend } from '@/services/api/Network/HttpHelper';
import { AxiosResponse } from 'axios';
import React, { useState } from 'react'

type InputProps = {
    groupId:string,
    loadTransactions: Function
}
export default function AddMember({groupId, loadTransactions}:InputProps) {

    const [addUserFormGenerator, setAddUserFormGenerator] = useState<
    FormGeneratorData[]
  >([
    {
      type: "text",
      name: "userId",
      placeholder: "Enter the User ID",
      elementProps: {
        required: true,
      },
    },
    {
        type: "text",
        name: "hasToPay",
        placeholder: "Enter the amount to be paid",
        elementProps: {
          required: true,
        },
      },
    {
      type: "submit",
      name: "addMember",
      value: "Add a Member",
    },
  ]);

  function addUserToGroup(data){
    data.groupId=groupId;
    backend.post(backendApiUrls.addUserToGroup,data).then((response:AxiosResponse)=>{
        loadTransactions();
    })
  }
  return (
    <>
      <h1 className="font-primary font-bold flex justify-center mt-10">
        Room Members
      </h1>
      <Form generatorData={addUserFormGenerator} onSubmit={addUserToGroup} />
    </>
  )
}
