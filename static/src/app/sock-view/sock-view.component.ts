import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SockViewService } from './sock-view.service';

@Component({
  selector: 'app-sock-view',
  templateUrl: './sock-view.component.html',
  styleUrls: ['./sock-view.component.scss'],
})
export class SockViewComponent implements OnInit {
  public sockId!: number;

  constructor(public sockViewService: SockViewService, private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.sockId = params.id;
      this.sockViewService.loadSockInfo(params.id);
    });
  }

  public like(): void {
    this.sockViewService.changeLike();
  }

  public subscribeToAuthor(): void {
    this.sockViewService.changeSubscribe();
  }
}
