import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { UserCreateDto, UserDto } from '../types/user-create-dto';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public user: UserDto = new UserDto();

  constructor(private http: HttpClient) {}

  public authenticate({ name, password }: UserCreateDto): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(`${environment.apiUrl}/users/auth`, { name, password });
  }
}
