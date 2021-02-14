import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceConversationOptionComponent } from './choice-conversation-option.component';

describe('ChoiceConversationOptionComponent', () => {
  let component: ChoiceConversationOptionComponent;
  let fixture: ComponentFixture<ChoiceConversationOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoiceConversationOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceConversationOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
