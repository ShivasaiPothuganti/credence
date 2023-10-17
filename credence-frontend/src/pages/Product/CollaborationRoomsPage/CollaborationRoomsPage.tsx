import { useEffect, useState } from "react";
import RightNavigationPanel from "./RightNavigationPanel/RightNavigationPanel";
import RoomsList from "./RoomsList/RoomsList";
import { backendApiUrls } from "@/constants/backendApiEndpoints";
import { backend } from "@/services/api/Network/HttpHelper";
import { AxiosResponse } from "axios";
import { useSearchParams } from "react-router-dom";
import RoomPage from "../RoomPage/RoomPage";
import { RoomType } from '@/TypeDefinitions/Room'

function CollaborationRoomsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [roomsList, setRoomsList] = useState<RoomType[]>([]);
  const [roomId, setRoomId] = useState(searchParams.get("roomId"));
  const [selectedRoom, setSelectedRoom] = useState({} as RoomType);

  useEffect(() => {
    if (roomId == null) {
      backend.get(backendApiUrls.getRoomsOfUser).then((data: AxiosResponse) => {
        setRoomsList(data.data);
      });
    }
  }, [roomId]);
  
  useEffect(()=>{
    setRoomId(searchParams.get("roomId"));
  },[searchParams])

  function addNewroom(newRoom: RoomType) {
    const newRoomsList = [...roomsList, newRoom];
    setRoomsList(newRoomsList);
  }

  function navigateToRoom(roomId:string){
    setRoomId(roomId);
    setSearchParams({roomId:roomId});
    setSelectedRoom(roomsList.find(room => room.roomId===roomId) as RoomType);
  }

  return (
    <>
    {roomId?(
      <section className="h-full w-full bg-[#f8f8fc] flex items-center p-4">
      <RoomPage room={selectedRoom} />
    </section>
    ):(
      <section className="h-full w-full bg-[#f8f8fc] flex items-center p-4">
      <div className="rooms-list h-full flex-[0.8] scroll-smooth overflow-auto p-4">
        <RoomsList roomsList={roomsList} navigateToRoom={navigateToRoom}/>
      </div>
      <div className="right-navigation-panel flex flex-[0.2] h-[95%] rounded-[2rem] ">
        <RightNavigationPanel addNewRoom={addNewroom} />
      </div>
    </section>
    )}
    </>
  );
}

export default CollaborationRoomsPage;
