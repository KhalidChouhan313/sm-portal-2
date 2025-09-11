import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenQrCodeComponent } from './green-qr-code.component';

describe('GreenQrCodeComponent', () => {
  let component: GreenQrCodeComponent;
  let fixture: ComponentFixture<GreenQrCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GreenQrCodeComponent]
    });
    fixture = TestBed.createComponent(GreenQrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
