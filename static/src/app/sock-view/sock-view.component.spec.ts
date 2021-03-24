import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SockViewComponent } from './sock-view.component';

describe('SockViewComponent', () => {
  let component: SockViewComponent;
  let fixture: ComponentFixture<SockViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SockViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SockViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
