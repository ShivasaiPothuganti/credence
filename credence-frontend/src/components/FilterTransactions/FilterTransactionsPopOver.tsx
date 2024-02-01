import { FormGeneratorData } from '@/TypeDefinitions/FormGeneratorData'
import { useEffect, useState } from 'react'
import FilterPopOver from '../FilterPopOver/FilterPopOver';
import { categoryService } from '@/services/api/CategoryService';
import { toast } from '../ui/use-toast';
import { AxiosResponse } from 'axios';
import { TTransaction } from '@/TypeDefinitions/Transaction';
import { compareTwoDates } from '@/utils/formatDate';


type FilterTransactionsPopOver = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    setFilteredTransactions:Function,
    initialTransactions:TTransaction[],
    dateRange?:boolean,
    categoryOrType?:boolean,
    priceRange?:boolean,
    category?:boolean,
    // eslint-disable-next-line @typescript-eslint/ban-types
    onSubmit?:Function
}

function FilterTransactionsPopOver({setFilteredTransactions,initialTransactions,dateRange=true,categoryOrType=true,priceRange=true,category=true,onSubmit}:FilterTransactionsPopOver) {
    const [filterTransactionFormGenerator,setFilterTransactionFormGenerator] = useState<FormGeneratorData[]>([]);

      useEffect(()=>{
            const filterTransactionForm:FormGeneratorData[] = [
                  
            ]

            if(priceRange){
                filterTransactionForm.push({
                    type:'number',
                    name:'startingPrice',
                    placeholder:'starting price'
                },
                {
                    type:'number',
                    name:'endingPrice',
                    placeholder:'ending price'
                },)
            }
            if(dateRange){
                filterTransactionForm.push({
                    type:'dateRangePicker',
                    name:'dateRange',
                    placeholder:'ending date',                    
                });
            }
            if(category){
                filterTransactionForm.push(
                    {
                        type:'select',
                        name:'category',
                        placeholder:'category',
                        elementProps:{
                            selectPlaceholder:'Category',
                            selectLabel:'Category',
                            selectItems:[]
                        }
                    }
                )
            }

            if(categoryOrType){
                filterTransactionForm.push(
                    {
                        type:'select',
                        name:'categoryOrType',
                        placeholder:'categoryOrType',
                        elementProps:{
                            selectPlaceholder:'Category',
                            selectLabel:'Category',
                            selectItems:['category','type']
                        }
                    }
                )
            }

            filterTransactionForm.push({
                type:'submit',
                name:'Filter',
                value:'Filter'
            } )

            setFilterTransactionFormGenerator(filterTransactionForm);
      },[]);

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
        const {category,dateRange,startingPrice,endingPrice,categoryOrType} = filterOptions;
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
        if(onSubmit){
            if(!categoryOrType){
                onSubmit('category');
                return;
            }
            onSubmit(categoryOrType);
        }
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