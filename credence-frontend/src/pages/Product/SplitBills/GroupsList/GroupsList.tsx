import { Group } from "@/TypeDefinitions/Group";
import GroupCard from "@/components/ui/GroupCard";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/ui/searchbar";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type GroupsInput={
    groupsList:Group[]
    navigateToGroup: Function
}

function GroupsList({groupsList, navigateToGroup}:GroupsInput) {

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredGroups, setFilteredGroups] = useState<Group[]>(groupsList);

    useEffect(()=>{
        setFilteredGroups(groupsList);
    },[groupsList])

    useEffect(()=>{
      search();
    },[searchQuery]);

    function search(){
      if(searchQuery == ""){
        setFilteredGroups(groupsList);
      } else{
        const filteredGroupsArray = groupsList.filter((group)=>{
          return group.groupTitle.toLowerCase().includes(searchQuery.toLowerCase());
        })
        setFilteredGroups(filteredGroupsArray as Group[]);
      }
    }

    function filterGroups(searchString:string){
      setSearchQuery(searchString)
    }


  return (
    <>
      <div className="search-bar relative pl-4 pr-10 flex flex-row justify-between">
        <SearchBar getSearchQuery={filterGroups} />
        <Button
          onClick={() => {
            setFilteredGroups(groupsList);
          }}
        >
          Show All Splits
        </Button>
      </div>
      <div className="rooms-list p-4 grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-col-4">
        {filteredGroups.map((group: Group, index) => {
          return (
            <GroupCard key={index} group={group} navigateToGroup={navigateToGroup} />
          );
        })}
      </div>
    </>
  );
}

export default GroupsList;
