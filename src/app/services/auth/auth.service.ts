import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';
import {User} from '../../model/user';
import {ResponseMessage} from '../../model/response-message';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthService {

  public authenticated = false;

  constructor(private http: HttpClient, private router: Router) { }

  createAccount(user: User) {
    return this.http.post(AppComponent.API_URL + '/users/register', user);
  }

  public logIn(user: User) {
    return this.http.post(AppComponent.API_URL + '/users/login', user)
      .pipe(tap(data => {
        const token = (<ResponseMessage>data).message;
        /*Сохранение информации о пользователе*/
        localStorage.setItem('authToken', <string>token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.authenticated = true;
      }, error => {
        console.log('login error: ' + error);
      }));
  }

  logOut() {
    const user: User = JSON.parse(localStorage.getItem('currentUser'));
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');

    return this.http.post(AppComponent.API_URL + '/users/logout', user).subscribe(
      data => {
        this.router.navigate(['auth/login']).then(r => console.log(r));
        this.authenticated = false;
      },
      error => {
        console.log('logout error: ' + error);
      });
  }

}
