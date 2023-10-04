import { Input } from './input';
import { Button } from './button';
import { FormGeneratorData } from '@/TypeDefinitions/FormGeneratorData';
import { Select } from './select';

type FormGeneratorProp = {
	generatorData:FormGeneratorData[],
	referenceFunction?:Function,
	onSubmit:Function
}




function form({generatorData,onSubmit}:FormGeneratorProp) {

  const formElementsRef:Record<string,HTMLInputElement | null> = {};

  function getComponentByType(type:string){
	switch(type){
		case 'button':
			return Button 
		case 'select':
			return Select 
		default:
			return Input
	}
	}

  return (
    <>
      <form className='flex flex-col gap-3'  onSubmit={
			(event)=>{
				event.preventDefault();
				const formData:Record<string,unknown> = {};
				Object.keys(formElementsRef).forEach((key:string)=>{
					if(formElementsRef[key]?.type!='submit'){
						formData[key] = formElementsRef[key]?.value;
					}
				})
				onSubmit(formData);
		}}>
        {
			generatorData.map((generatorData,index)=>{
				const FormElement = getComponentByType(generatorData.type);
				return(
					<FormElement
					 ref={ generatorData.==='submit'? (element)=>{

					}} /> 
					// generatorData.type!=='submit'?
					// (<Input key={index} ref={(element)=>{
					// 	formElementsRef[element?.name as string] = element;
					// }} name ={generatorData.name} type={generatorData.type} placeholder={generatorData?.placeholder }/>):
					// <Button key={index} > {generatorData.value} </Button>
				)
			})
		}
      </form>
    </>
  )
}

export default form