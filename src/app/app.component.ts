import { Component } from '@angular/core'; /*импорт функции декоратора*/

@Component({
  selector: 'app-root', /*тег html, идентифицирующий эту директиву в шаблоне index.html*/
  templateUrl: './app.component.html', /*адрес шаблона Angular компонента */
  styleUrls: ['./app.component.css'] /*файл, содержащий css cтили, используемые в данном компоненте*/
})
export class AppComponent {
  static API_URL = 'http://localhost:37780/api';

}

