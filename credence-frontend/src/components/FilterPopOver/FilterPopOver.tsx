import { FormGeneratorData } from "@/TypeDefinitions/FormGeneratorData"
import FilterButton from "../ui/FilterButton"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Form from "../ui/form";

type FilterForm = {
    filterForm:FormGeneratorData[],
    // eslint-disable-next-line @typescript-eslint/ban-types
    handleFilter:Function
}

function FilterPopOver({filterForm,handleFilter}:FilterForm) {

  return (
  
    <Popover>
      <PopoverTrigger >
        <FilterButton />
      </PopoverTrigger>
      <PopoverContent className="p-5 min-w-fit h-atuo flex flex-wrap gap-10">
        <Form generatorData={filterForm} onSubmit={handleFilter} />
      </PopoverContent>
    </Popover>
   
  )
}

export default FilterPopOver