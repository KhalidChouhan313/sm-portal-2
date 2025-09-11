import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleInsightsComponent } from './vehicle-insights.component';

describe('VehicleInsightsComponent', () => {
  let component: VehicleInsightsComponent;
  let fixture: ComponentFixture<VehicleInsightsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleInsightsComponent]
    });
    fixture = TestBed.createComponent(VehicleInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
