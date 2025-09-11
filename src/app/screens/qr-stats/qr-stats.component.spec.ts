import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrStatsComponent } from './qr-stats.component';

describe('QrStatsComponent', () => {
  let component: QrStatsComponent;
  let fixture: ComponentFixture<QrStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrStatsComponent]
    });
    fixture = TestBed.createComponent(QrStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
