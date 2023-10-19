import React from 'react'
import { Button } from './button';
import { IconFactory } from '@/assets/Icons/IconsFactory';

function FilterButton() {
  return (
    <Button variant={'secondary'} className='shadow-lg' >
        <img className=' h-full w-full' src={IconFactory.filterIcon} alt="" />
    </Button>
  )
}

export default FilterButton