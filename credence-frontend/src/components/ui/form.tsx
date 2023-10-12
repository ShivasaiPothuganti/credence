import { Input } from './input';
import { Button } from './button';
import { FormGeneratorData } from '@/TypeDefinitions/FormGeneratorData';
import {SelectField} from './select';
import { Checkbox } from './checkbox';

type FormGeneratorProp = {
	generatorData:FormGeneratorData[],
	// eslint-disable-next-line @typescript-eslint/ban-types
	referenceFunction?:Function,
	// eslint-disable-next-line @typescript-eslint/ban-types
	onSubmit:Function
}

type BasicFormElementProps = {
	type:string,
	value:string|undefined,
	name:string,
	placeholder?:string,
	required?:boolean
}




function form({generatorData,onSubmit}:FormGeneratorProp) {

  const formElementsRef:Record<string,HTMLInputElement | null> = {};
  let formData:Record<string,unknown> = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getComponentByType(basicProps:BasicFormElementProps,additionalProps:any,elementReference:any){
	const {type,name,value,placeholder} = basicProps;
	switch(type){
		case 'checkbox':
			return <span className="inline-block">
				
				<Checkbox name={name}  />
				<p>{'hiello'}</p>
			</span>
		case 'submit':
			return <Button {...additionalProps} > {value} </Button>
		case 'button':
			return <Button {...additionalProps} > {value} </Button> 
		case 'select':
			return <SelectField reference = {elementReference} onChange={(value:string)=>{formData[name]=value}} {...additionalProps} /> 
		default:
			return <Input ref={elementReference} type={type} value={value} name={name} placeholder={placeholder} {...additionalProps} />
	}
	}

	function handleSubmit(event:React.FormEvent){
		event.preventDefault();
		Object.keys(formElementsRef).forEach((key:string)=>{
			if(formElementsRef[key]?.type!='submit'){
				formData[key] = formElementsRef[key]?.value;
			}
		})
		onSubmit(formData);
		formData = {}
		Object.keys(formElementsRef).forEach((key:string)=>{
			if(formElementsRef[key]?.type!='submit'){
				const element = formElementsRef[key];
				if(element){
					element.value = ''
				}
			}
		})
	}


  return (
    <>
      <form className='flex flex-col gap-3'  onSubmit={handleSubmit}>
        {
			generatorData.map((generatorData)=>{
				const basicProps = {type:generatorData.type,value:generatorData.value,name:generatorData.name,placeholder:generatorData.placeholder,required:generatorData.required};
				const FormElement = getComponentByType(
					basicProps,
					generatorData.elementProps,
					(element:HTMLInputElement)=>{
						formElementsRef[element?.name as string] = element;
					}
				);
				return(
					FormElement
				)
			})
		}
      </form>
    </>
  )
}

export default form