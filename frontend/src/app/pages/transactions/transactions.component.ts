import { Component, HostBinding, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/Transaction/transaction.service';

@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

	@HostBinding('style.height') height = '100%';
	@HostBinding('style.width') width = '100%';


	userTransactions:any[] = [];

	constructor(private transactionService:TransactionService){

	}

	ngOnInit():void{
		this.transactionService.getUserTransactions().subscribe((data)=>{
			this.userTransactions = data;
		}).add(()=>{
			console.log(this.userTransactions);
		})
	}

}
