import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Sock } from '../types/sock.dto';

@Injectable({
  providedIn: 'root',
})
export class DashboadrService {
  public socks: Sock[] = [];

  constructor(private http: HttpClient) {}

  public loadSockList(offset: number, limit: number, orederBy?: string) {
    this.loadSocks(offset, limit, orederBy).subscribe(this.initSocks.bind(this));
  }

  public loadSubscriberList(offset: number, limit: number, orederBy?: string) {
    this.loadSubscribes(offset, limit, orederBy).subscribe(this.initSocks.bind(this));
  }

  private initSocks(socks: Sock[]): void {
    this.socks = socks;
    this.socks.forEach(this.addUrlToSock.bind(this));
  }

  private addUrlToSock(sock: Sock): void {
    this.loadSockImage(sock.id).subscribe((imageInBase64) => (sock.url = imageInBase64.data));
  }

  public loadSocks(offset: number, limit: number, orederBy?: string): Observable<Sock[]> {
    return this.http.post<Sock[]>(`${environment.apiUrl}/sock-view/load`, { offset, limit, orederBy });
  }

  public loadSockImage(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/sock-view/image/${id}`, { observe: 'body' });
  }

  public loadSubscribes(offset: number, limit: number, orederBy?: string): Observable<Sock[]> {
    return this.http.post<Sock[]>(`${environment.apiUrl}/sock-view/loadSubscribes`, { offset, limit, orederBy });
  }
}
