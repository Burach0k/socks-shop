import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  credentialsForm: FormGroup;
  showCredentialsError: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.credentialsForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() { }

  public authenticate(): void {
    if (this.credentialsForm.valid) {
      this.loginService.createUser(this.credentialsForm.value).subscribe(
        () => this.router.navigate(['/']),
        () => this.showCredentialsError = true
      );
    }
  }
}
