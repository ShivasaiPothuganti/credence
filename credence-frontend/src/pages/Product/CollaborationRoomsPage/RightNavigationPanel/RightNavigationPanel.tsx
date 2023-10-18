import AddRoom from "./AddRoom/AddRoom"

function RightNavigationPanel({addNewRoom}:any) {
  return (
    <div className='h-full w-full m-2'>
      <AddRoom addNewRoom={addNewRoom}/>
    </div>
  )
}

export default RightNavigationPanel