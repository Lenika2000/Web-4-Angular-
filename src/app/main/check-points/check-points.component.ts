import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {isNumeric} from 'rxjs/util/isNumeric';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../services/auth/auth.service';
import {PointsService} from '../../services/points/points.service';
import {Point} from '../../model/point';
// import {HistoryComponent} from '../history/history.component';
import {Graphic} from '../../model/graphic';
import {isNumber} from 'util';

@Component({
  selector: 'app-check-points',
  templateUrl: './check-points.component.html',
  styleUrls: ['./check-points.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CheckPointsComponent implements OnInit {

  @ViewChild('canvas')
  canvas: ElementRef;

  point: Point = new Point(null, 0 , null, 1, false);
  errorMessage: string;
  isHidden: boolean;

  valid: boolean;

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
    this.service.setR(value);
    this.drawGraphic(value);
  }

  setX(value) {
    this.point.x = value;
  }


  checkY() {
    if (this.point.y == null) {
      this.error('Введите Y');

      this.valid = true;
      return false;
    }

    if (this.point.y.toString().indexOf(',') !== -1) {
      this.point.y = Number(this.point.y.toString().replace(',', '.'));
      this.isHidden = true;
    }

    // tslint:disable-next-line:max-line-length
    if (!isNumeric(this.point.y) || this.point.y.toString().indexOf('x') !== -1 || this.point.y.toString().indexOf('b') !== -1 || this.point.y.toString().indexOf('o') !== -1) {
      this.error('Некорректное значение Y');

      this.valid = true;
      return false;
    } else if (!(-3 < this.point.y && this.point.y < 3)) {
      this.error('Выход за пределы диапазона');
      this.valid = true;
      return false;
    }


    this.valid = false;

    this.isHidden = true;
  }

  addPoint() {

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
        if (err.status == 401 || err.status == 403) {
          this.authService.logOut();
        }
      });
  }

  addPointFromCanvas(event) {

    const br = this.canvas.nativeElement.getBoundingClientRect();
    const left = br.left; // X координата верхнего левого края канваса
    const top = br.top; // Y координата верхнего левого края канваса
    // const event: MouseEvent = <MouseEvent> window.event;

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
    this.isHidden = false;
    // setTimeout(() => {
    //   this.errorMessage = null;
    // }, 5000);
  }
}
