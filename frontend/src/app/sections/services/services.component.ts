import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'Services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
	addTransactionsOptions:AnimationOptions = {
		path:'../../../assets/add_transactions.json'
	}

	collaborationRoomsOptions:AnimationOptions = {
		path:'../../../assets/collaboration_rooms.json'
	}

	splitbillTransactions:AnimationOptions = {
		path:'../../../assets/splitbill.json'
	}

}
