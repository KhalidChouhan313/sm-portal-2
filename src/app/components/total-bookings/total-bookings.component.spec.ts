import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalBookingsComponent } from './total-bookings.component';

describe('TotalBookingsComponent', () => {
  let component: TotalBookingsComponent;
  let fixture: ComponentFixture<TotalBookingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalBookingsComponent]
    });
    fixture = TestBed.createComponent(TotalBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
