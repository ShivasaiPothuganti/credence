import { useEffect, useState } from "react";
import RightNavigationPanel from "./RightNavigationPanel/RightNavigationPanel";
import RoomsList from "./RoomsList/RoomsList";
import { backendApiUrls } from "@/constants/backendApiEndpoints";
import { backend } from "@/services/api/Network/HttpHelper";
import { AxiosResponse } from "axios";
import { useSearchParams } from "react-router-dom";
import Room from "../RoomPage/RoomPage";
import { RoomType } from '@/TypeDefinitions/Room'

function CollaborationRoomsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [roomsList, setRoomsList] = useState<RoomType[]>([]);
  const [roomId, setRoomId] = useState(searchParams.get("roomId"));

  useEffect(() => {
    if (roomId == null) {
      backend.get(backendApiUrls.getRoomsOfUser).then((data: AxiosResponse) => {
        setRoomsList(data.data);
      });
    }
  }, []);

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
  }

  function deleteRoom(roomId:string){

  }

  return (
    <>
    {console.log("rendered with room id ", roomId)}
    {roomId?(
      <section className="h-full w-full bg-[#f8f8fc] flex items-center p-4">
      <Room roomId={roomId} />
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
