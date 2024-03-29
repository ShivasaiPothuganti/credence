import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { TTransaction } from "@/TypeDefinitions/Transaction";
import { convertDateToMonth } from "@/utils/formatDate";
import FilterTransactionsPopOver from "@/components/FilterTransactions/FilterTransactionsPopOver";
import RefreshButton from "../RefreshButton";
import { convertCurrencyToInr } from "@/utils/currencyConverter";
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type InputProps = {
  transactions: TTransaction[];
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Line Chart",
    },
  },
  tension: 0.5,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
         display: false
      },
    },
  },
};

function getMonthlyTransactions(
  transactions: TTransaction[],
  fieldName: string
) {
  const transactionsMap = new Map<string, number>();
  transactions.map((transaction) => {
    const keyValue = convertDateToMonth(transaction[fieldName]);
    if (transactionsMap.has(keyValue)) {
      transactionsMap.set(
        keyValue,
        transactionsMap.get(keyValue) + transaction.price
      );
    } else {
      transactionsMap.set(keyValue, transaction.price);
    }
  });
  return transactionsMap;
}

function formatTransactions(transactions: TTransaction[], fieldName: string) {
  const formattedTransactions = {
    labels: [],
    datasets: [
      {
        label: "money",
        data: [],
        borderColor: "rgba(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255)",
        pointBackgroundColor: "rgba(153, 102, 255)",
        pointBorderColor: "rgba(255, 255, 255, 0.5)",
        borderWidth: 1,
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };
  const transactionsMap = getMonthlyTransactions(transactions, fieldName);

  formattedTransactions.labels = Array.from(transactionsMap.keys());
  formattedTransactions.datasets[0].data = Array.from(transactionsMap.values());

  return formattedTransactions;
}

export default function LineChart({ transactions }: InputProps) {
  const [filteredTransactions, setFilteredTransactions] =
    useState<TTransaction[]>(transactions);

    const [total,setTotal] = useState(0);

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  return (
    <div className="h-full w-full">
      <div className="total_amount">
          <div className="amount_holder flex justify-between">
                <h1 className='font-bold text-[1.5rem] font-primary' > Total Amount </h1>
                <h1 className='font-bold text-[1.5rem] font-primary' > {convertCurrencyToInr(total)} </h1>
            </div>
      </div>
      <div className="flex gap-5 w-full justify-end mt-5 ">
        <FilterTransactionsPopOver
          initialTransactions={transactions}
          setFilteredTransactions={setFilteredTransactions}
          dateRange
          priceRange={false}
          categoryOrType={false}
          category={false}
        />
         <RefreshButton onClick={()=>{
            setFilteredTransactions(transactions);           
          }} />
      </div>
      <div className="linechart_holder h-[70%] w-full flex justify-center ">
        <Line
          style={{height:'22rem',width:'33rem'}}
          options={options}
          data={formatTransactions(filteredTransactions, "dateOfTransaction")}
        />
      </div>
    </div>
  );
}
