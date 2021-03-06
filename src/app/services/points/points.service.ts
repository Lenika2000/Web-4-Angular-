import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AppComponent} from '../../app.component';
import {Point} from '../../model/point';
import {BehaviorSubject} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {toPromise} from 'rxjs/operator/toPromise';

@Injectable() /*директива для сервисов, чтобы те могли внедряться*/
export class PointsService {
  /*хранилище, на которое можно подписаться, чтобы следить за состоянием точек*/
  public points: BehaviorSubject<Point[]> = new BehaviorSubject<Point[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) { }

  private r = 1;
  public setR(r) {
    this.r = r;
  }
  public getR() {
    return this.r;
  }


  private getHeaders(): HttpHeaders {
    const token: string = localStorage.getItem('authToken');

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return headers;
  }

  /*получение точек при пересчете радиуса*/
  public getPointsRecalculated(r): Observable<any> {
    return this.http.get(AppComponent.API_URL + '/points/recalculate?r=' + r, { headers: this.getHeaders()});
  }

  /*запрос на получение точек*/
  public getPoints() {
    /**/
    this.http.get(AppComponent.API_URL + '/points', { headers: this.getHeaders()}).subscribe(data => {
      /*обновление значений внутри регистратора слушателей*/
      this.points.next(data as Point[]);
      console.log('points got');
    }, (err: HttpErrorResponse) => {
      /*неккоректный token*/
      if (err.status == 401 || err.status == 403 ) {
        this.authService.logOut();
      }
    });
  }

  /*запрос добавление точки*/
  public addPoint(point: Point) {
    const body = {x: point.x, y: point.y, r: point.r};
    return this.http.post(AppComponent.API_URL + '/points', body, { headers: this.getHeaders()}).toPromise();
  }

  public updatePoint(point: Point) {
    const body = { id: point.id, x: point.x, y: point.y, r: point.r };
    return this.http.put(AppComponent.API_URL + '/points', body, {headers: this.getHeaders()}).toPromise();
  }

}
