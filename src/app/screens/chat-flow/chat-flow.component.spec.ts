import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFlowComponent } from './chat-flow.component';

describe('ChatFlowComponent', () => {
  let component: ChatFlowComponent;
  let fixture: ComponentFixture<ChatFlowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatFlowComponent]
    });
    fixture = TestBed.createComponent(ChatFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
