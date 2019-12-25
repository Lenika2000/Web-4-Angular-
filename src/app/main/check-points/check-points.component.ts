import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { isNumeric } from 'rxjs/util/isNumeric';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../services/auth/auth.service';
import {PointsService} from '../../services/points/points.service';
import {Point} from '../../model/point';
import {HistoryComponent} from '../history/history.component';
import {Graphic} from '../../model/graphic';

@Component({
  providers: [HistoryComponent],
  selector: 'app-check-points',
  templateUrl: './check-points.component.html',
  styleUrls: ['./check-points.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CheckPointsComponent implements OnInit {

  @ViewChild('canvas')
  canvas: ElementRef;

  point: Point = new Point(0, null, 1, false);
  errorMessage: string;
  // private rightX = ['-2', '-1.5', '-1', '-0.5', '0', '0.5', '1', '1.5', '2'];
  // private rightR = ['-2', '-1.5', '-1', '-0.5', '0', '0.5', '1', '1.5', '2'];
  private graphic: Graphic;

  constructor(private service: PointsService, private authService: AuthService) {
  }

  ngOnInit() {
    this.point.x = -2;
    this.graphic = new Graphic(this.canvas);
    this.drawGraphic(1);
  }

  setR(value) {
    this.point.r = value;
    this.drawGraphic(value);
  }

  setX(value) {
    this.point.x = value;
  }

  addPoint() {

    if (this.point.y == null) {
      this.error('Введите Y');
      return false;
    }

    if (this.point.y.toString().indexOf(',') !== -1) {
      this.point.y = Number (this.point.y.toString().replace(',', '.'));
    }


    if (!isNumeric(this.point.y)) {
      this.error('Некорректное значение Y');
      return false;
    } else if (!(-3 < this.point.y && this.point.y < 3)) {
      this.error('Выход за пределы диапазона');
      return false;
    }

    this.service.addPoint(this.point).then(data => {
      this.drawPoint(<Point>data);
      this.service.getPoints();
    }).catch((err: HttpErrorResponse) => {
      console.log('err');
      if (err.status == 401 || err.status == 403) {
        this.authService.logOut();
      }
    });
    return true;
  }

  getPointsRecalculated(r) {

    this.service.getPointsRecalculated(r).subscribe(data => (data as Point[]).forEach(p => this.drawPoint(p)),
      (err: HttpErrorResponse) => {
      console.log('err');
      if (err.status == 401 || err.status == 403 ) {
        this.authService.logOut();
      }
    });
  }

  addPointFromCanvas() {

    const br = this.canvas.nativeElement.getBoundingClientRect();
    const left = br.left; // X координата верхнего левого края канваса
    const top = br.top; // Y координата верхнего левого края канваса
    const event: MouseEvent = <MouseEvent> window.event;

    const xCalculated = (event.clientX - 152 - left) / 30;
    const yCalculated = (-(event.clientY - top) + 152) / 30;

    this.point.x = xCalculated;
    this.point.y = yCalculated;

    this.addPoint();
  }

  drawPoint(point: Point) {
    this.graphic.drawPoint(point);
  }

  drawGraphic(r) {
    this.graphic.drawGraphic(r);
    this.getPointsRecalculated(r);
  }

  isDesktopDisplay() {
    return document.body.clientWidth >= 1000;
  }

  private error(message: string) {
    this.errorMessage = message;
    setTimeout(() => {this.errorMessage = null; }, 5000);
  }
}
