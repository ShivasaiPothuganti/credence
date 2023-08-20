import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
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

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const requestCopy = request.clone();
	if(requestCopy.url.includes('authenticate')){
		return next.handle(requestCopy);
	}
    const token:string|null = inject(AuthenticationService).getToken();
    if(token===null){
		this.redirectService.redirectToLoginPage();
		this.notificationService.notify("please login");
		return new Observable<HttpEvent<unknown>>(observer => {
			observer.complete();
		});
	}


    requestCopy.headers.set("authorization","Bearer "+token);
    return next.handle(requestCopy).pipe(
		tap(event=>{
			if(event instanceof HttpResponse){
				if(event.status===403){
					this.authService.removeToken();
					this.notificationService.notify("Unauthorized access");
					this.redirectService.redirectToLoginPage();
				}
			}
		})
	)
  }
}
