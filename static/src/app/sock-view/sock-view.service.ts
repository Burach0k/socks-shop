import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sock } from '../types/sock.dto';

@Injectable({
  providedIn: 'root'
})
export class SockViewService {

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  public getSockInfo(id: number): Observable<Sock> {
    return this.http.get<Sock>(`${environment.apiUrl}/sock-view/${id}`);
  }
}
