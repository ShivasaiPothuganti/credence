import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { backendBaseUrl } from 'src/app/constants/Backend';
import { LoginCredentials } from 'src/app/types/LoginCredentials';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

	constructor(
		private http:HttpClient
	) 
	{

	}

	login(usercredentials:LoginCredentials):Observable<string>{
		
		const authenticationUrl = backendBaseUrl+'/authenticate/login';
		console.log(authenticationUrl);
		return this.http.post<string>(authenticationUrl,{
			...usercredentials
		});
	}

	logOut(){
		this.removeToken();
	}

	register(usercredentials:LoginCredentials):Observable<string>{
		const authenticationUrl = backendBaseUrl+'/authenticate/register';
		return this.http.post<string>(authenticationUrl,{
			...usercredentials
		});
	}


	authenticate(mode:string,usercredentials:LoginCredentials):Observable<string>{
		if(mode==='login'){
			return this.login(usercredentials);
		}
		else{
			return this.register(usercredentials);
		}
	}
	
	setToken(token:string):void{
		localStorage.setItem('token',token);
	}

	getToken():string|null{
		return localStorage.getItem('token');
	}

	isLoggedIn():boolean{
		const token:string|null = this.getToken();
		if(token){
			return true;
		}
		else{
			return false;
		}
	}

	removeToken():void{
		localStorage.removeItem('token');
	}



}
