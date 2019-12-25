import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {User} from '../model/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent {
  currentUser: User;

  constructor(private authService: AuthService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  logOut() {
    this.authService.logOut();
  }

}
