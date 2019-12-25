import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../model/user';
import {AuthService} from '../../services/auth/auth.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  errorMessage: string;

  constructor(private accountService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    this.accountService.createAccount(this.user).subscribe(data => {
        this.router.navigate(['/auth/login']).then();
      }, (err: HttpErrorResponse) => {
        console.log(err);
        switch (err.status) {
          case 0:
            this.errorMessage = 'Невозможно подключиться к серверу';
            break;
          case 409:
            this.errorMessage = 'Пользователь с данным именем уже существует';
            break;
          default:
            this.errorMessage = 'Неизвестная ошибка ' + err.status;
        }
      }
    );
  }
}
