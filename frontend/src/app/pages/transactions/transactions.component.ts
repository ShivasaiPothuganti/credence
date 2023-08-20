import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TransactionService } from 'src/app/services/Transaction/transaction.service';

@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class TransactionsComponent implements OnInit {
	constructor(private transactionService:TransactionService){

	}

	ngOnInit():void{
		this.transactionService.getUserTransactions().subscribe((data)=>{
			console.log(data);
		},(err)=>{
			console.log(err);
		})
	}

}
