import { useEffect, useState } from "react";
import RightNavigationPanel from "./RightNavigationPanel/RightNavigationPanel";
import RoomsList from "./RoomsList/RoomsList";
import { Room } from "../../../TypeDefinitions/Room";
import { backendApiUrls } from "@/constants/backendApiEndpoints";
import { backend } from "@/services/api/Network/HttpHelper";
import { AxiosResponse } from "axios";

function CollaborationRoomsPage() {

  const [roomsList, setRoomsList] = useState<Room[]>([]);

  useEffect(()=>{
    backend.get(backendApiUrls.getRoomsOfUser).then((data:AxiosResponse)=>{
      setRoomsList(data.data);

    })
  },[])

  function addNewroom(newRoom:Room){
    const newRoomsList = [...roomsList, newRoom];
    setRoomsList(newRoomsList);
  }

  return (
    <section className='h-full w-full bg-[#f8f8fc] flex items-center' >
      <div className="rooms-list h-full flex-[0.8] scroll-smooth overflow-auto p-4">
        <RoomsList roomsList={roomsList} />
      </div>
      <div className="right-navigation-panel flex flex-[0.2] h-[95%] rounded-[2rem] ">
        <RightNavigationPanel addNewRoom={addNewroom}/>
      </div>
    </section>
  )
}

export default CollaborationRoomsPage;
