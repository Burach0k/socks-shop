import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public credentialsForm: FormGroup;

  constructor(public loginService: LoginService) {
    this.credentialsForm = this.loginService.createForm();
  }

  public authenticate(): void {
    if (this.credentialsForm.valid) {
      this.loginService.auth(this.credentialsForm);
    }
  }
}
