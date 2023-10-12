import { FormGeneratorData } from "@/TypeDefinitions/FormGeneratorData"
import FilterButton from "../ui/FilterButton"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Form from "../ui/form";
import { logger } from "@/helpers/loggers/logger";

type FilterForm = {
    filterForm:FormGeneratorData[]
}

function FilterPopOver({filterForm}:FilterForm) {

    function handleFilter(data:unknown){
        logger.debug(data)
    }

  return (
  
    <Popover>
      <PopoverTrigger >
        <FilterButton />
      </PopoverTrigger>
      <PopoverContent className="w-80 h-atuo flex flex-wrap gap-10">
        <Form generatorData={filterForm} onSubmit={handleFilter} />
      </PopoverContent>
    </Popover>
   
  )
}

export default FilterPopOver