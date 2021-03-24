import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from './../../environments/environment';
import { UserCreateDto, UserDto } from '../types/user-create-dto';
import { Token } from '../types/token.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public user: UserDto = new UserDto();
  public showCredentialsError: boolean = false;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router) {}

  public createForm(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  public auth(form: FormGroup): void {
    this.authenticate(form.value).subscribe(
      this.saveToken.bind(this),
      this.showError.bind(this)
    );
  }

  private saveToken({ access_token }: Token): void {
    localStorage.setItem('access_token', access_token);
    this.router.navigate(['/dashboard']);
  }

  private showError(): void {
    this.showCredentialsError = true;
  }

  private authenticate({ name, password }: UserCreateDto): Observable<Token> {
    return this.http.post<Token>(`${environment.apiUrl}/users/auth`, { name, password });
  }
}
