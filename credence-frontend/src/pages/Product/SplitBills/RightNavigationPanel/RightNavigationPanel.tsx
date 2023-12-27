import { FormGeneratorData } from "@/TypeDefinitions/FormGeneratorData"
import Form from "@/components/ui/form"
import { backendApiUrls } from "@/constants/backendApiEndpoints"
import { backend } from "@/services/api/Network/HttpHelper"

function RightNavigationPanel() {

    const addGroupForm:FormGeneratorData[]=[
        {
            type:'text',
            name:'groupTitle',
            placeholder:'Split bill title'
        },
        {
            type:'number',
            name:'totalPrice',
            placeholder:'Price'
        },
        {
            type:'submit',
            name:'submit',
            value:'Add'
        }
    ]

    function onSubmit(data:any){
        backend.post(backendApiUrls.createSplit,data).then(()=>{
            
        })
    }
    
    return (
      <div className='h-full w-full m-2'>
        <div className="flex justify-center flex-col items-center w-full mt-2 gap-5">
        <h1 className="font-primary font-bold">Create a Split</h1>
        <div className="form w-full">
            <Form generatorData={addGroupForm} onSubmit={onSubmit} />
        </div>
    </div>
      </div>
    )
  }
  
  export default RightNavigationPanel