import { TTransaction } from "@/TypeDefinitions/Transaction";
import TransactionList from "@/components/ui/TransactionList";
import { logger } from "@/helpers/loggers/logger";
import { backend } from "@/services/api/Network/HttpHelper";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import RightNavigationPanel from "./RightNavigationPanel/RightNavigationPanel";
import { RoomType } from "@/TypeDefinitions/Room";

type RoomId = {
  room: any;
};

function RoomPage({ room }: RoomId) {
  const [transactionsList, setTransactionsList] = useState(
    [] as TTransaction[]
  );

  useEffect(() => {
    loadTransactions();
  }, []);

  function loadTransactions(){
    backend
      .get(`/rooms/${room.roomId}/transactions`)
      .then((data: AxiosResponse) => {
        setTransactionsList(data.data);
        logger.warn(data.data, "this is room data");
      });
  }

  function deleteTransactions() {}

  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-20 rounded-lg bg-primaryBlack text-primaryWhite m-4 p-4 text-3xl flex justify-center items-center">
        {room.title}
      </div>
      <div className="flex w-full h-full justify-start align-top ">
        <div className="rooms-list flex-[0.7] scroll-smooth overflow-scroll">
          <TransactionList
            transactions={transactionsList}
            deleteTransactions={deleteTransactions}
          />
        </div>
        <div className="right-navigation-panel flex flex-[0.3] h-[95%] rounded-[2rem] pt-4 pl-4 ">
          <RightNavigationPanel roomId={room.roomId} loadTransactions={loadTransactions}/>
        </div>
      </div>
    </div>
  );
}

export default RoomPage;
