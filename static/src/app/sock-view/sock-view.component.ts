import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CanvasService } from '../components/canvas/canvas.service';

import { Sock } from '../types/sock.dto';
import { SockViewService } from './sock-view.service';

@Component({
  selector: 'app-sock-view',
  templateUrl: './sock-view.component.html',
  styleUrls: ['./sock-view.component.scss'],
})
export class SockViewComponent implements OnInit {
  public sock!: any;

  constructor(private sockViewService: SockViewService, private route: ActivatedRoute, private canvasService: CanvasService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.sockViewService.getSockInfo(params.id).subscribe((sock) => {
        this.sock = sock;
        const blob = new Blob([new Uint8Array(this.sock.daefile.data)], { type: 'text/xml' });

        blob.text().then(a => {
          const obj = JSON.parse(a).buffer.data;
          const uritext = JSON.parse(a).buffer.data.map((char: number) => String.fromCodePoint(char)).join('');
          this.canvasService.loadDaeTemplate(new Blob([decodeURIComponent(uritext.split('data:text/xml;charset=UTF-8,')[1])], { type: 'text/xml' }));
        })
      });
    });
  }
}
