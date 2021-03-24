import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { CanvasService } from '../components/canvas/canvas.service';
import { Sock } from '../types/sock.dto';
import { SaveSockModalComponent } from './save-sock-modal/save-sock-modal.component';

@Injectable({
  providedIn: 'root',
})
export class SockCreatorService {
  private daeFile!: Blob;

  constructor(private http: HttpClient, public dialog: MatDialog,  private canvasService: CanvasService) {}

  public showConfirmModal(blob: Blob) {
    this.dialog
      .open(SaveSockModalComponent, { data: { blob } })
      .afterClosed()
      .subscribe(this.saveIfConfirm.bind(this));
  }

  private saveIfConfirm(sock: Sock) {
    if (sock) {
      this.save(sock);
    }
  }

  private save(sock: Sock): void {
    const formData = new FormData();
    const daeFile = this.canvasService.getDaeFile();

    formData.append('screenshot', sock.screenshot);
    formData.append('daeFile', daeFile);
    formData.append('name', sock.name);
    this.saveSock(formData).subscribe();
  }

  public saveSock(formData: FormData): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/sock-creator/save`, formData);
  }
}
