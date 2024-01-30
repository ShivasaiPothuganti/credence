import { TTransaction } from '@/TypeDefinitions/Transaction'
import React, { useEffect, useState } from 'react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from "@tanstack/react-table"
  
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { transformISOtoDateTime } from '@/utils/formatDate';
import {convertCurrencyToInr} from '@/utils/currencyConverter';

type TransactionTable = {
    transactions:TTransaction[]
}

function TransactionTable({transactions}:TransactionTable) {

    const [formattedTransactions,setFormattedTransactions] = useState<TTransaction[]>([]);

   useEffect(()=>{
    setFormattedTransactions(transactions.map((transaction)=>{
            if(!transaction.category){
                transaction.category = '-'
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
            transaction.dateOfTransaction = transformISOtoDateTime(transaction.dateOfTransaction);
            return transaction;
        }));
   },[transactions]);

    const columns:ColumnDef<TTransaction>[] =   [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "price",
        header: "Amount",
        cell:({row})=>{
            const amount = parseFloat(row.getValue("price"));
            console.log(amount);
            const formattedAmount = convertCurrencyToInr(amount);
            return <span> {formattedAmount} </span>
        }
      },
      {
        accessorKey: "dateOfTransaction",
        header: "Date",
      },
      {
        accessorKey:'category',
        header:"Category"
      },
      {
        accessorKey:'type',
        header:'Transaction type',
        cell:({row})=>{
            return <span className='bg-primaryBlack pl-4 pr-4 pt-2 pb-2 rounded-lg text-primaryWhite' > {row.getValue('type')} </span>
        }
      }
     
    ]

  return (
    <div className='w-full pl-10 pr-10' >
       < DataTable columns={columns} data={formattedTransactions} />
    </div>
  )
}

export default TransactionTable;



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div  className="rounded-md border h-40 overflow-y-scroll relative ">
      <Table >
        <TableHeader className='sticky z-[2] top-0 w-full  bg-primaryWhite' >
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className='text-black font-bold text-[1rem]' key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody >
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <>
                    <TableCell className='font-primary' key={cell.id}>
                    {
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                    }
                  </TableCell>
                  </>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>

      </Table>
    </div>
  )
}
