/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'
import FilterPopOver from '../FilterPopOver/FilterPopOver'
import { FormGeneratorData } from '@/TypeDefinitions/FormGeneratorData';
import { TBill } from '@/TypeDefinitions/Bill';
import { compareTwoDates } from '@/utils/formatDate';

type FilterBillsProps = {
    bills:TBill[],
    setFilteredBills:Function
}

function FilterBills({bills,setFilteredBills}:FilterBillsProps) {

    const filterBillsFormData:FormGeneratorData[] = [
        {
            name:'startingPrice',
            type:'number',
            placeholder:'Start Price'
        },
        {
            name:'endingPrice',
            type:'number',
            placeholder:'End Price'
        },
        {
            type:'dateRangePicker',
            name:'dateRange',
            placeholder:'ending date'
        },
        {
            type:'submit',
            name:'filterBillSubmit',
            value:'Filter Bills'
        }
    ]

    function filterBillsByPrice(startingPrice:number,endingPrice:number,bills:TBill[]):TBill[]{
        if(startingPrice){
            bills = bills.filter((bill)=>{return bill.price >= startingPrice})
        }
        if(endingPrice){
            bills = bills.filter((bill)=>{return bill.price <= endingPrice})
        }
        return bills;
    }

    function filterBillsByDate(startDate:string,endDate:string,bills:TBill[]):TBill[]{
        if(startDate){
            bills = bills.filter((bill)=>{
                return compareTwoDates(startDate,bill.expiryDate) <=0;
            })
        }
        if(endDate){
            bills = bills.filter((bill)=>{
                return compareTwoDates(endDate,bill.expiryDate) >=0;
            })
        }

        return bills;
    }


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function filterBillsHandler(data:any){
        if(data.startingPrice || data.endingPrice){
          bills = filterBillsByPrice(data.startingPrice,data.endingPrice,bills);
        }
        if(data.dateRange){
            bills = filterBillsByDate(data.dateRange.from,data.dateRange.to,bills);
        }
        setFilteredBills(bills);
    }

  return (
    <FilterPopOver filterForm={filterBillsFormData} handleFilter={filterBillsHandler} />
  )
}

export default FilterBills;