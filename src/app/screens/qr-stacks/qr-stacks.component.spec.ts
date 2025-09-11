import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrStacksComponent } from './qr-stacks.component';

describe('QrStacksComponent', () => {
  let component: QrStacksComponent;
  let fixture: ComponentFixture<QrStacksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrStacksComponent]
    });
    fixture = TestBed.createComponent(QrStacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
