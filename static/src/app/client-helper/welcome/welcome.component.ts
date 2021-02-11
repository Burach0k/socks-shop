import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClientHelperService } from '../client-helper.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  @Output() onChange = new EventEmitter<boolean>();

  constructor(private clientHelperService: ClientHelperService) {}

  ngOnInit(): void {
    this.clientHelperService.chatImageStyleClass.next('welcome-step');
  }

  public confirm(): void {
    this.onChange.emit(true);
  }

  public close(): void {
    this.onChange.emit(false);
  }
}
