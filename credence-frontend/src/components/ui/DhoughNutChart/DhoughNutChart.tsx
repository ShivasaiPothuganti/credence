import { TTransaction } from '@/TypeDefinitions/Transaction';
import  { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement,Tooltip,Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { purpleShades } from './BackgroundColors';
import { convertCurrencyToInr } from '@/utils/currencyConverter';
import { SelectField } from '../select';

ChartJS.register(ArcElement,Legend,Tooltip);

type DhoughNutChartProps = {
    transactions:TTransaction[],
}



function generateDataCountMap(transactions:TTransaction[],fieldName:string){
    const dataMap = new Map<string,number>();
    transactions.forEach((transaction)=>{
        if(dataMap.has(transaction[fieldName])){
            dataMap.set(transaction[fieldName], dataMap.get(transaction[fieldName])+transaction.price);
        }
        else{
            dataMap.set(transaction[fieldName],transaction.price);
        }
    });
    return dataMap;
}

function formatTransactionsIntoChartData(transactions:TTransaction[],formatBasedOn:string){
    const transactionsData = {
        labels:[],
        datasets:[
            {
                lable:[],
                data:[],
                backgroundColor:['rgba(153, 102, 255, 0.4)'],
                borderColor:['#efefef'],
                borderWidth:3
            }
        ]
    }
    const dataMap = generateDataCountMap(transactions,formatBasedOn);

    transactionsData.labels = Array.from(dataMap.keys());
    transactionsData.datasets[0].data = Array.from(dataMap.values());
    transactionsData.datasets[0].backgroundColor = purpleShades;
    return transactionsData;
   
}


function DhoughNutChart({transactions}:DhoughNutChartProps) {

    const [formattedTransactions,setFormattedTransactions] = useState<TTransaction[]>(transactions);
    const [filteredTransactions,setFilteredTransactions] = useState<TTransaction[]>(transactions);
    const [total,setTotal] = useState(0);
    const [renderParameter,setRenderRenderParameter] = useState<string>('category');


    useEffect(()=>{
        let total = 0;
        const formattedTransactions = transactions.map((transaction)=>{
            if(!transaction.category){
                transaction.category = 'Other'
            }
            if(transaction.roomId){
                transaction.type = 'Room';
            }
            else if(transaction.groupId){
                transaction.type = 'Group';
            }
            else{
                transaction.type = 'Personal';
            }
            total+=transaction.price;
            return transaction;
        });
        setFormattedTransactions(formattedTransactions);
        setTotal(total);

    },[transactions]);

  return (
    <div className='h-full w-full' >
        <div className="header w-full flex flex-col gap-5">
            <div className="amount_holder flex justify-between">
                <h1 className='font-bold text-[1.5rem] font-primary' > Total Amount </h1>
                <h1 className='font-bold text-[1.5rem] font-primary' > {convertCurrencyToInr(total)} </h1>
            </div>
           <SelectField 
                selectPlaceholder,
                selectLabel,
                selectItems,
                onChange={()=>{}} 
            />
            <p className='font-semibold text-gray-500' > Transactions Breakdown </p>
        </div>
        <Doughnut data={formatTransactionsIntoChartData(formattedTransactions,renderChartBasedOn)}/>
    </div>
  )
}



export default DhoughNutChart;
