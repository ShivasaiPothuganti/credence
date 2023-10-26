import { useEffect, useState } from "react";
import { RoomType } from "../../../../TypeDefinitions/Room";
import SearchBar from "@/components/ui/searchbar";
import RoomCard from "@/components/ui/RoomCard/RoomCard";
import { Button } from "@/components/ui/button";

type Rooms = {
  roomsList: RoomType[];
  // setRoomId:Function,
  navigateToRoom: Function;
};

function RoomsList({ roomsList, navigateToRoom }: Rooms) {
  const [searchQuery, setSearchQuery] = useState("");

  const [filteredRooms, setFilteredRooms] = useState<RoomType[]>(roomsList);

  useEffect(() => {
    if (searchQuery == "") {
      setFilteredRooms(roomsList);
    } else {
      const filteredRoomsArray = roomsList.filter((room) =>
        room.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRooms(filteredRoomsArray as RoomType[]);
    }
  }, [searchQuery]);

  useEffect(() => {
    setFilteredRooms(roomsList);
  }, [roomsList]);

  function filterRooms(searchString:string){
    setSearchQuery(searchString);
  }

  return (
    <>
      <div className="search-bar relative pl-4 pr-10 flex flex-row justify-between">
        <SearchBar getSearchQuery={filterRooms} />
        <Button onClick={()=>{setFilteredRooms(roomsList)}} >
          Show All Rooms
        </Button>
      </div>
      <div className="rooms-list p-4 grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-col-4">
        {filteredRooms.map((room: RoomType, index) => {
          return (
            <RoomCard key={index} room={room} navigateToRoom={navigateToRoom} />
          );
        })}
      </div>
    </>
  );
}

export default RoomsList;
