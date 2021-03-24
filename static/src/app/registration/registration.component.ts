import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { RegistrationService } from './registration.service';
import { ProtectionLevel } from '../types/protect-level';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  credentialsForm: FormGroup;
  showCredentialsError: boolean = false;

  public protectionLevel: ProtectionLevel = ProtectionLevel.low;

  constructor(private registrationService: RegistrationService) {
    this.credentialsForm = this.registrationService.createForm();
  }

  public passwordHandker(): void {
    const password = this.credentialsForm.value.password;
    this.protectionLevel = this.registrationService.checkPasswordLevel(password);
  }

  public registration(): void {
    if (this.credentialsForm.valid) {
      this.registrationService.createUser(this.credentialsForm);
    }
  }
}
