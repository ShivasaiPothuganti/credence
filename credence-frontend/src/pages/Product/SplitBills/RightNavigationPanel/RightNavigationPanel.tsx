import { FormGeneratorData } from "@/TypeDefinitions/FormGeneratorData"
import Form from "@/components/ui/form"

function RightNavigationPanel({addNewRoom}:any) {

    const addGroupForm:FormGeneratorData[]=[
        {
            type:'text',
            name:'title',
            placeholder:'Room title'
        },
        {
            type:'number',
            name:'totalPrice',
            placeholder:'Room budget'
        },
        {
            type:'submit',
            name:'submit',
            value:'Add'
        }
    ]
    
    return (
      <div className='h-full w-full m-2'>
        <div className="flex justify-center flex-col items-center w-full mt-2 gap-5">
        <h1 className="font-primary font-bold">Add a Room</h1>
        <div className="form w-full">
            <Form generatorData={addGroupForm} onSubmit={onSubmit} />
        </div>
    </div>
      </div>
    )
  }
  
  export default RightNavigationPanel