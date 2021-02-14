import { Component, OnInit } from '@angular/core';
import { ClientHelperService } from '../client-helper.service';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss']
})
export class VideoCallComponent implements OnInit {

  constructor(private clientHelperService: ClientHelperService) { }

  ngOnInit(): void {
    this.clientHelperService.chatImageStyleClass.next('video-step');
  }

}
