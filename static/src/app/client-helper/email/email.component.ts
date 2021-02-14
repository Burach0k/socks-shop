import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ClientHelperService } from '../client-helper.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent implements OnInit {
  @Output() onChange = new EventEmitter<boolean>();
  @Output() onClose = new EventEmitter<null>();

  public email: string = '';
  public message: string = '';

  constructor(private clientHelperService: ClientHelperService) {}

  ngOnInit(): void {
    this.clientHelperService.chatImageStyleClass.next("email-step");
  }

  public sendMessageOnEmail(): void {
    this.clientHelperService.sendEmail({ to: this.email, text: this.message }).subscribe(
      () => this.onChange.emit(true),
      () => this.onChange.emit(false)
    );
  }

  public back(): void {
    this.onClose.emit();
  }
}
