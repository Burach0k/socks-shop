import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientHelperService {
  public socket: any;
  public chatImageStyleClass: BehaviorSubject<string> = new BehaviorSubject('welcome-step');

  constructor(private http: HttpClient) {}

  public sendEmail({ email, message }: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/client-helper/send-email`, { email, message });
  }

  public sendMessgeBySocket(message: string): void {
    this.socket.send(message);
  }

  public sendSocketMessage(callback: ({ data }: any) => void): void {
    this.socket = new WebSocket('wss://stormy-lowlands-69400.herokuapp.com');

    this.socket.onerror = (error: any) => console.log('Ошибка ' + error.message);

    this.socket.onmessage = ({ data }: any) => callback(data);
  }
}
