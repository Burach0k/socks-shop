import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientHelperComponent } from './client-helper.component';

describe('ClientHelperComponent', () => {
  let component: ClientHelperComponent;
  let fixture: ComponentFixture<ClientHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientHelperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
