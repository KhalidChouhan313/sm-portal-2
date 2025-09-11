import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotAnalyticsComponent } from './chatbot-analytics.component';

describe('ChatbotAnalyticsComponent', () => {
  let component: ChatbotAnalyticsComponent;
  let fixture: ComponentFixture<ChatbotAnalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatbotAnalyticsComponent]
    });
    fixture = TestBed.createComponent(ChatbotAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
