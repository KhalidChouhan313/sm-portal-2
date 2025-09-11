import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonStatsComponent } from './button-stats.component';

describe('ButtonStatsComponent', () => {
  let component: ButtonStatsComponent;
  let fixture: ComponentFixture<ButtonStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonStatsComponent]
    });
    fixture = TestBed.createComponent(ButtonStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
