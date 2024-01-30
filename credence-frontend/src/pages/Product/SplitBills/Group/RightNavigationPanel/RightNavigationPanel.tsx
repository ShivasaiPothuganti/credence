import { Group } from '@/TypeDefinitions/Group'
import AddTransaction from './AddTransaction/AddTransaction'
import AddMember from './AddMember/AddMember'
import { storageService } from '@/services/Storage/storageService'

type InputProps = {
  group: Group,
  loadTransactions: Function
}
function RightNavigationPanel({group, loadTransactions}:InputProps) {

  const userId = storageService.getItem("userId");

  console.log(userId+'  '+group.ownerId)

  return (
    <div className="w-[95%]">
      {(userId==group.ownerId)?
        (<AddMember groupId={group.groupId} loadTransactions={loadTransactions}/>):
        (<AddTransaction group={group} loadTransactions={loadTransactions} />)
        }
    </div>
  )
}

export default RightNavigationPanel