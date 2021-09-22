import {Point} from './point';
import {ElementRef} from '@angular/core';

export class Graphic {

  constructor(private canvas: ElementRef) {
  }

  drawPoint(point: Point) {
    const x = point.x, y = point.y, r = point.r, hit = point.result;
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
    const ctx = this.canvas.nativeElement.getContext('2d');

    ctx.clearRect(0, 0, 305, 305);
    ctx.fillStyle = '#c18c1bb8';
    ctx.strokeStyle = '#000000';

    this.drawCoordinatePlane(ctx);
    ctx.fillStyle = '#ffc10799';
    this.drawRectangle(r, ctx);
    this.drawTriangle(r, ctx);
    this.drawSemicircle(r, ctx);
    this.drawCoordinatePlane(ctx);
  }


  drawCoordinatePlane(ctx) {
    ctx.beginPath();
    ctx.fillStyle = '#000000';

    /*ось ОХ*/
    ctx.moveTo(0, 150);
    ctx.lineTo(305, 150);
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

    this.drawNumbers(ctx);
  }

  drawNumbers(ctx) {
    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#000000';

    /*деления на ОY*/
    let yLineTo = 0;
    ctx.moveTo(145, 5);
    for (let i = 5; i > - 6 ; i-- ) {
      ctx.lineTo(155, yLineTo);
      if (i !== 0) {
        ctx.fillText(i, 160, yLineTo + 3);
      }
      yLineTo += 30;
      ctx.moveTo(145, yLineTo);
    }

    /*Деления на OX*/
    let xLineTo = 0;
    ctx.moveTo(0, 145);
    for (let i = 5; i > - 6 ; i-- ) {
      ctx.lineTo(xLineTo, 155);
      ctx.fillText(-i, xLineTo - 6, 163);
      ctx.moveTo(xLineTo + 30, 145);
      xLineTo += 30;
    }

    ctx.stroke();
  }

  drawRectangle(selectedR_value, ctx) {
    ctx.beginPath();
    ctx.rect(150, 150, selectedR_value * 15, -selectedR_value * 30);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  drawTriangle(selectedR_value, ctx) {
    ctx.beginPath();
    ctx.moveTo(150 - (selectedR_value * 15), 150);
    ctx.lineTo(150, 150 + selectedR_value * 30);
    ctx.lineTo(150, 150);
    ctx.lineTo(150 - (selectedR_value * 15), 150);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  drawSemicircle(selectedR_value, ctx) {
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, selectedR_value * 30, 0, Math.PI / 2, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}
