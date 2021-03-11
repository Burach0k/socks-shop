import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RegistrationService } from './registration.service';
import { ProtectionLevel } from '../types/protect-level';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  credentialsForm: FormGroup;
  showCredentialsError: boolean = false;

  public protectionLevel: ProtectionLevel = ProtectionLevel.low;

  constructor(private registrationService: RegistrationService, private router: Router, private formBuilder: FormBuilder) {
    this.credentialsForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {}

  public passwordHandker(): void {
    if (this.credentialsForm.value.password.length >= 10) {
      this.protectionLevel = ProtectionLevel.superHard;
    } else if (this.credentialsForm.value.password.length >= 8) {
      this.protectionLevel = ProtectionLevel.hard;
    } else if (this.credentialsForm.value.password.length >= 4) {
      this.protectionLevel = ProtectionLevel.middle;
    } else {
      this.protectionLevel = ProtectionLevel.low;
    }

    console.log(this.credentialsForm.value.password);
  }

  public registration() {
    if (this.credentialsForm.valid) {
      this.registrationService.saveUser(this.credentialsForm.value).subscribe((token) => {
        localStorage.setItem('access_token', token['access_token']);
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
