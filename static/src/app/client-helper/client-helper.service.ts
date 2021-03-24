import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { SendMail } from '../types/client-helper.dto';

@Injectable({
  providedIn: 'root',
})
export class ClientHelperService {
  public socket: any;
  public chatImageStyleClass: BehaviorSubject<string> = new BehaviorSubject('welcome-step');
  public componentsStep: { [componentName: string]: boolean } = { welcome: true };

  constructor(private http: HttpClient) {}

  public sendEmail({ to, text }: SendMail): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/client-helper/send-email`, { to, text });
  }

  public sendMessgeBySocket(message: string): void {
    this.socket.send(message);
  }

  public sendSocketMessage(callback: ({ data }: any) => void): void {
    this.socket = new WebSocket('wss://stormy-lowlands-69400.herokuapp.com');

    this.socket.onerror = (error: any) => console.log('Ошибка ' + error.message);

    this.socket.onmessage = ({ data }: any) => callback(data);
  }

  public initHelperVisible(): void {
    this.componentsStep.hide = localStorage.getItem('showHelper') === 'true';
  }

  public saveStatusInMemory(): void {
    localStorage.setItem('showHelper', `${this.componentsStep.hide}`);
  }

  public changeVisibleStatus() {
    this.componentsStep = { ...this.componentsStep, hide: !this.componentsStep.hide };
  }

  public showChooseStep(): void {
    this.componentsStep = { choiseConversation: true };
    this.chatImageStyleClass.next('choose-step');
  }
}
