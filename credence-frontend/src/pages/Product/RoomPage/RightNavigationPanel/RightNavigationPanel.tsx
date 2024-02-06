import { FormGeneratorData } from "@/TypeDefinitions/FormGeneratorData";
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