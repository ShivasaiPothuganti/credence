import { IconFactory } from '@/assets/Icons/IconsFactory';
import { Button } from './button';

type CategoryPillProps = {
    category:string,
    edit:boolean,
    // eslint-disable-next-line @typescript-eslint/ban-types
    onDelete:Function
}

function CategoryPill({category,edit,onDelete}:CategoryPillProps) {
  return (
    <span className='h-10 pr-4 pl-4 rounded-2xl bg-primaryBlack text-white flex items-center justify-between relative gap-2 ' >
        <h3> {category} </h3>
        {
            edit? <Button onClick={()=>{onDelete(category)}} className='bg-primaryWhite relative right-0 top-0 h-[55%] w-6 p-1 rounded-lg hover:bg-red-500 ' >
                <img src={IconFactory.CrossIcon} className='w-full' />
            </Button>:null
        }
    </span>
  )
}

export default CategoryPill