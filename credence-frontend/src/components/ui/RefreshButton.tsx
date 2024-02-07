import { IconFactory } from '@/assets/Icons/IconsFactory';
import React, { MouseEventHandler } from 'react';
import { Button } from '@/components/ui/button';

type RefreshButtonProps={
  onClick:MouseEventHandler<HTMLButtonElement>
}

function RefreshButton({onClick}:RefreshButtonProps) {
  return (
    <Button onClick={onClick} variant={'secondary'} className='shadow-lg' >
        <img className=' h-full w-full' src={IconFactory.RefreshIcon} alt="" />
    </Button>
  )
}

export default RefreshButton;