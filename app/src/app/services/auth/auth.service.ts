import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';
import {UserCredentials} from '../../model/user-credentials';
import {ResponseMessage} from '../../model/response-message';
import {tap} from "rxjs/operators";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  createAccount(user: UserCredentials) {
    return this.http.post(AppComponent.API_URL + '/users/register', user)
      .pipe(tap((resp) => console.log(resp),
          error => {
        console.log('create acc error: ' + error);
      }));
  }

  public logIn(user: UserCredentials) {
    return this.http.post(AppComponent.API_URL + '/users/login', user)
      .pipe(tap(data => {
        const token = (<ResponseMessage>data).message;

        localStorage.setItem('authToken', <string>token);
        localStorage.setItem('currentUser', JSON.stringify(user));
      }, error => {
        console.log('login error: ' + error);
      }));
  }

  logOut() {
    const user: UserCredentials = JSON.parse(localStorage.getItem('currentUser'));
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');

    return this.http.post(AppComponent.API_URL + '/users/logout', user).subscribe(
      data => {
        this.router.navigate(['auth/login']).then(r => console.log(r));
      },
      error => {
        console.log('logout error: ' + error);
      });
  }

}
