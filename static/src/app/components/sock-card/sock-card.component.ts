import { Component, Input, OnInit } from '@angular/core';

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
