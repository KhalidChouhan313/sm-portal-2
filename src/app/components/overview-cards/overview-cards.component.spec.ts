import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewCardsComponent } from './overview-cards.component';

describe('OverviewCardsComponent', () => {
  let component: OverviewCardsComponent;
  let fixture: ComponentFixture<OverviewCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewCardsComponent]
    });
    fixture = TestBed.createComponent(OverviewCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
