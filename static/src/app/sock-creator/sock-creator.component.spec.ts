import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SockCreatorComponent } from './sock-creator.component';

describe('SockCreatorComponent', () => {
  let component: SockCreatorComponent;
  let fixture: ComponentFixture<SockCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SockCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SockCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
