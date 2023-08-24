import { Component, HostBinding, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/Notification/notification.service';
import { TransactionService } from 'src/app/services/Transaction/transaction.service';
import { InputField } from 'src/app/types/InputField';
import { Loading } from 'src/app/types/Loading';

@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

	@HostBinding('style.height') height = '100%';
	@HostBinding('style.width') width = '100%';

	isLoading:Loading={
		value:false
	}

	logTheFrom($event:any){
		console.log($event)
	}

	userTransactions:any[] = [];

	constructor(private transactionService:TransactionService,private notificationService:NotificationService){

	}

	ngOnInit():void{
		this.transactionService.getUserTransactions().subscribe((data)=>{
			this.userTransactions = data;
		}).add(()=>{
			console.log(this.userTransactions);
		})
	}

	deleteTransaction(transactionId:number){
		this.isLoading.value = true;
		this.transactionService.deleteTransaction(transactionId).subscribe((data)=>{
			this.userTransactions = this.userTransactions.filter((transaction)=>{
				return transaction.transactionId !== transactionId
			});
		},(err)=>{
			console.log("this is the actual error ",err);
			this.notificationService.notify("cannot delete Transaction please try again");
		}).add(()=>{
			this.isLoading.value = false;
		})
	}

}
