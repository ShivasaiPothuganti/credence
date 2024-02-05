import { Group } from "@/TypeDefinitions/Group";
import { Button } from "@/components/ui/button";
import { backendApiUrls } from "@/constants/backendApiEndpoints";
import { backend } from "@/services/api/Network/HttpHelper";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import RightNavigationPanel from "./RightNavigationPanel/RightNavigationPanel";
import GroupTransactionsList from "@/components/ui/GroupTransactionsList";
import { GroupTransaction } from "@/TypeDefinitions/GroupTransaction";
import { capitalizeFirstLetter } from "@/utils/formatText";
import SearchBar from "@/components/ui/searchbar";
import { useNavigate } from "react-router-dom";
import { storageService } from "@/services/Storage/storageService";
import { TTransaction } from "@/TypeDefinitions/Transaction";
import TransactionList from "@/components/ui/TransactionList";
import { transactionService } from "@/services/api/TransactionsService";
import { toast } from "@/components/ui/use-toast";

type GroupInput = {
  group: Group;
};

export default function GroupPage({ group }: GroupInput) {
  const navigate = useNavigate();
  const [transactionsList, setTransactionsList] = useState(
    [] as GroupTransaction[]
  );
  const [filteredList, setFilteredList] = useState<GroupTransaction[]>([]);
  const [indTransactions, setIndTransactions] = useState([] as TTransaction[]);
  const [filteredIndTransactions, setFilteredIndTransactions] = useState(
    [] as TTransaction[]
  );
  const userId = storageService.getItem("userId");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, []);

  function loadTransactions() {
    backend
      .get(backendApiUrls.getGroupTransactions + group.groupId)
      .then((response: AxiosResponse) => {
        setTransactionsList(response.data);
        setFilteredList(response.data);
      });
  }

  function loadIndividualTransactions() {
    backend
      .get(backendApiUrls.getGroupIndTransactions + group.groupId + "/ind")
      .then((response: AxiosResponse) => {
        console.log(response.data);
        setIndTransactions(response.data);
        setFilteredIndTransactions(response.data);
      });
  }

  function handleToggle() {
    setToggle(!toggle);
    if (toggle) loadTransactions();
    else loadIndividualTransactions();
  }

  function handleDeleteTransaction(id: number) {
    transactionService
      .deleteTransaction(id)
      .then((response) => {
        if (response && response.status === 200) {
          const newIndTransactions = indTransactions.filter((transaction)=>{
            return transaction.transactionId != id
          })
          setIndTransactions(newIndTransactions);
          const newIndFilteredList = filteredIndTransactions.filter((transaction)=>{
            return transaction.transactionId != id
          })
          setFilteredIndTransactions(newIndFilteredList);
        }
        toast({
          title: "Transaction Deleted",
          variant: "default",
        });
      })
      .catch((err) => {
        toast({
          title: "Unexpected error",
          variant: "destructive",
        });
      });
  }

  function filterTransactions(searchQuery: string) {
    searchIndTransactionsByUsername(searchQuery);
    searchTransactionsByUsername(searchQuery);
  }

  function searchTransactionsByUsername(searchQuery) {
    if (searchQuery === "") {
      setFilteredList(transactionsList);
      setFilteredIndTransactions(indTransactions);
    } else {
      const newFilteredList = transactionsList.filter((transaction) => {
        return transaction.userName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
      setFilteredList(newFilteredList as GroupTransaction[]);
    }
  }

  function searchIndTransactionsByUsername(searchQuery) {
    if (searchQuery === "") {
      setFilteredIndTransactions(indTransactions);
    } else {
      const newIndFilteredList = indTransactions.filter((transaction) => {
        return transaction.username
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
      setFilteredIndTransactions(newIndFilteredList);
    }
  }

  function leaveRoom() {
    backend
      .delete(backendApiUrls.removeUserFromGroup + group.groupId)
      .then((response) => {
        toast({
          title: "Left the Group",
          variant: "default"
        })
        navigate("/product/splitbills");
      });
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div className="h-20 rounded-lg bg-primaryBlack text-primaryWhite flex flex-row m-4 p-4 justify-between items-center">
        <div className="flex flex-[0.6] justify-end">
          <h1 className="text-3xl">
            {capitalizeFirstLetter(group.groupTitle)}{" "}
          </h1>
        </div>
        <div className="" onClick={leaveRoom}>
          {!(group.ownerId == userId) && (
            <Button variant="destructive">Leave</Button>
          )}
        </div>
      </div>
      <div className="flex w-full h-full justify-start align-top ">
        <div className="rooms-list flex-[0.7]">
          <div className="p-4 flex justify-between">
            <SearchBar getSearchQuery={filterTransactions} />
            <Button
              onClick={() => {
                handleToggle();
              }}
            >
              {toggle ? "Show Stats" : "Show Transactions"}
            </Button>
          </div>
          <div className="flex justify-between pl-7 pr-7 font-secondary font-semibold text-lg">
            <div>
              Total Amount:
            </div>
            <div>
            ₹ {group.totalPrice}
            </div>
          </div>
          <div className="rooms-list h-[79%] scroll-smooth overflow-x-hidden overflow-y-scroll">
            {toggle ? (
              <TransactionList
                transactions={filteredIndTransactions}
                deleteTransactions={handleDeleteTransaction}
              />
            ) : (
              <GroupTransactionsList transactions={filteredList} />
            )}
          </div>
        </div>
        <div className="right-navigation-panel flex flex-[0.25] h-[95%] rounded-[2rem] pt-4 pl-4 m-auto ">
          <RightNavigationPanel
            group={group}
            loadTransactions={loadTransactions}
          />
        </div>
      </div>
    </div>
  );
}
