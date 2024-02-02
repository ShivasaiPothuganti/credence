import { Input } from './input';
import { Button } from './button';
import { FormGeneratorData } from '@/TypeDefinitions/FormGeneratorData';
import {SelectField} from './select';
import { Checkbox } from './checkbox';
import { DatePickerWithRange } from './DateRangePicker';
import {  useRef, useState } from 'react';
import { logger } from '@/helpers/loggers/logger';
import { addDays } from 'date-fns';
import { DateRange } from 'react-day-picker';


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




function Form({generatorData,onSubmit}:FormGeneratorProp) {
  const formElementsRef:Record<string,HTMLInputElement | null> = {};
  const formData = useRef({});
  const [selectedValue,setSelectedValue] = useState<string>("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  })


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getComponentByType(basicProps:BasicFormElementProps,additionalProps:any,elementReference:any){
	const {type,name,value,placeholder} = basicProps;
	switch(type){

		case 'dateRangePicker':
			
			return <DatePickerWithRange date={date} setDate={setDate} onSelect={(date)=>{formData.current[name]=date}} />

		case 'checkbox':
			return <span className="inline-block">
				
				<Checkbox name={name}  />
			</span>
		case 'submit':
			return <Button {...additionalProps} > {value} </Button>
		case 'button':
			return <Button {...additionalProps} > {value} </Button> 
		case 'select':
			return <SelectField
			selectedValue={selectedValue}
			setSelectedValue={setSelectedValue}
						onChange={(_value:string)=>{
									formData.current[name]=_value;
								}} 
					{...additionalProps} /> 
		default:
			return <Input ref={elementReference} type={type} value={value} name={name} placeholder={placeholder} {...additionalProps} />
	}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function handleSubmit(event:any){
		event.preventDefault();
		Object.keys(formElementsRef).forEach((key:string)=>{
			if(formElementsRef[key]?.type!='submit'){
				formData.current[key] = formElementsRef[key]?.value;
			}
		});
		logger.warn(formData);
		onSubmit(formData.current);
		formData.current = {}
		Object.keys(formElementsRef).forEach((key:string)=>{
			if(formElementsRef[key]?.type!='submit'){
				const element = formElementsRef[key];
				if(element){
					element.value = ''
				}
			}
		});
		setSelectedValue("");
		setDate(undefined);
		event.target.reset();
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

export default Form