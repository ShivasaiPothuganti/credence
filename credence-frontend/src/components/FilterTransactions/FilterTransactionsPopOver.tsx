import { FormGeneratorData } from '@/TypeDefinitions/FormGeneratorData'
import { useEffect, useState } from 'react'
import FilterPopOver from '../FilterPopOver/FilterPopOver';
import { categoryService } from '@/services/api/CategoryService';
import { toast } from '../ui/use-toast';
import { AxiosResponse } from 'axios';
import { TTransaction } from '@/TypeDefinitions/Transaction';
import { logger } from '@/helpers/loggers/logger';
import { compareTwoDates, getDateOnly } from '@/utils/formatDate';


type FilterTransactionsPopOver = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    setFilteredTransactions:Function,
    initialTransactions:TTransaction[]
}

function FilterTransactionsPopOver({setFilteredTransactions,initialTransactions}:FilterTransactionsPopOver) {
    const [filterTransactionFormGenerator,setFilterTransactionFormGenerator] = useState<FormGeneratorData[]>([
        {
            type:'number',
            name:'startingPrice',
            placeholder:'starting price'
        },
        {
            type:'number',
            name:'endingPrice',
            placeholder:'ending price'
        },
        {
            type:'dateRangePicker',
            name:'dateRange',
            placeholder:'ending date'
        },
        {
            type:'select',
            name:'category',
            placeholder:'category',
            elementProps:{
                selectPlaceholder:'Category',
                selectLabel:'Category',
                selectItems:[]
            }
        },
        {
            type:'submit',
            name:'Filter',
            value:'Filter'
        },
        
      ]);

      function filterTransactionsByPrice(transactions:TTransaction[],startingPrice:number,endingPrice:number):TTransaction[]{
            if(startingPrice&&endingPrice){
                return transactions.filter((transaction:TTransaction)=>{
                    return transaction.price >=startingPrice && transaction.price <=endingPrice;
                })
            }
            else if(startingPrice){
                return transactions.filter((transaction:TTransaction)=>{
                    return transaction.price >=startingPrice;
                })
            }
            return transactions.filter((transaction:TTransaction)=>{
                return transaction.price <= endingPrice;
            }) 
      }

      function filterTransactionsByDate(transactions:TTransaction[],fromDate:Date,toDate:Date):TTransaction[]{

        if(fromDate&&toDate){
            return transactions.filter((transaction:TTransaction)=>{

                return compareTwoDates(fromDate,transaction.dateOfTransaction) <=0 && compareTwoDates(toDate,transaction.dateOfTransaction)>=0;
            })
        }
        if(fromDate){
            return transactions.filter((transaction:TTransaction)=>{
                return compareTwoDates(fromDate,transaction.dateOfTransaction) <=0;
            })
        }
        else {
            return transactions.filter((transaction:TTransaction)=>{
                return compareTwoDates(toDate,transaction.dateOfTransaction)>=0;
            })
        }

        
    
      }

      function filterTransactionsByCategory(transactions:TTransaction[],category:string):TTransaction[]{
            return transactions.filter((transaction:TTransaction)=>{
                return transaction.category === category;
            })
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function handleFilter(filterOptions:any){
        logger.debug(filterOptions);
        const {category,dateRange,startingPrice,endingPrice} = filterOptions;
        let filteredTransactions = initialTransactions;
        if(category){
            filteredTransactions = filterTransactionsByCategory(filteredTransactions,category);
        }
        if(dateRange){
            filteredTransactions = filterTransactionsByDate(filteredTransactions,dateRange.from,dateRange.to);
        }
        if(startingPrice||endingPrice){
            filteredTransactions = filterTransactionsByPrice(filteredTransactions,startingPrice,endingPrice);
        }
        setFilteredTransactions(filteredTransactions);
      }


      useEffect(()=>{
        categoryService.getCategories().then((response:AxiosResponse)=>{
            const _categories = response.data;
            setFilterTransactionFormGenerator((previousState)=>{
                previousState.forEach((_element,index,array)=>{
                    if(array[index].name==='category'){
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (array[index].elementProps as any ).selectItems = _categories;
                    }
                });
                return previousState;
            })

        }).catch(()=>{
            toast({
                title:'unable to filter with categories',
                variant:'destructive'
            })
        })
      },[])

  return (
    <FilterPopOver handleFilter={handleFilter} filterForm={filterTransactionFormGenerator} />
  )
}

export default FilterTransactionsPopOver