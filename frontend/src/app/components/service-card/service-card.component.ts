import { Component, Input } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'Service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent {
	@Input() options!:AnimationOptions;
	@Input() title!:string;
	@Input() description!:string;
	
}
