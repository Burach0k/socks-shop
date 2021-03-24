import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConversationOption } from '../../types/client-helper.dto';
import { ClientHelperService } from '../client-helper.service';

@Component({
  selector: 'app-choice-conversation-option',
  templateUrl: './choice-conversation-option.component.html',
  styleUrls: ['./choice-conversation-option.component.scss'],
})
export class ChoiceConversationOptionComponent implements OnInit {
  @Output() onChange = new EventEmitter<ConversationOption>();

  constructor(private clientHelperService: ClientHelperService) {}

  ngOnInit(): void {
    this.clientHelperService.chatImageStyleClass.next('choose-step');
  }

  public chooseChat(): void {
    this.onChange.emit(ConversationOption.chat);
  }

  public chooseEmail(): void {
    this.onChange.emit(ConversationOption.email);
  }

  public chooseVideoCall(): void {
    this.onChange.emit(ConversationOption.videoCall);
  }
}
