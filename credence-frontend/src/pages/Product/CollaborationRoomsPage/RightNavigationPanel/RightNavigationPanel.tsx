import AddRoom from "./AddRoom/AddRoom"

function RightNavigationPanel({addNewRoom}:any) {
  return (
    <div className='h-full w-full p-4 m-2'>
      <AddRoom addNewRoom={addNewRoom}/>
    </div>
  )
}

export default RightNavigationPanel