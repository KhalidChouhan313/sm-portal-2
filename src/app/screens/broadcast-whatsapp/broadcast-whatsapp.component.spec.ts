import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastWhatsappComponent } from './broadcast-whatsapp.component';

describe('BroadcastWhatsappComponent', () => {
  let component: BroadcastWhatsappComponent;
  let fixture: ComponentFixture<BroadcastWhatsappComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BroadcastWhatsappComponent]
    });
    fixture = TestBed.createComponent(BroadcastWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
