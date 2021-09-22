import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Point} from '../../model/point';
import {PointsService} from '../../services/points/points.service';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HistoryComponent implements OnInit {
  public points: Point[];

  constructor(private service: PointsService, private authService: AuthService) { }

  ngOnInit() {
    this.service.points.subscribe(value => this.points = value);
    this.service.getPoints();
  }

  updatePoint(point: Point) {
    point.r = this.service.getR();
    this.service.updatePoint(point).then(data => {
       this.service.getPoints();
    }).catch((err: HttpErrorResponse) => {
      if (err.status === 401 || err.status === 403) {
        this.authService.logOut();
      }
    });
  }

}
