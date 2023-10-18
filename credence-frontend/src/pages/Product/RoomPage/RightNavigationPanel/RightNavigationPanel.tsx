import { FormGeneratorData } from "@/TypeDefinitions/FormGeneratorData";
import { RoomTransaction } from "@/TypeDefinitions/RoomTransaction";
import Form from "@/components/ui/form";
import { backend } from "@/services/api/Network/HttpHelper";
import { useState } from "react";
import AddTransaction from "./AddTransaction/AddTransaction";
import AddMember from "./AddMember/AddMember";

type InputProps = {
    roomId:string|undefined,
    loadTransactions:Function
}

function RightNavigationPanel({roomId, loadTransactions}:InputProps) {

  return (
    <div className="w-[95%]">
        <AddTransaction roomId={roomId} loadTransactions={loadTransactions} />
        <AddMember roomId={roomId} />
    </div>
  )
}

export default RightNavigationPanel