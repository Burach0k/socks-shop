import { Component, OnInit } from '@angular/core';
import { ClientHelperService } from './client-helper.service';

@Component({
  selector: 'app-client-helper',
  templateUrl: './client-helper.component.html',
  styleUrls: ['./client-helper.component.scss']
})
export class ClientHelperComponent implements OnInit {
  public email: string = "";
  public message: string = "";
  public socket: any;
  public chatStackMessage: { name: 'you' | 'helper', message: string, time: number }[] = [];

  private readonly chatStatus = {
    hello: {
      text: 'Hello! Can I help you?',
      class: 'hello'
    },
    choose: {
      text: 'Please, choose option for question',
      class: 'choose'
    },
    close: {
      text: "",
      class: 'close'
    },
    email: {
      text: "Write your question and indicate your email so that we will answer you.",
      class: 'email'
    },
    sendEmail: {
      text: "Your message has been sent. We will reply shortly.",
      class: 'send-email'
    },
    tgMessage: {
      text: "",
      class: 'tg-message'
    }
  };

  public chatIconClass: string = "";
  public textDialog: string = "asdbakjs dbashdb ahsbdjhsabdjh bajshd bahjsd bhjasbdj has";

  constructor(private clientHelperService: ClientHelperService) { }

  ngOnInit(): void {
    this.chatIconClass = this.chatStatus.hello.class;
    this.textDialog = this.chatStatus.hello.text;
  }

  public chooseChat(): void {
    this.chatIconClass = this.chatStatus.tgMessage.class;
    this.textDialog = this.chatStatus.tgMessage.text;

    this.socket = new WebSocket('wss://stormy-lowlands-69400.herokuapp.com');

    this.socket.onclose = function(event: any) {
      console.log('Код: ' + event.code + ' причина: ' + event.reason);
    };
    
    this.socket.onmessage = (event: any) => {
      this.chatStackMessage.push({
        name: 'helper',
        message: event.data,
        time: new Date().getTime(),
      });
    };
    
    this.socket.onerror = function(error: any) {
      console.log("Ошибка " + error.message);
    };
  }

  public sendMessageOnTG(): void {
    this.chatStackMessage.push({
      name: 'you',
      message: this.message,
      time: new Date().getTime(),
    });

    this.socket.send(this.message);
  }

  public closeChat(): void {
    this.chatIconClass = this.chatStatus.close.class;
    this.textDialog = this.chatStatus.close.text;
  }

  public nextChatStatus(): void {
    this.chatIconClass = this.chatStatus.choose.class;
    this.textDialog = this.chatStatus.choose.text;
  }

  public sendEmail(): void {
    this.chatIconClass = this.chatStatus.email.class;
    this.textDialog = this.chatStatus.email.text;
  }

  public sendMessageOnEmail(): void {
    this.chatIconClass = this.chatStatus.sendEmail.class;
    this.textDialog = this.chatStatus.sendEmail.text;

    this.clientHelperService.sendEmail({ email: this.email, message: this.message }).subscribe(console.log)
  }
}
