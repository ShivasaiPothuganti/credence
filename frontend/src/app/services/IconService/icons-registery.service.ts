import { Injectable } from '@angular/core';
import { IconsFactory } from 'src/assets/Icons/IconFactory';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconsRegisteryService {

	constructor(private sanitizer:DomSanitizer) { 

	}

	icons:any = {
		home:this.convertSvgToSafeHtml(IconsFactory.Home),
		dashBoard:this.convertSvgToSafeHtml(IconsFactory.DashBoard),
		bills:this.convertSvgToSafeHtml(IconsFactory.Bills),
		splitBill:this.convertSvgToSafeHtml(IconsFactory.splitBill),
		collaborativeTransactions:this.convertSvgToSafeHtml(IconsFactory.roomsTransaction),
		wallet:this.convertSvgToSafeHtml(IconsFactory.wallet)
	}


	getIcons(){
		return this.icons;
	}

	convertSvgToSafeHtml(svgIcon:string){
		return this.sanitizer.bypassSecurityTrustHtml(svgIcon);
	}


}
