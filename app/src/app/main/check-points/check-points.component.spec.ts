import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPointsComponent } from './check-points.component';

describe('CheckPointsComponent', () => {
  let component: CheckPointsComponent;
  let fixture: ComponentFixture<CheckPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
