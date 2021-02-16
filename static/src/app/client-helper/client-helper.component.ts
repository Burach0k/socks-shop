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
  public componentsStep: { [componentName: string]: boolean } = { welcome: true };

  constructor(public clientHelperService: ClientHelperService, private ref: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  public onChatClose(): void {
    this.componentsStep = { choiseConversation: true };
    this.clientHelperService.chatImageStyleClass.next('choose-step');
  }

  public onCloseEmail(): void {
    this.componentsStep = { choiseConversation: true };
    this.clientHelperService.chatImageStyleClass.next('choose-step');
  }

  public onChangeWelcome(isConfirm: boolean): void {
    if (isConfirm) {
      this.componentsStep = { choiseConversation: true };
    } else {
      this.hideChat();
    }
  }

  public chooseConversationOption(option: ConversationOption): void {
    switch (option) {
      case ConversationOption.chat:
        this.componentsStep = { chat: true };
        break;

      case ConversationOption.email:
        this.componentsStep = { email: true };
        break;

      case ConversationOption.videoCall:
        this.componentsStep = { videoCall: true };
        break;
    }
  }

  public hideChat(): void {
    this.componentsStep = { hide: !this.componentsStep.hide };

    if (!this.componentsStep.hide) {
      this.componentsStep = { welcome: true };
      this.clientHelperService.chatImageStyleClass.next('welcome-step');
    }
  }
}
