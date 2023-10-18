import Form from "@/components/ui/form";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { logger } from "@/helpers/loggers/logger";
import { FormGeneratorData } from "@/TypeDefinitions/FormGeneratorData";
import { authenticationService } from "@/services/api/AuthenticationService";
import { UserCredentials } from "@/TypeDefinitions/UserCredentials";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { Toaster } from "@/components/ui/toaster";
import { ToastOptions } from "@/TypeDefinitions/ToastOptions";
import { useEffect, useState } from "react";

type AuthenticationPageProps = {
	setAuth : React.Dispatch<React.SetStateAction<boolean>>
}

function AuthenticationPage({setAuth}:AuthenticationPageProps) {

	const [searchParams,setSearchParams] = useSearchParams();
	const {toast} = useToast();
	const [mode,setMode] = useState('');
	const navigate = useNavigate();
	useEffect(()=>{
		const mode = searchParams.get('mode') as string;
		if(mode==='login'||mode=='register'){
			setMode(mode)
		}
		else{
			setMode('login');
			setSearchParams({mode:'login'})
		}
	})
	const loginFormGeneratorData:FormGeneratorData[] = [
		{
			type:'text',
			name:'userName',
			placeholder:'Username'
		},
		{
			type:'gmail',
			name:'userEmail',
			placeholder:'Gmail'
		},
		{
			type:'password',
			name:'password',
			placeholder:'password'
		},
		{
			type:'submit',
			name:'submit',
			value:'Login'
		},
	]

	const registerFormGeneratorData:FormGeneratorData[] = [

		{
			type:'text',
			name:'userName',
			placeholder:'username'
		},
		{
			type:'email',
			name:'userEmail',
			placeholder:'Gmail'
		},
		{
			type:'password',
			name:'password',
			placeholder:'password'
		},
		{
			type:'submit',
			value:'Register',
			name:'submit'
		}
	]


	function redirectToAuthenticationMode(mode:string){
		navigate({
			pathname:'/authenticate',
			search:`${createSearchParams({
				mode:mode
			})}`
		})
	}
	

	async function handleAuthentication(userAuthenticationCredentials:UserCredentials){
		logger.debug(userAuthenticationCredentials);
		try{
			const response =  await authenticationService.authenticate(mode,userAuthenticationCredentials);
			if(response&&response.data){
				authenticationService.setToken(response.data.token);
				setAuth(true);
				navigate('/product/transactions');
			}
		}
		catch(error){
			const e = error as AxiosError;
			const status = (e?.response?.status);
			setAuth(false);
			if(status===409){
				toast({
					title:'Account already exists',
					description:'You already have an account,Please login with your  credentials',
					variant:'destructive'
				})
			}
			else{
				let toastOptions:ToastOptions;
				if(mode==='login'){
					toastOptions = {
						title:'login Failed',
						description:'Login failed please check the credentials',
						variant:'destructive'
					}
				}
				else{
					toastOptions = {
						title:'Registration Failed',
						description:'Registration failed please try again in some time',
						variant:'destructive'
					}
				}
				toast(toastOptions);
			}
		}
		
	}

  return (
    <section className="h-screen w-screen flex justify-center items-center" >
		<div className="authenticate-left h-full flex-[0.5] bg-primaryBlack">

		</div>
		<div className="authenticate-right h-full flex-[0.5] gap-5 flex flex-col justify-center items-center ">
			<Toaster />
			<div className="greeting-text">
				<h1 className="text-2xl font-primary font-bold" > {
					mode==='login'?'Welcome back':'Create your Account'	
				} </h1>
			</div>
			<div className="form-container w-96 ">
				<Form 
					generatorData={mode==='login'?loginFormGeneratorData:registerFormGeneratorData} 
					onSubmit={handleAuthentication} 
				/>
			</div>
			<div className="login-redirects">
				{
					mode==='login'?
					<p className="font-primary text-gray-500" > Dont have account? <a className="text-primaryBlack cursor-pointer" onClick={()=>{ redirectToAuthenticationMode('register') }}>Register</a> </p>
						:
					<p className="font-primary text-gray-500" >
						Already have an account? <a className="text-primaryBlack cursor-pointer " onClick={()=>{redirectToAuthenticationMode('login')}} >Login</a>
					</p>

				}
			</div>
		</div>
		
	</section>
  )
}

export default AuthenticationPage;