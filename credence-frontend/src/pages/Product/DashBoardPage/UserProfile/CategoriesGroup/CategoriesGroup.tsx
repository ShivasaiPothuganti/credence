import CategoryPill from '@/components/ui/CategoryPill';
import React from 'react';

type CategoriesGroupProps = {
    categories:string[],
    // eslint-disable-next-line @typescript-eslint/ban-types
    deleteCategoryHandler:Function
    edit:boolean
}

function CategoriesGroup({categories,edit,deleteCategoryHandler}:CategoriesGroupProps) {

  return (
    <div className='w-full flex flex-wrap gap-3' >
        {
            categories.map((category)=>{
                return <CategoryPill onDelete={deleteCategoryHandler} edit={edit} category={category} />
            })
        }
    </div>
  )
}

export default CategoriesGroup