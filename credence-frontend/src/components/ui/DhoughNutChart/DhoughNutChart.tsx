import { TTransaction } from '@/TypeDefinitions/Transaction';
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement,Tooltip,Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { logger } from '@/helpers/loggers/logger';
import { purpleShades } from './BackgroundColors';
import { transformISOtoDateTime } from '@/utils/formatDate';

ChartJS.register(ArcElement,Legend,Tooltip);

type DhoughNutChartProps = {
    transactions:TTransaction[],
    renderChartBasedOn:'Category'|'TransactionType';
}


function generateCategoryCountsMap(transactions:TTransaction[]){
    const categoryCount = new Map<string,number>();

    transactions.forEach((transaction)=>{

        if(!transaction.category){
            transaction.category = 'Other'
        }

        if(categoryCount.has(transaction.category)){
            categoryCount.set(transaction.category,categoryCount.get(transaction.category)+transaction.price);
        }
        else{
            categoryCount.set(transaction.category,transaction.price);
        }
    });

    return categoryCount;
}

function generateTransactionTypeCounts(transactions:TTransaction[]){
    const typeCount = new Map<string,number>();
    typeCount.set('Rooms',0);
    typeCount.set('Groups',0);
    typeCount.set('Personal',0);

    transactions.forEach((transaction)=>{
        if(transaction.roomId){
            typeCount.set('Rooms',typeCount.get('Rooms')+transaction.price);
        }
        else if(transaction.groupId){
            typeCount.set('Groups',typeCount.get('Groups')+transaction.price);
        }
        else{
            typeCount.set('Personal',typeCount.get('Personal')+transaction.price);
        }
    });
    return typeCount;
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

   if(formatBasedOn==='Category'){
        const categoryCountMap = generateCategoryCountsMap(transactions);
        transactionsData.labels = Array.from(categoryCountMap.keys());
        transactionsData.datasets[0].data = Array.from(categoryCountMap.values());
        transactionsData.datasets[0].backgroundColor = purpleShades;
        return transactionsData;
   }
   else if(formatBasedOn==='TransactionType'){
        const groupTypeCountMap = generateTransactionTypeCounts(transactions);
        transactionsData.labels = Array.from(groupTypeCountMap.keys());
        transactionsData.datasets[0].data = Array.from(groupTypeCountMap.values());
        transactionsData.datasets[0].backgroundColor = purpleShades;
        return transactionsData;
   }
}


function DhoughNutChart({transactions,renderChartBasedOn}:DhoughNutChartProps) {

    const [formattedTransactions,setFormattedTransactions] = useState<TTransaction[]>(transactions);

    useEffect(()=>{
        setFormattedTransactions(transactions.map((transaction)=>{
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
            return transaction;
        }));
    },[transactions]);

  return (
    <div className='h-96' >
        <h1>  </h1>
        <Doughnut  data={formatTransactionsIntoChartData(formattedTransactions,renderChartBasedOn)}/>
    </div>
  )
}



export default DhoughNutChart;
