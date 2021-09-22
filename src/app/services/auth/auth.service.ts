import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';
import {User} from '../../model/user';
import {ResponseMessage} from '../../model/response-message';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthService {

  public authenticated = false;

  constructor(private http: HttpClient, private router: Router) { }

  private getHeaders(): HttpHeaders {
    const token: string = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  createAccount(user: User) {
    return this.http.post(AppComponent.API_URL + '/users/register', user);
  }

  public logIn(user: User) {
    return this.http.post(AppComponent.API_URL + '/users/login', user)
      .pipe(tap(data => {
        const token = (<ResponseMessage>data).message;
        localStorage.setItem('authToken', <string>token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.authenticated = true;
      }, error => {
        console.log('login error: ' + error);
      }));
  }

  logOut() {
    const user: User = JSON.parse(localStorage.getItem('currentUser'));

    return this.http.post(AppComponent.API_URL + '/users/logout', user, {headers: this.getHeaders()}).subscribe(
      data => {
        this.authenticated = false;
      },
      error => {
        console.log('logout error: ' + error);
      })
      .add(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        window.location.reload();
      });
  }

}
