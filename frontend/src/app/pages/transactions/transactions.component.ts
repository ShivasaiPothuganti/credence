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

	userTransactions:any[][] = Array.from({length:3},()=>{return new Array()});

	constructor(private transactionService:TransactionService,private notificationService:NotificationService){

	}

	ngOnInit():void{
		this.transactionService.getUserTransactions().subscribe((data)=>{
		 this.splitDataIntoColumns(data,3);
		}).add(()=>{
			console.log(this.userTransactions);
		})
	}

	deleteTransaction(transactionId:number){
		this.isLoading.value = true;
		this.transactionService.deleteTransaction(transactionId).subscribe((data)=>{
			this.userTransactions = this.userTransactions.filter((transactionColumn)=>{
				transactionColumn.filter((transaction)=>{
					return transaction.transactionId !== transactionId;
				})
			});
		},(err)=>{
			console.log("this is the actual error ",err);
			this.notificationService.notify("cannot delete Transaction please try again");
		}).add(()=>{
			this.isLoading.value = false;
		})
	}


	splitDataIntoColumns(data:any[],numberOfColumns:number){
		//const resultMatrix  =  Array.from({length:numberOfColumns},()=>{return new Array()})
		data.forEach((item:any,index:number) => {
			this.userTransactions[index%numberOfColumns].push(item)
		});
		
	}

}
