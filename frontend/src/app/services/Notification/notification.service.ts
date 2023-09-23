import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

	constructor() { }

	notify(message:string):void{
		alert(message);
	}

}