import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRef } from "react";


type InputProps = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    getSearchQuery:Function
}

export default function SearchBar({getSearchQuery}:InputProps) {

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center space-x-2">
      <Input ref={inputRef} type="text" className="px-3 py-2 w-80" placeholder="Search..." />
      <Button 
        onClick={()=>{
          if(inputRef.current){
            getSearchQuery(inputRef.current.value);
            // inputRef.current.value = ""
          }         
        }}
      className="px-3 py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </Button>
    </div>
  )
}