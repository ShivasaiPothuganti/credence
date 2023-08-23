import { Component, EventEmitter, HostBinding, Input,OnInit, Output } from '@angular/core';
import { Loading } from 'src/app/types/Loading';

@Component({
  selector: 'transactioncard',
  templateUrl: './transactioncard.component.html',
  styleUrls: ['./transactioncard.component.scss']
})
export class TransactioncardComponent implements OnInit {

  @Input() transactionId!:number;
  @Input() title!:string;
  @Input() price!:number;
  @Input() category!:string;
  @Input() description:string|null = null;
  @Input() transactionDate!:string;
  @Input() roomId!:number;
  @Input() groupId!:number;


  @Input() isLoading!:Loading;

  @Output() onDelete = new EventEmitter<number>();


  validateMandatoryProps(){
    if(!this.transactionId){
      throw new Error("transaction id prop is missing");
    }
    if(!this.title){
      throw new Error("title prop is missing ")
    }
    if(!this.price){
      throw new Error("price prop is missing")
    }
    if(!this.category){
      throw new Error("category prop is missing");
    }
    if(!this.transactionDate){
      throw new Error("transactionDate prop is missing");
    }
  }

  ngOnInit(): void {
    this.validateMandatoryProps();
    
  }

  deleteTransaction(transactionId:number){
    this.onDelete.emit(transactionId);
  }


}
