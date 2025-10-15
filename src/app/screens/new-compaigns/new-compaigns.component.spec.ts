import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompaignsComponent } from './new-compaigns.component';

describe('NewCompaignsComponent', () => {
  let component: NewCompaignsComponent;
  let fixture: ComponentFixture<NewCompaignsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewCompaignsComponent]
    });
    fixture = TestBed.createComponent(NewCompaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
