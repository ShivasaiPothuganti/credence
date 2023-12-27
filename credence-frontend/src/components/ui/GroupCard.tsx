import { Group } from "@/TypeDefinitions/Group";

type GroupInput = {
    group:Group
}

function GroupCard({group}:GroupInput) {
    return (
        <div className='h-32 w-[18rem] p-1 bg-card border text-card-foreground shadow-sm flex justify-between gap-2 rounded-lg cursor-pointer hover:scale-105'>
          <div className="icon-container flex-[0.4] p-5 ">
            <div className="icon bg-primaryBlack h-[5rem] w-[5rem] rounded-full flex justify-center items-center">
              <h1 className='text-primaryWhite font-bold text-5xl'>{group.groupTitle.charAt(0).toLocaleUpperCase()}</h1>
            </div>
          </div>
          <div className="room-details flex-[0.6] pt-3">
            <h1 className='font-semibold text-2xl mb-3'>{group.groupTitle}</h1>
            <h3 className='text-muted-foreground'>Price: ₹ {group.totalPrice}</h3>
            <h3 className='text-muted-foreground text-xs mt-3'>Created on: {group.createdOn.split('T')[0]}</h3>
          </div>
        </div>
      )
}

export default GroupCard;