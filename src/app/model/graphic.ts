import {Point} from './point';
import {ElementRef} from '@angular/core';

export class Graphic {

  constructor(private canvas: ElementRef) {
  }


  drawPoint(point: Point) {

    const x = point.x, y = point.y, r = point.r, hit = point.result;
    const context = this.canvas.nativeElement.getContext('2d');

    const ctx = this.canvas.nativeElement.getContext('2d');

    ctx.beginPath();
    ctx.arc(150 + x * 30, 150 - y * 30, 2, 0, 2 * Math.PI, true);
    ctx.closePath();

    let color = 'red';

    if (hit) {
      color = 'lime';
    }

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();


  }

  drawGraphic(r) {
    console.log('Drawing graphic with R=' + r);
    const ctx = this.canvas.nativeElement.getContext('2d');

    ctx.clearRect(0, 0, 305, 305);
    ctx.fillStyle = 'rgb(255, 162, 211)';
    ctx.strokeStyle = 'rgb(60, 16, 44)';

    this.drawCoordinatePlane(ctx);
    /*отрисовка координатных прямых*/
    ctx.fillStyle = '#ffc10799';
    this.drawFigures(r, ctx);
    this.drawNumbers(ctx);

  }


  drawCoordinatePlane(ctx) {
    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.moveTo(0, 150);
    ctx.lineTo(305, 150);
    /*ось ОХ*/
    ctx.fillText('X', 290, 140);
    /*стрелочка на оси ОХ*/
    ctx.moveTo(305, 150);
    ctx.lineTo(300, 145);
    ctx.moveTo(305, 150);
    ctx.lineTo(300, 155);

    /*ось Y*/
    ctx.moveTo(150, 0);
    ctx.lineTo(150, 305);
    ctx.fillText('Y', 160, 10);
    /*стрелочка на оси Y*/
    ctx.moveTo(150, 0);
    ctx.lineTo(155, 5);
    ctx.moveTo(150, 0);
    ctx.lineTo(145, 5);
    ctx.stroke();
  }

  drawNumbers(ctx) {
    /*деления на ОY*/
    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#000000';
    ctx.moveTo(145, 5);
    ctx.lineTo(155, 5);
    ctx.fillText(5, 160, 0);
    ctx.moveTo(145, 30);
    ctx.lineTo(155, 30);
    ctx.fillText(4, 160, 33);
    ctx.moveTo(145, 60);
    ctx.lineTo(155, 60);
    ctx.fillText(3, 160, 63);
    ctx.moveTo(145, 90);
    ctx.lineTo(155, 90);
    ctx.fillText(2, 160, 93);
    ctx.moveTo(145, 120);
    ctx.lineTo(155, 120);
    ctx.fillText(1, 160, 123);
    ctx.fillText(0, 140, 163); // ноль в центре координат
    ctx.moveTo(145, 180);
    ctx.lineTo(155, 180);
    ctx.fillText(-1, 160, 183);
    ctx.moveTo(145, 210);
    ctx.lineTo(155, 210);
    ctx.fillText(-2, 160, 213);
    ctx.moveTo(145, 240);
    ctx.lineTo(155, 240);
    ctx.fillText(-3, 160, 243);
    ctx.moveTo(145, 270);
    ctx.lineTo(155, 270);
    ctx.fillText(-4, 160, 273);
    ctx.moveTo(145, 300);
    ctx.lineTo(155, 300);
    ctx.fillText(-5, 160, 303);

    /*Деления на OX*/

    ctx.moveTo(2, 145);
    ctx.lineTo(2, 155);
    ctx.fillText(-5, 0, 163);
    ctx.moveTo(30, 145);
    ctx.lineTo(30, 155);
    ctx.fillText(-4, 25, 163);
    ctx.moveTo(60, 145);
    ctx.lineTo(60, 155);
    ctx.fillText(-3, 55, 163);
    ctx.moveTo(90, 145);
    ctx.lineTo(90, 155);
    ctx.fillText(-2, 85, 163);
    ctx.moveTo(120, 145);
    ctx.lineTo(120, 155);
    ctx.fillText(-1, 115, 163);

    ctx.moveTo(180, 145);
    ctx.lineTo(180, 155);
    ctx.fillText(1, 177, 163);
    ctx.moveTo(210, 145);
    ctx.lineTo(210, 155);
    ctx.fillText(2, 207, 163);
    ctx.moveTo(240, 145);
    ctx.lineTo(240, 155);
    ctx.fillText(3, 237, 163);
    ctx.moveTo(270, 145);
    ctx.lineTo(270, 155);
    ctx.fillText(4, 267, 163);
    ctx.moveTo(300, 145);
    ctx.lineTo(300, 155);
    ctx.fillText(5, 297, 163);

    ctx.stroke();
  }

  drawFigures(selectedR_value, ctx) {
    /*прямоугольник*/
    ctx.beginPath();
    ctx.rect(150, 150, selectedR_value * 15, -selectedR_value * 30);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    /*треугольник*/
    ctx.beginPath();
    ctx.moveTo(150 - (selectedR_value * 15), 150);
    ctx.lineTo(150, 150 + selectedR_value * 30);
    ctx.lineTo(150, 150);
    ctx.lineTo(150 - (selectedR_value * 15), 150);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    /*полукруг*/
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, selectedR_value * 30, 0, Math.PI / 2, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    this.drawCoordinatePlane(ctx);
  }
}
