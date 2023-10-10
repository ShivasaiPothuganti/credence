import { useEffect, useState } from "react";
import { Room } from "../../../../TypeDefinitions/Room";
import RoomCard from "./RoomCard/RoomCard";
import SearchBar from "@/components/ui/searchbar";
import { logger } from "@/helpers/loggers/logger";

type Rooms = {
  roomsList:Room[]
}

function RoomsList({roomsList}:Rooms) {

  const [searchQuery, setSearchQuery] = useState("");

  const [filteredRooms, setFilteredRooms] = useState<Room[]>(roomsList);
  logger.error(filteredRooms);
  useEffect(()=>{
    if(searchQuery == ''){
      setFilteredRooms(roomsList);
    }
    else{
      const filteredRoomsArray = roomsList.filter(room => room.title.toLowerCase().includes(searchQuery.toLowerCase()))
      setFilteredRooms(filteredRoomsArray as Room[]);
    }
  },[searchQuery])

  useEffect(()=>{
    setFilteredRooms(roomsList);
  },[])

  return (
    <>
    <div className="search-bar relative">
      <SearchBar setSearchQuery={setSearchQuery} />
    </div>
    {/* <div className="rooms-list p-4 flex flex-row flex-wrap justify-start pl-12 gap-8 align-top"> */}
    <div className="rooms-list p-4 grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-col-4">
      {
        filteredRooms.map((room:Room, index)=>{
          return <RoomCard key={index} room={room} />
        })
      }
    </div>
    </>
  )
}

export default RoomsList