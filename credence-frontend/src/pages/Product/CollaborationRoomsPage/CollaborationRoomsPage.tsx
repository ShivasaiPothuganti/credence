import { useEffect, useState } from "react";
import RightNavigationPanel from "./RightNavigationPanel/RightNavigationPanel";
import RoomsList from "./RoomsList/RoomsList";
import { Room } from "./RoomsList/Room";
import { backendApiUrls } from "@/constants/backendApiEndpoints";
import { backend } from "@/services/api/Network/HttpHelper";
import { AxiosResponse } from "axios";

function CollaborationRoomsPage() {

  const [roomsList, setRoomsList] = useState([] as Room[]);

  useEffect(()=>{
    backend.get(backendApiUrls.getRoomsOfUser).then((data:AxiosResponse)=>{
      setRoomsList(data.data);
      console.log(data," this is the rooms data")
    })
  },[])

  function addNewroom(newRoom:Room){
    const newRoomsList = [...roomsList, newRoom];
    setRoomsList(newRoomsList);
    console.log(newRoomsList);
  }

  return (
    <section className='h-full w-full flex items-center' >
      <div className="rooms-list h-full flex-[0.7]">
        <RoomsList roomsList={roomsList} />
      </div>
      <div className="right-navigation-panel flex flex-[0.3] h-full rounded-l-[2rem] shadow-xl bg-secondaryPurple">
        <RightNavigationPanel addNewRoom={addNewroom}/>
      </div>
    </section>
  )
}

export default CollaborationRoomsPage;
