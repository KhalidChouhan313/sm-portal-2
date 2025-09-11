import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayReportsComponent } from './today-reports.component';

describe('TodayReportsComponent', () => {
  let component: TodayReportsComponent;
  let fixture: ComponentFixture<TodayReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodayReportsComponent]
    });
    fixture = TestBed.createComponent(TodayReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
