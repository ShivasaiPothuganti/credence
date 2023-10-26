import { TTransaction } from "@/TypeDefinitions/Transaction";
import TransactionList from "@/components/ui/TransactionList";
import { backend } from "@/services/api/Network/HttpHelper";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import RightNavigationPanel from "./RightNavigationPanel/RightNavigationPanel";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/ui/searchbar";
import { RoomType } from "@/TypeDefinitions/Room";

type RoomId = {
  room: RoomType;
};

function RoomPage({ room }: RoomId) {
  const navigate = useNavigate();
  const [transactionsList, setTransactionsList] = useState(
    [] as TTransaction[]
  );
  const [filteredList, setFilteredList] = useState<TTransaction[]>([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  function loadTransactions() {
    backend
      .get(`/rooms/${room.roomId}/transactions`)
      .then((response: AxiosResponse) => {
        setTransactionsList(response.data);
        setFilteredList(response.data);
      });
  }


  function searchTransactionsByTitle(queryString:string){
    if (queryString === "") {
      setFilteredList(transactionsList);
    } else {
      const list = transactionsList.filter((transaction) =>
        transaction.title.toLowerCase().includes(queryString.toLowerCase())
      );
      setFilteredList(list);
    } 
  }

  function deleteTransactions(transactionId:number) {
    backend.delete(`/rooms/${room.roomId}/transactions/${transactionId}`).then(()=>{
      console.log("transaction deleted");
      loadTransactions();
    })
  }


  function leaveRoom() {
    backend.delete(`/rooms/${room.roomId}/users`).then(() => {
      navigate("/product/collaborationrooms");
    });
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div className="h-20 rounded-lg bg-primaryBlack text-primaryWhite m-4 p-4 flex justify-center items-center">
        <h1 className="text-3xl">{room.title} </h1>
        <div className="absolute right-[2%]" onClick={leaveRoom}>
          <Button variant="destructive">Leave</Button>
        </div>
      </div>
      <div className="flex w-full h-full justify-start align-top ">
        <div className="rooms-list flex-[0.7]">
          <div className="p-4 flex justify-between">
            <SearchBar getSearchQuery={searchTransactionsByTitle} />
            <Button onClick={()=>{loadTransactions()}} >
              Show All Transactions
            </Button>
          </div>
          <div className="rooms-list h-[79%] scroll-smooth overflow-x-hidden overflow-y-scroll">
            <TransactionList
              transactions={filteredList}
              deleteTransactions={deleteTransactions}
            />
          </div>
        </div>
        <div className="right-navigation-panel flex flex-[0.3] h-[95%] rounded-[2rem] pt-4 pl-4 ">
          <RightNavigationPanel
            roomId={room.roomId}
            loadTransactions={loadTransactions}
          />
        </div>
      </div>
    </div>
  );
}

export default RoomPage;
