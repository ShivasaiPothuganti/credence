import { TTransaction } from '@/TypeDefinitions/Transaction';
import  { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement,Tooltip,Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { purpleShades } from './BackgroundColors';
import { convertCurrencyToInr } from '@/utils/currencyConverter';
import FilterTransactionsPopOver from '@/components/FilterTransactions/FilterTransactionsPopOver';
import RefreshButton from '../RefreshButton';


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

function calculateTotalPrice(transactions:TTransaction[]):number{
    const totalPrice = transactions.reduce((priceSum,transaction)=>{
        return priceSum + transaction.price;
    },0);
    return totalPrice;
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
    if(!transactions){
       return transactionsData; 
    }
    const dataMap = generateDataCountMap(transactions,formatBasedOn);

    transactionsData.labels = Array.from(dataMap.keys());
    transactionsData.datasets[0].data = Array.from(dataMap.values());
    transactionsData.datasets[0].backgroundColor = purpleShades;
    return transactionsData;
   
}


function DhoughNutChart({transactions}:DhoughNutChartProps) {

    const [formattedTransactions,setFormattedTransactions] = useState<TTransaction[]>(transactions);
    const [filteredTransactions,setFilteredTransactions] = useState<TTransaction[]>(null);
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

    useEffect(()=>{
        if(filteredTransactions){
            setTotal(calculateTotalPrice(filteredTransactions));
        }
        else{
            setTotal(calculateTotalPrice(formattedTransactions));
        }
    },[formattedTransactions,filteredTransactions]);

  return (
    <div className='h-full w-full' >
        <div className="header w-full flex flex-col gap-5">
            <div className="amount_holder flex justify-between">
                <h1 className='font-bold text-[1.5rem] font-primary' > Total Amount </h1>
                <h1 className='font-bold text-[1.5rem] font-primary' > {convertCurrencyToInr(total)} </h1>
            </div>
         
            <div className="dhoughnut_header flex w-full justify-between">
                <p className='font-semibold text-gray-500' > Transactions Breakdown </p>
                <div className="filterOptions flex gap-3">
                    <FilterTransactionsPopOver 
                        dateRange
                        categoryOrType
                        priceRange={false}
                        category={false}
                        initialTransactions={formattedTransactions} 
                        setFilteredTransactions={setFilteredTransactions}
                        onSubmit={(renderParameter:string)=>{
                            setRenderRenderParameter(renderParameter);
                        }}
                    />
                    <RefreshButton onClick={()=>{
                        setFilteredTransactions(null);
                        setRenderRenderParameter('category');
                    }} />
                </div>
            </div>
        </div>
        
        <div className="doughtnutchat_holder h-[70%] mt-5 flex w-full justify-center items-center">
        {
            !filteredTransactions ?
            <Doughnut style={{width:'16rem',height:'16rem',display:'flex',justifyContent:'center',alignItems:'center'}} data={formatTransactionsIntoChartData(formattedTransactions,renderParameter)}/>
            :
            <Doughnut style={{width:'16rem',height:'16rem',display:'flex',justifyContent:'center',alignItems:'center'}} data={formatTransactionsIntoChartData(filteredTransactions,renderParameter)}/>
        }

        
        </div>
        
    </div>
  )
}



export default DhoughNutChart;
