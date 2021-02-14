import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClientHelperService } from '../client-helper.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @Output() onClose = new EventEmitter<null>();

  public chatMessage: any[] = [];
  public message: string = '';

  constructor(private clientHelperService: ClientHelperService) {}

  ngOnInit(): void {
    this.clientHelperService.chatImageStyleClass.next("chat-step");
    this.clientHelperService.sendSocketMessage(this.getMessageFromTG.bind(this));
  }

  public getMessageFromTG(message: any): void {
    this.chatMessage.push({ name: 'socks-assistant', message });
  }

  public sendMessageOnTG(message: string): void {
    this.chatMessage.push({ name: 'you', message });

    this.clientHelperService.socket.send(message);
  }

  public back(): void {
    this.onClose.emit();
  }
}
