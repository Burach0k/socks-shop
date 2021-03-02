import { Component, OnInit } from '@angular/core';
import { Sock } from '../types/sock.dto';
import { DashboadrService } from './dashboadr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboadrService: DashboadrService) { }

  public socks: any[] = [];

  ngOnInit(): void {
    this.dashboadrService.loadSocks(0, 50).subscribe(socks => {
      this.socks = socks;

      this.socks.forEach((sock) => {
        this.dashboadrService.loadSockImage(sock.id).subscribe(imageInBase64 => {
          sock.url = imageInBase64.data;
        })
      });
    })
  }

}
