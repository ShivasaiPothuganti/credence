/* eslint-disable no-mixed-spaces-and-tabs */
import TopPriorityBillCard from "../TopPriorityBillCard/TopPriorityBillCard";
import { TBill } from "@/TypeDefinitions/Bill";
import "./TopPriorityBillsBanner.css";

type TopPriorityBillCardProps = {
  topPriorityBills: TBill[];
};

function TopPriorityBillsBanner({
  topPriorityBills,
}: TopPriorityBillCardProps) {
  return (
    <div className="w-[95%] h-[10rem] overflow-x-scroll gap-3 flex rounded-md">
      {topPriorityBills.map((bill) => {
        return <TopPriorityBillCard bill={bill} />;
      })}
    </div>
  );
}

export default TopPriorityBillsBanner;
