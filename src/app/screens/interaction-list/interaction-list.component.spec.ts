import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionListComponent } from './interaction-list.component';

describe('InteractionListComponent', () => {
  let component: InteractionListComponent;
  let fixture: ComponentFixture<InteractionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InteractionListComponent]
    });
    fixture = TestBed.createComponent(InteractionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
