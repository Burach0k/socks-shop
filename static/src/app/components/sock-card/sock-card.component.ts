import { Component, Input, OnInit } from '@angular/core';

import { Sock } from 'src/app/types/sock.dto';
import { SockPopularity } from '../../types/sock-popularity.enum';

@Component({
  selector: 'app-sock-card',
  templateUrl: './sock-card.component.html',
  styleUrls: ['./sock-card.component.scss'],
})
export class SockCardComponent implements OnInit {
  @Input() sock!: Sock;

  public classContainer: SockPopularity = SockPopularity.sockCard;

  constructor() {}

  ngOnInit(): void {
    if (this.sock.likes < 5) {
      this.classContainer = SockPopularity.sockCard;
    } else if (this.sock.likes >= 5 && this.sock.likes < 10) {
      this.classContainer = SockPopularity.rareSock;
    } else if (this.sock.likes >= 10) {
      this.classContainer = SockPopularity.mifSock;
    }
  }
}
