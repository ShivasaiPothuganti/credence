import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { InputField } from 'src/app/types/InputField';


@Component({
  selector: 'authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {

	mode:string = '';
	constructor(
		private authenticationService:AuthenticationService,
		private router:Router,
		private activatedRouter:ActivatedRoute
	){

	}

	

	ngOnInit(): void {
		this.activatedRouter.queryParams.subscribe((params:Params)=>{
			this.mode = params['mode'];
			if(this.mode!=="login"&&this.mode!=="register"){
				this.router.navigate(['/authenticate'],{
					queryParams:{
						'mode':'login'
					}
				});
			}
		});
	}

	isAuthenticating = { value:false };


	authenticate($event:any){
		this.isAuthenticating.value = true;

		this.authenticationService.authenticate(this.mode,{...$event}).subscribe((data:any)=>{
			this.authenticationService.setToken(data.token);
			this.router.navigate([
				'/product/transactions'
			])
		},(err)=>{
			
			console.log("Authentication failed",err);
		})
		.add(()=>{
			this.isAuthenticating.value = false;
		});
	}

	loginAnimation:AnimationOptions = {
		path:'../../../assets/Login.json'
	}

	LoginformJson:InputField[] = [
		{
			type:"email",
			name:"userEmail",
			placeholder:"Email"
		},
		{
			type:"text",
			name:"userName",
			placeholder:"Username",
			required:true
		},
		{
			type:"password",
			name:"password",
			placeholder:"Password",
			required:true
		},
		{
			type:"submit",
			value:"Login",
			name:"submit"
		}
	];

	RegisterformJson:InputField[] = [
		{
			name:'userEmail',
			type:'email',
			placeholder:'Email'
		},
		{
			name:'userName',
			type:'text',
			placeholder:'Username'
		},
		{
			name:'password',
			type:'password',
			placeholder:'Password'
		},
		{
			name:'submit',
			type:'submit',
			value:'Register'
		}
	]



}
