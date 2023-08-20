import { Component, Input, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'navlink',
  templateUrl: './navlink.component.html',
  styleUrls: ['./navlink.component.scss']
})
export class NavlinkComponent implements OnInit {
	@Input() icon!:SafeHtml;
	@Input() routerLink!:string[];
	@Input() queryParams!:Object;
	@Input() title!:string;
	@Input() linkStyling!:string;
	@Input() iconStyling!:string;

	ngOnInit(): void {
		if(!this.routerLink){
			throw new Error("routerLink is not provided");
		}
		if(!this.title){
			throw new Error("title is not provided");
		}
	}

}
