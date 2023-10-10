import {Room} from '../../../../../TypeDefinitions/Room';

type RoomList = {
  room:Room
}

function RoomCard({room}:RoomList) {

  return (
    <div className='h-32 w-[18rem] p-1 bg-card border text-card-foreground shadow-sm flex justify-between gap-2 rounded-lg cursor-pointer hover:scale-105'>
      <div className="icon-container flex-[0.4] p-5 ">
        <div className="icon bg-primaryPurple h-[5rem] w-[5rem] rounded-full flex justify-center items-center">
          <h1 className='text-primaryWhite font-bold text-5xl'>{room.title.charAt(0).toUpperCase()}</h1>
        </div>
      </div>
      <div className="room-details flex-[0.6] pt-3">
        <h1 className='font-semibold text-xl mb-4'>{room.title}</h1>
        <h3>Price: <h3 className=' inline text-[green] font-medium'>₹ {room.totalPrice}</h3></h3>
        <h3>Expenditure: <h3 className='text-[red] inline font-medium'>₹ {room.expenditure}</h3></h3>
      </div>
    </div>
  )
}

export default RoomCard