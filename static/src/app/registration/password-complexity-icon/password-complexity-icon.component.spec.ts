import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordComplexityIconComponent } from './password-complexity-icon.component';

describe('PasswordComplexityIconComponent', () => {
  let component: PasswordComplexityIconComponent;
  let fixture: ComponentFixture<PasswordComplexityIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordComplexityIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordComplexityIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
