import { Component, OnInit } from '@angular/core';
import {  SafeHtml } from '@angular/platform-browser';
import { AnimationOptions } from 'ngx-lottie';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { IconsRegisteryService } from 'src/app/services/IconService/icons-registery.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {


	constructor(private iconService:IconsRegisteryService,private authenticationService:AuthenticationService){

	}
	icons:any = {};
	avatarAnimationOptions:AnimationOptions = {
		path:'../../assets/avatar.json',
	}

	ngOnInit(): void {
		this.icons = this.iconService.getIcons();
	}
	logOut(){
		this.authenticationService.logOut();
	}
}
