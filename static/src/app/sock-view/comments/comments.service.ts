import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { ModalInfoComponent } from 'src/app/components/modal-info/modal-info.component';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  public closeTextInput!: Subject<any>;

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  public addComment(comment: { text: string; parentId: number | null; sockId: number }): Observable<string []> {
    return this.http.post<any>(`${environment.apiUrl}/chat/add-comment`, comment);
  }

  public loadComments(offset: number, limit: number, sockId: number): Observable<any[]> {
    return this.http.post<any>(`${environment.apiUrl}/chat/load-comment`, { offset, limit, sockId });
  }

  public showWarningModal(badWords: string[]): void {
    const dialogRef = this.dialog.open(ModalInfoComponent, { data: badWords, panelClass: 'bonk-goose' });
    dialogRef.afterClosed().subscribe();
  }
}
