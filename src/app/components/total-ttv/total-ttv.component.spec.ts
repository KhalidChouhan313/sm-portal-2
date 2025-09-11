import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalTtvComponent } from './total-ttv.component';

describe('TotalTtvComponent', () => {
  let component: TotalTtvComponent;
  let fixture: ComponentFixture<TotalTtvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalTtvComponent]
    });
    fixture = TestBed.createComponent(TotalTtvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
