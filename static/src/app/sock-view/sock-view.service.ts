import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { CanvasService } from '../components/canvas/canvas.service';
import { SockViewInfo } from '../types/sock-view-info.dto';

@Injectable({
  providedIn: 'root',
})
export class SockViewService {
  public sock!: SockViewInfo;

  constructor(private http: HttpClient, private canvasService: CanvasService) {}

  public changeLike(): void {
    if (this.sock.isUserLike) {
      this.unlike(this.sock.id).subscribe(this.applyLike.bind(this));
    } else {
      this.like(this.sock.id).subscribe(this.applyLike.bind(this));
    }
  }

  public changeSubscribe(): void {
    if (this.sock?.isUserSubscribe) {
      this.unsubscribeToAuthor(this.sock.userid).subscribe(() => (this.sock.isUserSubscribe = false));
    } else {
      this.subscribeToAuthor(this.sock.userid).subscribe(() => (this.sock.isUserSubscribe = true));
    }
  }

  public loadSockInfo(sockId: number): void {
    this.getSockInfo(sockId).subscribe(this.initSocks.bind(this));
  }

  private subscribeToAuthor(userId: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/users/subscribe`, { userId });
  }

  private unsubscribeToAuthor(userId: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/users/unsubscribe`, { userId });
  }

  private applyLike(info: { likes: number }): void {
    this.sock.likes = info.likes;
    this.sock.isUserLike = !this.sock.isUserLike;
  }

  private initSocks(sock: SockViewInfo) {
    this.sock = sock;
    this.loadDaeTemplate(sock.daefile);
  }

  private loadDaeTemplate(daefile: { data: ArrayBufferLike }): void {
    this.createBlobPartsFromBuffer(daefile).then((blobPart) => {
      this.canvasService.loadDaeTemplate(new Blob([blobPart], { type: 'text/xml' }));
    });
  }

  private getSockInfo(id: number): Observable<SockViewInfo> {
    return this.http.get<SockViewInfo>(`${environment.apiUrl}/sock-view/${id}`);
  }

  private like(id: number): Observable<{ likes: number }> {
    return this.http.post<any>(`${environment.apiUrl}/sock-view/like`, { id });
  }

  private unlike(id: number): Observable<{ likes: number }> {
    return this.http.post<any>(`${environment.apiUrl}/sock-view/unlike`, { id });
  }

  private createBlobPartsFromBuffer(daefile: { data: ArrayBufferLike }): Promise<BlobPart> {
    const blob = new Blob([new Uint8Array(daefile.data)], { type: 'text/xml' });

    return blob.text().then((fileData) => {
      const stringData = JSON.parse(fileData).buffer.data;
      const uritext = stringData.map(this.createUTF8Char).join('');
      const URIComponent = uritext.split('data:text/xml;charset=UTF-8,')[1];

      return decodeURIComponent(URIComponent);
    });
  }

  private createUTF8Char(char: number) {
    return String.fromCodePoint(char);
  }
}
