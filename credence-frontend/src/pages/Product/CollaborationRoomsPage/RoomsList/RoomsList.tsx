import { useEffect, useState } from "react"
import { backend } from "@/services/api/Network/HttpHelper";
import { Room } from "./Room";
import RoomCard from "./RoomCard/RoomCard";

type Rooms = {
  roomsList:Room[]
}

function RoomsList({roomsList}:Rooms) {

  console.log(roomsList)

  return (
    <div className="rooms-list p-4 flex flex-row flex-wrap justify-between gap-16 align-top">

      {
        roomsList.map((room:Room, index)=>{
          return <RoomCard key={index} room={room} />
        })
      }
    </div>
  )
}

export default RoomsList