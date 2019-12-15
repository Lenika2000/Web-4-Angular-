import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";
import {UserCredentials} from "../../model/user-credentials";
import {AuthService} from "../../services/auth/auth.service";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  user: UserCredentials = new UserCredentials();
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.authService.logIn(this.user).subscribe(
      resp => this.router.navigate(['/main']),
      (err: HttpErrorResponse) => {
        console.log(err);
        switch (err.status) {
          case 0:
            this.errorMessage = "Unable to connect to backend service";
            break;
          case 401:
            this.errorMessage = "username or password is wrong";
            break;
          default:
            this.errorMessage = "unknown error " + err.status;
        }
      });
  }
}
