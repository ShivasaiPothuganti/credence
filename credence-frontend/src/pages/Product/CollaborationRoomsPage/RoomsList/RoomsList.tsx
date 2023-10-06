import { useEffect, useState } from "react"
import { backend } from "@/services/api/Network/HttpHelper";
import { Room } from "./Room";
import RoomCard from "./RoomCard/RoomCard";
import { IconFactory } from "@/assets/Icons/IconsFactory";

type Rooms = {
  roomsList:Room[]
}

function RoomsList({roomsList}:Rooms) {

  console.log(roomsList)

  return (
    <>
    <div className="search-bar relative">
      <img className="h-6 w-6 right-4 relative block " src={IconFactory.SearchIcon} />
    </div>
    <div className="rooms-list p-4 flex flex-row flex-wrap justify-start pl-12 gap-8 align-top">
      {
        roomsList.map((room:Room, index)=>{
          return <RoomCard key={index} room={room} />
        })
      }
    </div>
    </>
  )
}

export default RoomsList