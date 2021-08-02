import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

import { CommentsService } from './comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() sockId!: number;

  public commentList: any[] = [];

  constructor(private commentsService: CommentsService) { }

  public ngOnInit(): void {
    this.loadComments();
    this.commentsService.closeTextInput = new Subject();
  }

  public ngOnDestroy(): void {
    this.commentsService.closeTextInput.unsubscribe();
  }

  public addComment(message: string): void {
    this.commentsService
      .addComment({ sockId: this.sockId, parentId: null, text: message })
      .subscribe((badWords) => {
        if (badWords.length) this.commentsService.showWarningModal(badWords)
      });
  }

  private loadComments(): void {
    this.commentsService.loadComments(0, 10, this.sockId).subscribe((commentList: any[]) => {
      this.commentList = commentList;
    });
  }

}
