import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTemlatesComponent } from './create-temlates.component';

describe('CreateTemlatesComponent', () => {
  let component: CreateTemlatesComponent;
  let fixture: ComponentFixture<CreateTemlatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTemlatesComponent]
    });
    fixture = TestBed.createComponent(CreateTemlatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
