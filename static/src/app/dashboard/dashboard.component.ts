import { Component, OnInit } from '@angular/core';

import { DashboadrService } from './dashboadr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(public dashboadrService: DashboadrService) {}

  ngOnInit(): void {
    this.dashboadrService.loadSockList(0, 50); // fix
  }

  public sotrByLikes(): void {
    this.dashboadrService.loadSockList(0, 50, 'likes'); // fix
  }

  public showSubscribes(): void {
    this.dashboadrService.loadSubscriberList(0, 50); // fix
  }
}
