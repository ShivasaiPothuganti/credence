import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InputField } from 'src/app/types/InputField';
import { Loading } from 'src/app/types/Loading';


@Component({
  selector: 'form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss']
})
export class FormComponentComponent implements OnInit {
	@Input() formTemplateData!:InputField[];

	@Output() onSubmit = new EventEmitter();

	@Input() isLoading:Loading = {
		value:false
	};

	formSubmissionData : { [key:string]:any } = {} ;

	constructor(){

	}

	ngOnInit(): void {
		

		this.formTemplateData.forEach((inputField)=>{
			if(!inputField.name){
				throw new Error('name attribute is missing in the formTemplateData');
			}
			if(!(inputField.type==="text")&&!(inputField.type==="email")&&!(inputField.type==="password")&&!(inputField.type==="submit")){
				throw new Error('inputtypes of text email password and submit are only allowed');
			}
			if(inputField.type==="text"||inputField.type==="email"||inputField.type==="password"){
				this.formSubmissionData[inputField.name] = '';
			}
		});
	}

	submitForm(){
		this.onSubmit.emit(this.formSubmissionData);
	}

	
	
}
