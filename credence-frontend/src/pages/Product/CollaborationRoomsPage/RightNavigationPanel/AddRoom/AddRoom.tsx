import { FormGeneratorData } from "@/TypeDefinitions/FormGeneratorData"
import Form from '@/components/ui/form'
import { toast } from "@/components/ui/use-toast"
import { backendApiUrls } from "@/constants/backendApiEndpoints"
import { backend } from "@/services/api/Network/HttpHelper"

type RoomData = {
    title:string,
    totalPrice:number,
    expenditure?:number
}

function AddRoom({addNewRoom}:any) {

    const addRoomForm:FormGeneratorData[]=[
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

    function onSubmit(data:RoomData){
        backend.post(backendApiUrls.addRoom,data).then((response)=>{
            addNewRoom(response.data);
            toast({
                title:'Room added',
                variant:'default'
            })
        })
    }

  return (
    <div className="flex justify-center flex-col items-center w-full mt-2 gap-5">
        <h1 className="font-primary font-bold">Add a Room</h1>
        <div className="form w-full">
            <Form generatorData={addRoomForm} onSubmit={onSubmit} />
        </div>
    </div>
  )
}

export default AddRoom