import { Component, Input, OnInit } from '@angular/core';

import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment: any = {};
  @Input() level: number = 0;

  public isShowTextInput: boolean = false;
  public message: string = '';

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.commentsService.closeTextInput.subscribe(() => {
      this.isShowTextInput = false;
    });
  }

  public reply(comment: { text: string; date: string; id: number; parendId: number; sockid: number; userid: number; name: string }): void {
    this.commentsService.closeTextInput.next();
    this.isShowTextInput = true;
    this.addReplyContext(comment.name);
  }

  public addComment(message: string) {
    const messageWithoutUserName = message.substr(message.indexOf(' ') + 1);

    this.commentsService.addComment({ sockId: this.comment.sockid, parentId: this.comment.id, text: messageWithoutUserName }).subscribe(() => {
      this.isShowTextInput = false;
    });
  }

  private addReplyContext(name: string): void {
    this.message = `${name}, ${this.message}`;
  }
}
