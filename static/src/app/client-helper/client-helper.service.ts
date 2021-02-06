import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientHelperService {

  constructor(private http: HttpClient) { }

  public sendEmail({ email, message }: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/client-helper/send-email`, { email, message });
  }
}

