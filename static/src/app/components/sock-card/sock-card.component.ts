import { Component, Input, OnInit } from '@angular/core';
import { Sock } from 'src/app/types/sock.dto';

@Component({
  selector: 'app-sock-card',
  templateUrl: './sock-card.component.html',
  styleUrls: ['./sock-card.component.scss']
})
export class SockCardComponent implements OnInit {
  @Input() sock!: { name: string, url: string };

  constructor() { }

  ngOnInit(): void { }

}
