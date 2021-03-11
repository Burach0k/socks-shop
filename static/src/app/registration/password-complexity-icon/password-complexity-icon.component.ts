import { Component, Input, OnInit } from '@angular/core';

import { ProtectionLevel } from '../../types/protect-level';

@Component({
  selector: 'app-password-complexity-icon',
  templateUrl: './password-complexity-icon.component.html',
  styleUrls: ['./password-complexity-icon.component.scss'],
})
export class PasswordComplexityIconComponent implements OnInit {
  @Input() protectionLevel: ProtectionLevel = ProtectionLevel.low;

  public hiddenShield = true;
  public hiddenSword = true;
  public hiddenCrown = true;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.protectionLevel === ProtectionLevel.middle) {
      this.hiddenShield = false;
    } else {
      this.hiddenShield = true;
    }

    if (this.protectionLevel === ProtectionLevel.hard) {
      this.hiddenSword = false;
      this.hiddenShield = false;
    } else {
      this.hiddenSword = true;
    }

    if (this.protectionLevel === ProtectionLevel.superHard) {
      this.hiddenSword = false;
      this.hiddenShield = false;
      this.hiddenCrown = false;
    } else {
      this.hiddenCrown = true;
    }
  }
}
