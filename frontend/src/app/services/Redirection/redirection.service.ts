import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectionService {

	constructor(private router:Router) { }

	redirectToLoginPage(){
		this.router.navigate(['/authenticate'],{
			queryParams:{
				'mode':'login'
			}
		})
	}


	redirectToRegisterPage(){
		this.router.navigate(['/authenticate'],{
			queryParams:{
				'mode':'register'
			}
		})
	}

}
