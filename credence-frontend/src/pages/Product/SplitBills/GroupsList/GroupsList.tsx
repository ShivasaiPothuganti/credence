import { Group } from "@/TypeDefinitions/Group";
import GroupCard from "@/components/ui/GroupCard";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/ui/searchbar";
import { useEffect, useState } from "react";

type GroupsInput={
    groupsList:Group[]
}

function GroupsList({groupsList}:GroupsInput) {

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredGroups, setFilteredGroups] = useState<Group[]>(groupsList);

    function filterGroups(){

    }

    console.log(groupsList);

    useEffect(()=>{
        setFilteredGroups(groupsList);
    },[])


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
            <GroupCard key={index} group={group} />
          );
        })}
      </div>
    </>
  );
}

export default GroupsList;
