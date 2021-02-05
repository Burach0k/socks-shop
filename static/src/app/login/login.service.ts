import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { UserCreateDto, UserDto } from '../types/user-create-dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public user: UserDto = new UserDto();

  constructor(private http: HttpClient) { }

  public authenticate({ name, password }: UserCreateDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${environment.apiUrl}/users/auth`, { name, password });
  }
}
