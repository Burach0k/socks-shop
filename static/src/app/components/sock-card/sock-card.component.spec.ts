import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SockCardComponent } from './sock-card.component';

describe('SockCardComponent', () => {
  let component: SockCardComponent;
  let fixture: ComponentFixture<SockCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SockCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SockCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
