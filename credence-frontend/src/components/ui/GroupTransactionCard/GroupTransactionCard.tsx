import { GroupTransaction } from "@/TypeDefinitions/GroupTransaction";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { truncateDecimal } from "@/utils/formatNumber";
import { capitalizeFirstLetter } from "@/utils/formatText";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type InputProps = {
  transaction: GroupTransaction;
};

export default function GroupTransactionCard({ transaction }: InputProps) {

  const progress = (transaction.paid / transaction.hasToPay) * 100;

  return (
    <Card className="group flex relative">
      <div className="flex-[0.7]">
        <CardHeader>
          <div
            className="progress "
            style={{
              width: `${(transaction.paid / transaction.hasToPay) * 100}%`,
            }}
          ></div>
          <div className="card-title-container flex gap-12">
            <CardTitle>{capitalizeFirstLetter(transaction.userName)}</CardTitle>
          </div>
          <CardDescription>
            {" "}
            <p className="mt-2"> Paid: {transaction.paid} </p>{" "}
            <p className="mt-2">Has To Pay: {transaction.hasToPay} </p>{" "}
          </CardDescription>
        </CardHeader>
      </div>
      <div className="flex-[0.3] flex justify-center items-center">
        <div className="h-28 w-28">
          <CircularProgressbar
            value={progress}
            text={`${truncateDecimal(progress,0)}%`}
            styles={buildStyles({
              pathColor: "#51ff0d",
              textColor: "#121524"
            })}
          />
        </div>
      </div>
    </Card>
  );
}
