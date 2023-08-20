import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthenticationService } from '../services/Authentication/authentication.service';
import { RedirectionService } from '../services/Redirection/redirection.service';


export const authGuard: CanActivateFn = (route, state):boolean|UrlTree => {
  const isAuthenticated = inject(AuthenticationService).isLoggedIn();
  if(isAuthenticated){
    return true;
  }
  else{
    inject(RedirectionService).redirectToLoginPage();
    return false;
  }
};
