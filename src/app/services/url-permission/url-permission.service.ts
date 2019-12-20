import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class UrlPermission implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isAuthorized: boolean = !!localStorage.getItem('currentUser');

    if (!isAuthorized && state.url.match(/^\/(main)$/ig)) {
      this.router.navigate(['auth/login'], {queryParams: {returnUrl: state.url}});
      return false;
    } else if (isAuthorized && state.url.match(/^\/(auth)$/ig)) {
      this.router.navigate(['main']);
      return false;
    }
    return true;
  }
}
