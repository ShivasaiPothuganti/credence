import {Room} from '../Room';

type RoomList = {
  room:Room
}

function RoomCard({room}:RoomList) {


  console.log(room, "this is the room in the child")
  return (
    <div className='h-40 w-[22rem] p-4 bg-secondaryWhite shadow-xl flex justify-between gap-2 rounded-2xl cursor-pointer'>
      <div className="icon-container flex-[0.4] p-3">
        <div className="icon bg-primaryPurple h-28 w-full rounded-full flex justify-center items-center">
          <h1 className='text-primaryWhite font-bold text-7xl'>{room.title.charAt(0).toUpperCase()}</h1>
        </div>
      </div>
      <div className="room-details flex-[0.6] flex flex-col p-3 justify-between">
        <h1 className='font-semibold'>{room.title}</h1>
        <h3>Price: ₹ {room.totalPrice}</h3>
        <h3>Expenditure: ₹ {room.expenditure}</h3>
      </div>
    </div>
  )
}

export default RoomCard