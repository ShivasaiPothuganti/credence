import { Group } from '@/TypeDefinitions/Group'
import AddTransaction from './AddTransaction/AddTransaction'

type InputProps = {
  group: Group,
  loadTransactions: Function
}
function RightNavigationPanel({group, loadTransactions}:InputProps) {
  return (
    <div className="w-[95%]">
        <AddTransaction group={group} loadTransactions={loadTransactions} />
        {/* <AddMember roomId={roomId} /> */}
    </div>
  )
}

export default RightNavigationPanel