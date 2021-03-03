import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Sock } from '../types/sock.dto';

@Injectable({
  providedIn: 'root'
})
export class DashboadrService {

  constructor(private http: HttpClient) { }

  public loadSocks(offset: number, limit: number): Observable<Sock[]> {
    return this.http.post<Sock[]>(`${environment.apiUrl}/sock-view/load`, { offset, limit });
  }

  public loadSockImage(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/sock-view/image/${id}`, { observe: 'body' });
  }

}
