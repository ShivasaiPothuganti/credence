import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';


@Component({
  selector: 'Hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {


	constructor(private router:Router){}


	title:string = "Credence - Your Personal Transaction Hub";
	description:string = `Discover financial harmony with our innovative platform! Easily track 
							and analyze personal transactions, share expenses with roommates, and 
							set budget goals for smarter spending. Embrace financial empowerment 
							together as you gain valuable insights from your collective transactions. 
							`

	options:AnimationOptions={
		path:"../../../assets/heroSection.json"
	}

	navigatetoAuthentication(){
		this.router.navigate(['/product/']);
	}

}
