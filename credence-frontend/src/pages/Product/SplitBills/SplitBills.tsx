import { backendApiUrls } from '@/constants/backendApiEndpoints';
import { backend } from '@/services/api/Network/HttpHelper';
import React, { useEffect, useState } from 'react'
import GroupsList from './GroupsList/GroupsList';
import RightNavigationPanel from './RightNavigationPanel/RightNavigationPanel';
import { Group } from '@/TypeDefinitions/Group';
import { AxiosResponse } from 'axios';
import { useSearchParams } from 'react-router-dom';
import GroupPage from './Group/GroupPage';

function SplitBills() {

  const [searchParams, setSearchParams] = useSearchParams();
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupId, setGroupId] = useState();
  const [selectedGroup, setselectedGroup] = useState({} as Group)

  useEffect(()=>{
    backend.get(backendApiUrls.getGroups).then((response:AxiosResponse)=>{
      console.log(response.data);
      setGroups(response.data);
    }
    )
  },[])

  function navigateToGroup(groupId){
    setGroupId(groupId);
    setSearchParams({groupId:groupId})
    setselectedGroup(groups.find(group => group.groupId===groupId) as Group)
  }

  return (
    <>
    {groupId?(
      <section className="h-full w-full bg-[#f8f8fc] flex items-center">
      <GroupPage group={selectedGroup} />
    </section>
    ):(
      <section className="h-full w-full bg-[#f8f8fc] flex items-center p-4">
      <div className="rooms-list h-full flex-[0.8] scroll-smooth overflow-auto p-4">
        <GroupsList groupsList={groups} navigateToGroup={navigateToGroup}/>
      </div>
      <div className="right-navigation-panel flex flex-[0.2] h-[95%] rounded-[2rem] ">
        <RightNavigationPanel />
      </div>
    </section>
    )}
    </>
  )
}

export default SplitBills