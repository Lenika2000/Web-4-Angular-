import { Component, OnInit, ViewEncapsulation } from '@angular/core'; /*импорт функции декоратора*/
import {Router} from '@angular/router'; /*отвечает за навигацию*/
import {User} from '../../model/user';
import {AuthService} from '../../services/auth/auth.service';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-login', /*тег html, идентифицирующий эту директиву в шаблоне index.html*/
  templateUrl: './login.component.html', /*адрес шаблона Angular компонента */
  styleUrls: ['./login.component.css'], /*файл, содержащий css cтили, используемые в данном компоненте*/
})
export class LoginComponent { /*данный класс можем использовать в ругих модулях*/
  user: User = new User();
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  login() {
    /*с помощью subscribe ожидаем результат*/
    this.authService.logIn(this.user).subscribe(
      resp => this.router.navigate(['/main']), /*если успешно уходим на main*/
      (err: HttpErrorResponse) => {
        console.log(err);
        switch (err.status) {
          case 0:
            this.errorMessage = 'Невозможно подключиться к серверу';
            break;
          case 401:
            this.errorMessage = 'Введен неверный пароль';
            break;
          default:
            this.errorMessage = 'Неизвестная ошибка ' + err.status;
        }
      });
  }
}
