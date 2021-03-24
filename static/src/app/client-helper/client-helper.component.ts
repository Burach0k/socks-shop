import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { ConversationOption } from '../types/client-helper.dto';
import { ClientHelperService } from './client-helper.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-client-helper',
  templateUrl: './client-helper.component.html',
  styleUrls: ['./client-helper.component.scss'],
})
export class ClientHelperComponent implements OnInit {
  constructor(public clientHelperService: ClientHelperService, private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.clientHelperService.initHelperVisible();
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  public onChatClose(): void {
    this.clientHelperService.showChooseStep();
  }

  public onCloseEmail(): void {
    this.clientHelperService.showChooseStep();
  }

  public onChangeWelcome(isConfirm: boolean): void {
    if (isConfirm) {
      this.clientHelperService.componentsStep = { choiseConversation: true };
    } else {
      this.hideChat();
    }
  }

  public chooseConversationOption(option: ConversationOption): void {
    switch (option) {
      case ConversationOption.chat:
        this.clientHelperService.componentsStep = { chat: true };
        break;

      case ConversationOption.email:
        this.clientHelperService.componentsStep = { email: true };
        break;

      case ConversationOption.videoCall:
        this.clientHelperService.componentsStep = { videoCall: true };
        break;
    }
  }

  public hideChat(): void {
    this.clientHelperService.changeVisibleStatus();
    this.clientHelperService.saveStatusInMemory();
  }
}
