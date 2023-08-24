import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { backendBaseUrl } from 'src/app/constants/Backend';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http:HttpClient) { }

  getUserTransactions():Observable<any>{
    const url = backendBaseUrl+"/transactions/users";
    return this.http.get(url);
  }

  deleteTransaction(transactionId:number):Observable<any>{
	const url = backendBaseUrl + `/transactions/${transactionId}`;
	return this.http.delete(url);
  }

}
