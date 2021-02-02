import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { UserCreateDto } from '../types/user-create-dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public createUser({ name, password }: UserCreateDto): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/users/add`, { name, password });
  }
}
