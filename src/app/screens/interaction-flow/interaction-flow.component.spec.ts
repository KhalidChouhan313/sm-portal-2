import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionFlowComponent } from './interaction-flow.component';

describe('InteractionFlowComponent', () => {
  let component: InteractionFlowComponent;
  let fixture: ComponentFixture<InteractionFlowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InteractionFlowComponent]
    });
    fixture = TestBed.createComponent(InteractionFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
