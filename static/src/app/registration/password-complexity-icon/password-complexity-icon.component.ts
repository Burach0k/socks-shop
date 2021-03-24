import { Component, Input } from '@angular/core';

import { ProtectionLevel } from '../../types/protect-level';

@Component({
  selector: 'app-password-complexity-icon',
  templateUrl: './password-complexity-icon.component.html',
  styleUrls: ['./password-complexity-icon.component.scss'],
})
export class PasswordComplexityIconComponent {
  @Input() protectionLevel: ProtectionLevel = ProtectionLevel.low;

  public hiddenShield = true;
  public hiddenSword = true;
  public hiddenCrown = true;

  private ngOnChanges(): void {
    this.updateProtactionLevel();
  }

  private updateProtactionLevel(): void {
    switch (this.protectionLevel) {
      case ProtectionLevel.middle:
        this.showMiddleLevel();
        break;

      case ProtectionLevel.hard:
        this.showHardLevel();
        break;

      case ProtectionLevel.superHard:
        this.showSuperHardLevel();
        break;

      default:
        this.hideAll();
    }
  }

  private hideAll(): void {
    this.hiddenShield = true;
    this.hiddenSword = true;
    this.hiddenCrown = true;
  }

  private showMiddleLevel(): void {
    this.hiddenShield = false;
    this.hiddenSword = true;
    this.hiddenCrown = true;
  }

  private showHardLevel(): void {
    this.hiddenShield = false;
    this.hiddenSword = false;
    this.hiddenCrown = true;
  }

  private showSuperHardLevel(): void {
    this.hiddenShield = false;
    this.hiddenSword = false;
    this.hiddenCrown = false;
  }
}
