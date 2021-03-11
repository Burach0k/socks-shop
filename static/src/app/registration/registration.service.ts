import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  public saveUser({ name, password }: { name: string; password: string }) {
    return this.http.post<any>(`${environment.apiUrl}/users/add`, { name, password });
  }
}
