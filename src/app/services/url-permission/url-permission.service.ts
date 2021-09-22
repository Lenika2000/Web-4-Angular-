import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class UrlPermission implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuthorized: boolean = localStorage.getItem('currentUser') != null;
    /*если пользователь не авторизован и если мы переходим на страницу с точками, то redirect на аутентификацию*/
    if (!isAuthorized && state.url.search('main') !== -1) {
      this.router.navigate(['auth/login']);
      return false;
      /*если пользователь авторизован и если мы переходим на страницу аутентификации(вводим в адресную строку),
      то redirect на страницу с точками(не дает уйти)*/
    } else if (isAuthorized && state.url.search('auth') !== -1) {
      this.router.navigate(['main']);
      return false;
    }
    return true;
  }
}
