import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const update: any = this.setTokenIfExist();
    const authReq = req.clone(update);

    return next.handle(authReq).pipe(tap(() => {}, this.check401Error.bind(this)));
  }

  private check401Error(err: HttpErrorResponse): void {
    if (err.status === 401) {
      this.dialog.open(AuthDialogComponent);
    }
  }

  private setTokenIfExist(): void {
    const token = localStorage.getItem('access_token');
    const update: any = {};

    if (token) {
      update.setHeaders = { Authorization: 'Bearer ' + token };
    }

    return update;
  }
}
