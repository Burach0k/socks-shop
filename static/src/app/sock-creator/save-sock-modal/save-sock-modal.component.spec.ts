import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveSockModalComponent } from './save-sock-modal.component';

describe('SaveSockModalComponent', () => {
  let component: SaveSockModalComponent;
  let fixture: ComponentFixture<SaveSockModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveSockModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveSockModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
