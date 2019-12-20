import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {UserCredentials} from "../model/user-credentials";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
  currentUser: UserCredentials;
  section: string;
  @ViewChild("moreInfo")
  infoBlock: ElementRef;

  constructor(private authService: AuthService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.section = window.location.pathname.substr(1);
  }

  logOut() {
    this.authService.logOut();
  }

  showMoreInfo() {
    this.infoBlock.nativeElement.style.visibility = this.infoBlock.nativeElement.style.visibility?'':'hidden';
  }

}
