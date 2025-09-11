import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiPromptOfficialComponent } from './ai-prompt-official.component';

describe('AiPromptOfficialComponent', () => {
  let component: AiPromptOfficialComponent;
  let fixture: ComponentFixture<AiPromptOfficialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AiPromptOfficialComponent]
    });
    fixture = TestBed.createComponent(AiPromptOfficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
