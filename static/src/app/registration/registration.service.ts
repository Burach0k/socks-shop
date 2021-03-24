import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ProtectionLevel } from '../types/protect-level';
import { Token } from '../types/token.model';
import { UserCreateDto } from '../types/user-create-dto';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router) {}

  public createForm(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  public checkPasswordLevel(password: string): ProtectionLevel {
    if (password.length >= 10) {
      return ProtectionLevel.superHard;
    } else if (password.length >= 8) {
      return ProtectionLevel.hard;
    } else if (password.length >= 4) {
      return ProtectionLevel.middle;
    } else {
      return ProtectionLevel.low;
    }
  }

  public createUser(form: FormGroup): void {
    this.saveUser(form.value).subscribe((token) => {
      this.saveToken(token['access_token']);
      this.router.navigate(['/dashboard']);
    });
  }

  private saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  private saveUser({ name, password }: UserCreateDto): Observable<Token> {
    return this.http.post<Token>(`${environment.apiUrl}/users/add`, { name, password });
  }
}
