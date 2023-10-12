import { FormGeneratorData } from '@/TypeDefinitions/FormGeneratorData'
import { useEffect, useState } from 'react'
import FilterPopOver from '../FilterPopOver/FilterPopOver';
import { categoryService } from '@/services/api/CategoryService';
import { toast } from '../ui/use-toast';
import { AxiosResponse } from 'axios';

function FilterTransactions() {
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
            name:'endingDate',
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
    <FilterPopOver filterForm={filterTransactionFormGenerator} />
  )
}

export default FilterTransactions