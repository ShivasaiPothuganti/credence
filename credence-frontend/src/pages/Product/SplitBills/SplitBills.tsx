import { backendApiUrls } from '@/constants/backendApiEndpoints';
import { backend } from '@/services/api/Network/HttpHelper';
import React, { useEffect, useState } from 'react'
import GroupsList from './GroupsList/GroupsList';
import RightNavigationPanel from './RightNavigationPanel/RightNavigationPanel';

function SplitBills() {

  const [groups, setGroups] = useState([]);

  useEffect(()=>{
    backend.get(backendApiUrls.getGroups).then((response:any)=>{
      setGroups(response.data);
      console.log(groups);
    }
    )
  },[])

  return (
    <section className="h-full w-full bg-[#f8f8fc] flex items-center p-4">
      <div className="rooms-list h-full flex-[0.8] scroll-smooth overflow-auto p-4">
        <GroupsList groupsList={groups}/>
      </div>
      <div className="right-navigation-panel flex flex-[0.2] h-[95%] rounded-[2rem] ">
        <RightNavigationPanel />
      </div>
    </section>
  )
}

export default SplitBills