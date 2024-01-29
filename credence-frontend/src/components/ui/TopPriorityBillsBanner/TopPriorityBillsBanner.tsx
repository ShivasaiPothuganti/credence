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
    <div className="w-full p-10 h-[10rem] overflow-y-hidden flex gap-20 rounded-md">
      {topPriorityBills.map((bill) => {
        return <TopPriorityBillCard bill={bill} />;
      })}
    </div>
  );
}

export default TopPriorityBillsBanner;
