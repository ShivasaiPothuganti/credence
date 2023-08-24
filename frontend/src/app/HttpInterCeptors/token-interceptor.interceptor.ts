import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthenticationService } from '../services/Authentication/authentication.service';
import { RedirectionService } from '../services/Redirection/redirection.service';
import { NotificationService } from '../services/Notification/notification.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
	private authService:AuthenticationService,
	private redirectService:RedirectionService,
	private notificationService:NotificationService
	) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
	const token:string|null = inject(AuthenticationService).getToken();



    
	if(request.url.includes('authenticate')){
		return next.handle(request);
	}
    
    if(token===null){
		this.redirectService.redirectToLoginPage();
		this.notificationService.notify("please login");
		return new Observable<HttpEvent<unknown>>(observer => {
			observer.complete();
		});
	}
	const requestCopy = request.clone({
		setHeaders:{
			'Authorization':`Bearer ${token}`
		}
	});


    return next.handle(requestCopy).pipe(
		catchError((error:any)=>{
			if(error instanceof HttpErrorResponse){
				if(error.status===403){
					this.redirectService.redirectToLoginPage();
					this.notificationService.notify("Unauthorized access");
					return new Observable<HttpEvent<any>>(observer=>{
						observer.complete();
					})
				}
			}
			return throwError(()=>error);
		})
	)
  }
}
